import { INITIAL_STATE, person } from './consts';
import { createMachine } from './stateMachine';

describe('stateMachine', () => {
  test('createMachine contains correct properties', () => {
    const machine = createMachine(INITIAL_STATE, person);

    expect(machine).toHaveProperty('state', 'initial');
    expect(machine).toHaveProperty('subscribe');
    expect(machine).toHaveProperty('send');

    expect(machine.subscribe).toEqual(expect.any(Function));
    expect(machine.send).toEqual(expect.any(Function));
  });
});
