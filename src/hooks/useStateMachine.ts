import { useState } from 'react';
import { StateMachine, createMachine } from '../stateMachine';

export const useStateMachine = (initialState: string, stateMachine: StateMachine) => {
  const machine = createMachine(initialState, stateMachine);

  const [machineState, setMachineState] = useState<string>(initialState);

  const transition = (eventName: string) => {
    setMachineState(machine.transition(machineState, eventName));
  };

  return { transition, machineState };
};
