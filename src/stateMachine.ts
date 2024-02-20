type Actions = {
  onInAction?: () => void;
  onOutAction?: () => void;
};

type Transitions = Record<
  string,
  {
    target: string;
    action?: () => void;
  }
>;

type StateMachineProp = { actions?: Actions; transitions: Transitions };
export type StateMachine = Record<string, StateMachineProp>;

export function createMachine(initialState: string, stateMachine: StateMachine) {
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

      destinationTransition.action();
      currentDefinition.actions.onOutAction();
      destinationDefinition.actions.onInAction();

      machine.value = destination;

      return machine.value;
    }
  };

  return machine;
}
