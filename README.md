# Utils

<div>
  <h3 align="center">
    Functional utility library - modern, simple, typed, powerful
  </h3>
</div>

<p align="center">
  <a href="https://bundlephobia.com/package/@saunos/utils">
    <img src="https://img.shields.io/bundlephobia/minzip/@saunos/utils?label=minzipped" alt="bundle size" height="18">
  </a>
  <a href="https://www.npmjs.com/package/@saunos/utils">
    <img src="https://img.shields.io/npm/dm/@saunos/utils.svg" alt="npm downloads" height="18">
  </a>
  <a href="https://www.npmjs.com/package/@saunos/utils">
    <img src="https://img.shields.io/npm/v/@saunos/utils.svg" alt="npm version" height="18">
  </a>
  <a href="https://github.com/rayepps/@saunos/utils">
    <img src="https://img.shields.io/npm/l/@saunos/utils.svg" alt="MIT license" height="18">
  </a>
</p>

## Install

```
npm install @saunos/utils
```

## Usage

A very brief kitchen sink.

```ts
import * as _ from 'radash'

const gods = [{
  name: 'Ra',
  power: 'sun',
  rank: 100,
  culture: 'egypt'
}, {
  name: 'Loki',
  power: 'tricks',
  rank: 72,
  culture: 'norse'
}, {
  name: 'Zeus',
  power: 'lightning',
  rank: 96,
  culture: 'greek'
}]

_.max(gods, g => g.rank) // => ra
_.sum(gods, g => g.rank) // => 268
_.fork(gods, g => g.culture === 'norse') // => [[loki], [ra, zeus]]
_.sort(gods, g => g.rank) // => [ra, zeus, loki]
_.boil(gods, (a, b) => a.rank > b.rank ? a : b) // => ra

_.objectify(
  gods, 
  g => g.name.toLowerCase(), 
  g => _.pick(g, ['power', 'rank', 'culture'])
) // => { ra, zeus, loki }

const godName = _.get(gods, g => g[0].name)

const [err, god] = await _.try(api.gods.findByName)(godName)

const allGods = await _.map(gods, async ({ name }) => {
  return api.gods.findByName(name)
})
```