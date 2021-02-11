# JavaScript petri-nets

![](https://github.com/kevtiq/petrinets/workflows/test/badge.svg)
[![Node version](https://img.shields.io/npm/v/pubbel.svg?style=flat)](https://www.npmjs.com/package/petrinets)
[![NPM Downloads](https://img.shields.io/npm/dm/pubbel.svg?style=flat)](https://www.npmjs.com/package/petrinets)
[![Minified size](https://img.shields.io/bundlephobia/min/pubbel?label=minified)](https://www.npmjs.com/package/petrinets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lightweight library for petri-nets and finite state machines.

## Finite state machines

Simple finite state machines that can be used for state/process management. It has optional guards on the transitions. If a guard returns true, a transition cannot fire.

```js
import { machine, interpret } from 'petrinet';
const states = {
  on: {
    turnoff: { target: 'off' },
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
