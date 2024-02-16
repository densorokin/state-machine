// import { useState, useEffect } from 'react';
import { createMachine } from '../stateMachine';

export const useStateMachine = <T>(initState: string, transitions: T, options?: { commonSubscribe: boolean }) => {
  console.log('useStateMachine.tsx >>> start');
  const machine = createMachine(initState, transitions);

  // const [machineState, setMachineState] = useState(machine.state);

  // useEffect(() => {
  //   console.log('useStateMachine.tsx >>> useEffect');
  //   if (options?.commonSubscribe) {
  //     console.log('useStateMachine.tsx >>> subscription');
  //     machine.subscribe((state) => setMachineState(state));
  //   }
  // }, []);
  console.log('useStateMachine.tsx >>> start', machine.state);
  return {
    ...machine
    // machineState,
    // setMachineState
  };
};
