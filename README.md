# JavaScript petri-nets

Lightweight library for petri-nets and finite state machines.

## Finite state machines

Simple finite state machines that can be used for state/process management. It has optional guards on the transitions. If a guard returns true, a transition cannot fire.

```js
import { machine, interpret } from 'petrinet';
const states = {
  on: {
    turnoff: { target: 'off' },
    guard: { target: 'off', guard: (d) => d },
  },
  off: {
    turnon: { target: 'on' },
  },
};

const myMachine = machine('off', states);
const { initialState } = myMachine;
const newState = myMachine.transition(initialState, 'turnon');

const service = interpret(myMachine);
service.send('turnoff').send('turnon');
console.log(service.current); // { value: 'on' }
```
