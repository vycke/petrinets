import fsm from '../src/fsm';

const states = {
  on: {
    turnoff: { target: 'off' },
  },
  off: {
    turnon: { target: 'on' },
  },
};

describe('finite state machine', () => {
  test('service', () => {
    const service = fsm('off', states);
    expect(service.state.value).toBe('off');
    service.send('turnon');
    expect(service.state.value).toBe('on');
    service.send('non-existing-event');
    expect(service.state.value).toBe('on');
  });
});
