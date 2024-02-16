import { useState } from 'react';
import { createMachine } from '../stateMachine';
import { useEffect } from 'react';

export const useStateMachine = (initState: string, transitions: any, options: any) => {
  const machine = createMachine(initState, transitions);

  const [machineState, setMachineState] = useState(machine.state);

  useEffect(() => {
    if (options.commonSubscribe) {
      machine.subscribe((state) => setMachineState(state));
    }
  }, []);

  return {
    ...machine,
    machineState,
    setMachineState
  };
};
