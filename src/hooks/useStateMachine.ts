import { useState, useRef, useCallback } from 'react';
import { StateMachineConfiguration, createMachine } from '../stateMachine';

export const useStateMachine = (initialState: string, stateMachine: StateMachineConfiguration) => {
  const machine = useRef(createMachine(initialState, stateMachine));

  const [machineState, setMachineState] = useState<string>(initialState);

  const transition = useCallback((eventName: string) => {
    setMachineState(machine.current.transition(eventName));
  }, []);

  return { transition, machineState };
};
