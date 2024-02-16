declare module 'state-machine' {
  export function useStateMachine<T>(
    initialState: string,
    options: Record<string, string>
  ): {
    stateMachine: T;
    setStateMachine: () => void;
  };
}
