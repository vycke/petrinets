import { interpret, machine as createMachine } from '../src/machine';

const states = {
  on: {
    turnoff: { target: 'off' },
    guard: { target: 'off', guard: (d) => d },
  },
  off: {
    turnon: { target: 'on' },
  },
};

describe('finite state machine', () => {
  let _machine, state;

  beforeEach(() => {
    _machine = createMachine('off', states);
    state = _machine.initialState;
  });

  test('simple state machine', () => {
    expect(state).toEqual({ value: 'off' });
    state = _machine.transition(state, 'turnon');
    expect(state).toEqual({ value: 'on' });
    state = _machine.transition(state, 'turnon');
    expect(state).toEqual({ value: 'on' });
  });

  test('with guards', () => {
    state = _machine.transition(state, 'turnon');
    state = _machine.transition(state, 'guard', true);
    expect(state).toEqual({ value: 'on' });
    state = _machine.transition(state, 'guard', false);
    expect(state).toEqual({ value: 'off' });
  });

  test('service', () => {
    const service = interpret(_machine);
    expect(service.current.value).toBe('off');
    service.send('turnon');
    expect(service.current.value).toBe('on');
  });
});
