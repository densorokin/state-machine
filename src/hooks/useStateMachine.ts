import { useEffect, useState } from 'react';
import { useStateMachineProps } from './types';

export const useStateMachine = ({ initialState }: useStateMachineProps) => {
  const [stateMachine, setStateMachine] = useState<string>(initialState);

  useEffect(() => {
    console.log('useStateMachine.ts >>>', stateMachine);
  }, [stateMachine]);

  return {
    stateMachine,
    setStateMachine
  };
};
