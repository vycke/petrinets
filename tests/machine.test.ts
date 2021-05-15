import fsm from '../src/fsm';

function delay(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const states = {
  green: { on: { CHANGE: 'yellow', BREAK: 'broken' } },
  yellow: {
    on: { CHANGE: 'red' },
    async effect(send) {
      await delay(100); // delay for 3000ms
      send('CHANGE');
    },
  },
  red: { on: { CHANGE: 'green' } },
  broken: {
    on: { STOP: 'red' },
    effect(send) {
      send('STOP');
    },
  },
};

describe('finite state machine', () => {
  test('service', () => {
    const service = fsm('green', states);
    expect(service.state.value).toBe('green');
    service.send('CHANGE');
    expect(service.state.value).toBe('yellow');
    service.send('CHANGE');
    expect(service.state.value).toBe('red');
  });

  test('side effects', () => {
    const service = fsm('green', states);
    service.send('BREAK');
    expect(service.state.value).toBe('red');
  });

  test('async side effects', async () => {
    const service = fsm('green', states);
    service.send('CHANGE');
    expect(service.state.value).toBe('yellow');
    await delay(200);
    expect(service.state.value).toBe('red');
  });
});
