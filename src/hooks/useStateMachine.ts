import { useState } from 'react';
import { StateMachineConfiguration, createMachine } from '../stateMachine';

export const useStateMachine = (initialState: string, stateMachine: StateMachineConfiguration) => {
  const machine = createMachine(initialState, stateMachine);

  const [machineState, setMachineState] = useState<string>(initialState);

  const transition = (eventName: string) => {
    setMachineState(machine.transition(machineState, eventName));
  };

  return { transition, machineState };
};
