type Actions = {
  onInAction?: () => void;
  onOutAction?: () => void;
};

type Transition = {
  target: string;
  action?: () => void;
};

type Transitions = Record<string, Transition>;

type StateMachineProp = { actions?: Actions; transitions: Transitions };
type TransitionFunc = (currentState: string, event: string) => string;

export type StateMachine = Record<string, StateMachineProp>;

export function createMachine(
  initialState: string,
  stateMachine: StateMachine
): { value: string; transition: TransitionFunc } {
  const machine = {
    value: initialState,

    transition(currentState: string, event: string): string {
      const currentDefinition = stateMachine[currentState];
      const destinationTransition = currentDefinition.transitions[event];

      if (!destinationTransition) {
        return;
      }

      const destination = destinationTransition.target;
      const destinationDefinition = stateMachine[destination];

      if (destinationTransition.action) {
        destinationTransition.action();
      }
      currentDefinition.actions?.onOutAction();
      destinationDefinition.actions?.onInAction();

      machine.value = destination;

      return machine.value;
    }
  };

  return machine;
}
