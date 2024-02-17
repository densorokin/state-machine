import type {
  subscriptionCBType,
  subscriptionsByTriggerType,
  subscriptionsRelatedToTriggersType,
  subscriptionsType,
  transitionsType,
  triggerType
} from './types';

export const createMachine = (initialState: string, transitions: transitionsType) => {
  const subscriptions: subscriptionsType = [];
  const subscriptionsRelatedToTriggers: subscriptionsRelatedToTriggersType = {};

  const machine = {
    state: initialState,

    subscribe(cb: subscriptionCBType, trigger: triggerType = null) {
      if (trigger) {
        const subscriptionsByTrigger: subscriptionsByTriggerType = subscriptionsRelatedToTriggers[trigger] || [];
        subscriptionsByTrigger.push(cb);
        subscriptionsRelatedToTriggers[trigger] = subscriptionsByTrigger;

        return;
      }

      subscriptions.push(cb);
    },

    send(trigger: string) {
      const currentState = this.state;

      if (!transitions?.[currentState]) {
        throw new Error('[createMachine]: not correct initial state');
      }

      if (!transitions?.[currentState]?.[trigger]) {
        throw new Error(
          `[createMachine]: not correct trigger name: { currentState: ${currentState}, trigger: ${trigger} }`
        );
      }

      const nextState = transitions[currentState][trigger];
      this.state = nextState;
      subscriptions.forEach((cb) => cb(this.state));
      const subscriptionsByTrigger: subscriptionsByTriggerType = subscriptionsRelatedToTriggers[trigger];

      if (subscriptionsByTrigger) {
        subscriptionsByTrigger.forEach((f) => f(this.state));
      }
    }
  };

  return machine;
};
