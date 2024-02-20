import { useState } from 'react';
import { createMachine } from '../stateMachine';

export const useStateMachine = (stateMachineDefinition: StateMachineEntity) => {
  const machine = createMachine(stateMachineDefinition);

  const [machineState, setMachineState] = useState<string>(stateMachineDefinition.initialState);

  const transition = (eventName: string) => {
    setMachineState(machine.transition(machineState, eventName));
  };

  return { transition, machineState };
};
