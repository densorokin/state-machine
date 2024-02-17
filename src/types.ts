export type subscriptionCBType = (arg1: string) => void;
export type subscriptionsType = subscriptionCBType[];
export type transitionsType = Record<string, Record<string, string>>;
export type subscriptionsRelatedToTriggersType = Record<string, subscriptionsType>;
export type triggerType = string | null;
export type subscriptionsByTriggerType = subscriptionCBType[];
