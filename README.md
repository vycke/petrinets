# JavaScript petri-nets

![](https://github.com/kevtiq/petrinets/workflows/test/badge.svg)
[![Node version](https://img.shields.io/npm/v/petrinets.svg?style=flat)](https://www.npmjs.com/package/petrinets)
[![NPM Downloads](https://img.shields.io/npm/dm/petrinets.svg?style=flat)](https://www.npmjs.com/package/petrinets)
[![Minified size](https://img.shields.io/bundlephobia/min/petrinets?label=minified)](https://www.npmjs.com/package/petrinets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lightweight library for petri-nets and finite state machines.

## Finite state machines

Simple finite state machines that can be used for state/process management. It has optional guards on the transitions. If a guard returns true, a transition cannot fire.

```js
import { fsm } from 'petrinet';

const states = {
  green: { CHANGE: 'yellow', BREAK: 'broken' },
  yellow: {
    CHANGE: 'red',
    async effect(send) {
      await delay(100); // delay for 3000ms
      send('CHANGE');
    },
  },
  red: { CHANGE: 'green' },
  broken: {
    STOP: 'red',
    effect(send) {
      send('STOP');
    },
  },
};

// Simple invoking
const myMachine = fsm('green', states);
myMachine.send('CHANGE');
myMachine.send('CHANGE');
console.log(myMachine.state); // { value: 'red' }

// direct sideeffects on state change
const myMachine = fsm('green', states);
myMachine.send('BREAK');
console.log(myMachine.state); // { value: 'red' }

// delayed effects and machine callbacks
let calls = 0;
const cb = () => calls++;
const myMachine = fsm('green', states, cb);
myMachine.send('CHANGE');
console.log(myMachine.state, calls); // { value: yellow }, 1
// wait for the delay
console.log(myMachine.state, calls); // { value: 'red' }, 2
```

## Petri Net

```js
import { petrinet } from 'petrinets';

const places = [{ key: 'p1' }, { key: 'p2' }, { key: 'p3' }, { key: 'p4' }];
const transitions = [
  {
    key: 't1',
    input: [{ source: 'p1' }],
    output: [{ target: 'p2' }, { target: 'p4' }],
  },
  {
    key: 't2',
    input: [{ source: 'p2' }, { source: 'p4' }],
    output: [{ target: 'p3' }],
  },
  {
    key: 't3',
    input: [{ source: 'p3' }, { source: 'p4' }],
    output: [{ target: 'p1' }, { target: 'p4' }],
  },
  {
    key: 't4',
    input: [{ source: 'p4' }],
    output: [{ target: 'p4' }],
  },
];

const myNet = petrinet(places, transitions);
myNet.add({ place: 'p1', amount: 1 });
myNet.fire('t1');

console.log(myNet.marking); // [{ place: 'p2', amount: 1 }. { place: 'p4', amount: 1 }]
```
