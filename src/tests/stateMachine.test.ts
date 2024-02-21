import { createMachine } from '../stateMachine';
import { INITIAL_STATE, stateMachineMock } from './stateMachineMock';

describe('stateMachine', () => {
  let machine: ReturnType<typeof createMachine>;

  beforeEach(() => {
    machine = createMachine(INITIAL_STATE, stateMachineMock);
  });

  test('Should be created stateMachine', () => {
    expect(machine).toHaveProperty('value', INITIAL_STATE);
    expect(machine).toHaveProperty('transition');
  });

  test('Should move to step01', () => {
    // arrange
    // act
    const currentState = machine.transition(machine.value, 'step01');

    // assert
    expect(currentState).toBe('step01');
    expect(stateMachineMock.step00.actions.onInAction).not.toHaveBeenCalled();
    expect(stateMachineMock.step00.actions.onOutAction).toHaveBeenCalledTimes(1);
    expect(stateMachineMock.step00.transitions.step01.action).toHaveBeenCalledTimes(1);
  });

  test('Should move to step02 - with no actions', () => {
    machine.transition(machine.value, 'step01');

    const currentState = machine.transition(machine.value, 'step02');

    expect(currentState).toBe('step02');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step01?.transitions.step02.action).toHaveBeenCalledTimes(1);
  });

  test('Should move to step03', () => {
    machine.transition(machine.value, 'step01');
    machine.transition(machine.value, 'step02');

    const currentState = machine.transition(machine.value, 'step03');

    expect(currentState).toBe('step03');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step02.transitions.step03.action).not.toHaveProperty('action');
  });

  test('Should move to step04 throw step02', () => {
    machine.transition(machine.value, 'step01');
    machine.transition(machine.value, 'step02');
    machine.transition(machine.value, 'step03');

    let currentState = machine.transition(machine.value, 'step02');
    expect(currentState).toBe('step02');

    currentState = machine.transition(machine.value, 'step04');

    expect(currentState).toBe('step04');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step02.transitions.step04.action).toHaveBeenCalledTimes(1);
  });

  test('Should move to step05 throw step04', () => {
    machine.transition(machine.value, 'step01');
    machine.transition(machine.value, 'step02');
    machine.transition(machine.value, 'step04');

    const currentState = machine.transition(machine.value, 'step05');

    expect(currentState).toBe('step05');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step04.transitions.step05.action).toHaveBeenCalledTimes(1);
  });

  test('move to step06', () => {
    machine.transition(machine.value, 'step01');
    machine.transition(machine.value, 'step02');
    machine.transition(machine.value, 'step04');
    machine.transition(machine.value, 'step05');

    const currentState = machine.transition(machine.value, 'step06');

    expect(currentState).toBe('step06');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step05.transitions.step06.action).toHaveBeenCalledTimes(1);
  });

  test('move to step00', () => {
    machine.transition(machine.value, 'step01');
    machine.transition(machine.value, 'step02');
    machine.transition(machine.value, 'step04');
    machine.transition(machine.value, 'step05');
    machine.transition(machine.value, 'step06');

    const currentState = machine.transition(machine.value, 'step00');

    expect(currentState).toBe('step00');
    expect(machine).not.toHaveProperty('actions');
    expect(stateMachineMock.step06.transitions.step00.action).toHaveBeenCalledTimes(1);
  });

  test('Should not pass step', () => {
    const value = machine.transition(machine.value, 'NOT_CORRECT_STEP');

    expect(value).toBeUndefined();
  });
});
