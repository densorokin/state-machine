type fType = (arg1: string) => void;
type subscriptionsType = fType[];
type transitionsType = Record<string, Record<string, string>>;
type subscriptionsRelatedToTriggersType = Record<string, subscriptionsType>;
type triggerType = string;
type subscriptionsByTriggerType = fType[];

export const iState = (initialState: string, transitions: transitionsType) => {
  const subscriptions: subscriptionsType = [];
  const subscriptionsRelatedToTriggers: subscriptionsRelatedToTriggersType = {};

  const machine = {
    state: initialState,

    subscribe(f: fType, trigger: triggerType = null) {
      if (trigger) {
        const subscriptionsByTrigger: subscriptionsByTriggerType = subscriptionsRelatedToTriggers[trigger] || [];
        subscriptionsByTrigger.push(f);
        subscriptionsRelatedToTriggers[trigger] = subscriptionsByTrigger;

        return;
      }

      subscriptions.push(f);
    },

    send(trigger: string) {
      const currentState = this.state;

      if (!transitions?.[currentState]) {
        throw new Error('[iState]: not correct initial state');
      }

      if (!transitions?.[currentState]?.[trigger]) {
        throw new Error('[iState]: not correct trigger name');
      }

      const nextState = transitions[currentState][trigger];

      this.state = nextState;
      subscriptions.forEach((f) => f(this.state));
      const subscriptionsByTrigger: subscriptionsByTriggerType = subscriptionsRelatedToTriggers[trigger];

      if (subscriptionsByTrigger) {
        subscriptionsByTrigger.forEach((f) => f(this.state));
      }
    }
  };

  return machine;
};
