type ActionsConfig = {
  onInAction?: () => void;
  onOutAction?: () => void;
};

type TransitionConfig = {
  target: string;
  action?: () => void;
};

type TransitionConfigs = Record<string, TransitionConfig>;

type StateMachineStep = { actions?: ActionsConfig; transitions: TransitionConfigs };
type StepTransitionFn = (currentState: string, event: string) => string;

export type StateMachineConfiguration = Record<string, StateMachineStep>;
export type StateMachine = { value: string; transition: StepTransitionFn };

export function createMachine(initialStateKey: string, stateMachine: StateMachineConfiguration): StateMachine {
  const machine: StateMachine = {
    value: initialStateKey,

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
