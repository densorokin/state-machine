import { createMachine } from '../stateMachine';
import { INITIAL_STATE, stateMachineMock } from './stateMachineMock';

describe('stateMachine', () => {
  const machine = createMachine(INITIAL_STATE, stateMachineMock);
  let currentState = machine.value;

  test('create stateMachine', () => {
    expect(machine).toHaveProperty('value', INITIAL_STATE);
    expect(machine).toHaveProperty('transition');
  });

  test('move to step01', () => {
    currentState = machine.transition(currentState, 'step01');

    expect(currentState).toBe('step01');
    expect(stateMachineMock.step00.actions.onInAction).not.toHaveBeenCalled();
    expect(stateMachineMock.step00.actions.onOutAction).toHaveBeenCalledTimes(1);
    expect(stateMachineMock.step00.transitions.step01.action).toHaveBeenCalledTimes(1);
  });

  test('move to step02 - with no actions', () => {
    currentState = machine.transition(currentState, 'step02');

    expect(currentState).toBe('step02');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step01?.transitions.step02.action).toHaveBeenCalledTimes(1);
  });

  test('move to step03', () => {
    currentState = machine.transition(currentState, 'step03');

    expect(currentState).toBe('step03');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step02.transitions.step03.action).not.toHaveProperty('action');
  });

  test('move to step04 throw step02', () => {
    currentState = machine.transition(currentState, 'step02');
    expect(currentState).toBe('step02');

    currentState = machine.transition(currentState, 'step04');
    expect(currentState).toBe('step04');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step02.transitions.step04.action).toHaveBeenCalledTimes(1);
  });

  test('move to step05 throw step04', () => {
    currentState = machine.transition(currentState, 'step05');
    expect(currentState).toBe('step05');

    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step04.transitions.step05.action).toHaveBeenCalledTimes(1);
  });

  test('move to step06', () => {
    currentState = machine.transition(currentState, 'step06');
    expect(currentState).toBe('step06');

    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step05.transitions.step06.action).toHaveBeenCalledTimes(1);
  });

  test('move to step00', () => {
    currentState = machine.transition(currentState, 'step00');
    expect(currentState).toBe('step00');

    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step06.transitions.step00.action).toHaveBeenCalledTimes(1);
  });
});