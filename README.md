# Morphic-ts

The Extensible Code First approach you've been dreaming of.

This library adress the pain of writting and maintaining derived code for business logic _without any Magic_

The goal is to increase, in order:

- Typesafety
- Productivity
- Developper Experience

It is has two side blended into one; generic ADT support AND Generic, customizable and extensible eDSL derivation

## ADT support

- Smart Ctors
- Predicates
- Optics
- Matchers
- Reducers
- Derivation of ADT via selection or exclusion
- Intersection and Union of ADT

Declaration:

```typescript
import { makeADT, ofType } from 'morphic-ts/lib/adt'

interface Bicycle {
  type: 'Bicycle'
  color: string
}
interface Car {
  type: 'Car'
  kind: 'electric' | 'fuel' | 'gaz'
  power: number
}

const Vehicle = makeADT('type')({
  Car: ofType<Car>(),
  Bicycle: ofType<Bicycle>()
})
```

Usage

Let's define some Types

```typescript
interface Bicycle {
  type: 'Bicycle'
  color: string
}

interface Motorbike {
  type: 'Motorbike'
  seats: number
}

interface Car {
  type: 'Car'
  kind: 'electric' | 'fuel' | 'gaz'
  power: number
  seats: number
}
```

Then build an ADT from them for PROFIT!

```typescript
// ADT<Car | Motorbike | Bicycle, "type">
const Vehicle = makeADT('type')({
  Car: ofType<Car>(),
  Motorbike: ofType<Motorbike>(),
  Bicycle: ofType<Bicycle>()
})
```

Then you have..

### Constuctors

```typescript
Vehicle.of.Bicycle({ color: 'red' }) // type is Car | Motorbike | Bicycle

// `as` offer a narrowed type
Vehicle.as.Car({ kind: 'electric', power: 2, seats: 4 }) // type is Car
```

### Predicates

```typescript
// Predicate and Refinements
Vehicle.is.Bicycle // (a: Car | Motorbike | Bicycle) => a is Bicycle

// Exist also for several Types
const isTrafficJamProof = Vehicle.isAnyOf('Motorbike', 'Bicycle') // (a: Car | Motorbike | Bicycle) => a is Motorbike | Bicycle
```

### Matchers

```typescript
const nbSeats = Vehicle.match({
  Car: ({ seats }) => seats,
  Motorbike: ({ seats }) => seats,
  Bicycle: _ => 1
})

// Alternatively you may use `default`
Vehicle.match({
  Car: ({ seats }) => seats,
  Motorbike: ({ seats }) => seats,
  default: _ => 1
})

// Use matchWiden, then the resturn type will be unified from each results
// Here it would be number | 'none'
Vehicle.matchWiden({
  Car: ({ seats }) => seats,
  Motorbike: ({ seats }) => seats,
  default: _ => 'none' as const
})
```

### Transforms

```typescript
// You may tranform matching a subset
Vehicle.transform({
  Car: car => ({ ...car, seats: car.seats + 1 })
})
```

### Reducers

```typescript
// Creating a reducer is made as easy as specifying a type
Vehicle.createReducer({ totalSeats: 0 })({
  Car: ({ seats }) => ({ totalSeats }) => ({ totalSeats: totalSeats + seats }),
  Motorbike: ({ seats }) => ({ totalSeats }) => ({ totalSeats: totalSeats + seats }),
  default: _ => identity
})
```

### Selection, Exclusion, Intersection and Union of ADTs

This will help getting unique advantage of Typescript ability to refine Unions

```typescript
const Motorised = Vehicle.select('Car', 'Motorbike') // ADT<Car | Motorbike, "type">
const TrafficJamProof = Vehicle.exclude('Car') // ADT<Motorbike | Bicycle, "type">

const Faster = intersectADT(Motorised, TrafficJamProof) // ADT<Motorbike, "type">

const Faster = intersectADT(Motorised, TrafficJamProof) // ADT<Motorbike, "type">

const ManyChoice = unionADT(Motorised, TrafficJamProof) // ADT<Car  | Motorbike | Bicycle, "type">
```

### Optics (via Monocle)

We support lenses, optionel, prism pretyped helpers

Lense example:

```typescript
const seatLense = Motorised.lenseFromProp('seats') // Lens<Car | Motorbike, number>

const incSeat = seatLense.modify(increment) // (s: Car | Motorbike) => Car | Motorbike
```

## Generic derivation

The other aspect of Morphic is to provide a mean, in addition to its ADT support for the automatisation of Derivation

Example:

- Structural equality (Eq from fp-ts)
- Validators (io-ts)
- Schema generation (JsonSchema flavor)
- Pretty print of data structure (Show)
- ...
- TypeOrm (WIP)

This is not an exhaustive list, because the design of Morphic enables to define more and more `Interpreters` for your `Schemas` (composed of `Algebras`).

## Two minutes intro

```typescript
```

## Getting Started

(TODO: add the steps)

## How

In order to be open to new kind of data (via Algebras) and derivation (via Interpreters) we use an approach via a (finally) tagless encoding

On may define what Algebra he needs (either reusing some or writing some new one), writes it's schema and immediately benefits from derivation by interpreting the Schema by some interpreters
In case no interepreter exist for a particular Algebra, the end user can extend it non intrusively thanks to the composable nature of the technic employed

## Batteries included

(TODO: add links to the libs implemented)

## Examples

(TODO: add some reassuring examples of creation and usages)

## Limitations

## Roadmap

- Stategy for a growing number of Algebras / Interpreters

## Disclaimer

BEWARE, THIS REPO IS A POC (WORK-IN-PROGRESS)
THE API IS IN UNSTABLE STATE AND MAY CHANGE
USE AT YOUR OWN RISK)
