import { useState } from 'react';
import { createMachine } from '../stateMachine';
import { useEffect } from 'react';

export const useStateMachine = (initState: string, transitions: any, options: any) => {
  console.log('useStateMachine.tsx >>> start');
  const machine = createMachine(initState, transitions);

  const [machineState, setMachineState] = useState(machine.state);

  useEffect(() => {
    console.log('useStateMachine.tsx >>> useEffect');
    if (options.commonSubscribe) {
      console.log('useStateMachine.tsx >>> subscription');
      machine.subscribe((state) => setMachineState(state));
    }
  }, []);

  return {
    ...machine,
    machineState,
    setMachineState
  };
};
