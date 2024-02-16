/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from 'react';
import { createMachine, type transitionsType } from '../stateMachine';

export const useStateMachine = (
  initState: string,
  transitions: transitionsType,
  options?: { commonSubscribe: boolean }
) => {
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
