import { func } from './app';

describe('first', () => {
  test('func', () => {
    expect(func(2, 2)).toBe(4);
  });
});
