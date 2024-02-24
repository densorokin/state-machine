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
type StepTransitionFn = (event: string) => string;

export type StateMachineConfiguration = Record<string, StateMachineStep>;
export type StateMachine = { transition: StepTransitionFn };

export function createMachine(initialStateKey: string, stateMachine: StateMachineConfiguration): StateMachine {
  let currentStateKey = initialStateKey;

  const machine: StateMachine = {
    transition(event: string): string {
      const currentDefinition = stateMachine[currentStateKey];
      const destinationTransition = currentDefinition.transitions[event];

      if (!destinationTransition) {
        return;
      }

      const destination = destinationTransition.target;
      const destinationDefinition = stateMachine[destination];

      destinationTransition.action?.();
      currentDefinition.actions?.onOutAction();
      destinationDefinition.actions?.onInAction();

      currentStateKey = destination;

      return destination;
    }
  };

  return machine;
}
