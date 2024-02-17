import { useState, useEffect } from 'react';
import { createMachine } from '../stateMachine';
import type { transitionsType } from '../types';

export const useStateMachine = (
  initState: string,
  transitions: transitionsType
  // options?: { commonSubscribe: boolean }
) => {
  const machine = createMachine(initState, transitions);

  const [machineState, setMachineState] = useState(machine.state);

  useEffect(() => {
    machine.subscribe((state) => setMachineState(state));
  }, []);

  return {
    machineState,
    send: machine.send.bind(machine),
    subscribe: machine.subscribe.bind(machine)
  };
};
