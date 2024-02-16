export const func = (a: number, b: number) => a + b;

import { createMachine } from './stateMachine';

export const machine = createMachine('initial', {
  initial: {
    start: 'personal'
  },
  personal: {
    next: 'occupation'
  },
  occupation: {
    back: 'personal',
    education: 'education',
    work: 'work'
  },
  education: {
    back: 'occupation',
    send: 'loading'
  },
  work: {
    back: 'occupation',
    send: 'loading'
  },
  loading: {
    success: 'success'
  },
  success: {
    reset: 'initial'
  }
});

machine.subscribe(() => console.log('start subscription'), 'start');
machine.subscribe(() => console.log('just subscription'));

console.log('app.ts >>>', machine.state);
machine.send('start');
console.log('app.ts 2 >>>', machine.state);
