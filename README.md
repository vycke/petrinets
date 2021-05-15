# JavaScript petri-nets

![](https://github.com/kevtiq/petrinets/workflows/test/badge.svg)
[![Node version](https://img.shields.io/npm/v/@crinkle/petrinets.svg?style=flat)](https://www.npmjs.com/package/@crinkle/petrinets)
[![NPM Downloads](https://img.shields.io/npm/dm/@crinkle/petrinets.svg?style=flat)](https://www.npmjs.com/package/@crinkle/petrinets)
[![Minified size](https://img.shields.io/bundlephobia/min/@crinkle/petrinets?label=minified)](https://www.npmjs.com/package/@crinkle/petrinets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lightweight library for petri-nets.

```js
import { petrinet } from '@crinkle/petrinets';

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
