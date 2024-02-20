import { renderHook, act } from '@testing-library/react';
import { useStateMachine } from '../hooks/useStateMachine';
import { stateMachineMock, INITIAL_STATE } from './stateMachineMock';

describe('useStateMachine hook', () => {
  test('Should return next step', () => {
    const { result } = renderHook(() => useStateMachine(INITIAL_STATE, stateMachineMock));

    expect(result.current.machineState).toBe(INITIAL_STATE);
    act(() => result.current.transition('step01'));
    expect(result.current.machineState).toBe('step01');
  });
});
