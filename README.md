# Morphic-ts

Business Models just got a lot easier

This library adress the pain of writting _and maintaining_ code for business _without any Magic_ in Typescript

The goal is to increase, in order of importance

- Correctness
- Productivity
- Developper Experience

It is has two side blended into one; generic ADT manipulation AND Generic, customizable and extensible derivations

## Two minutes intro

```bash
npm install 'morphic-ts'
```

Or

```bash
yarn add 'morphic-ts'
```

Then

```typescript
import { summon } from 'morphic-ts/lib/batteries/summoner'

export const Person = summon(F =>
  F.interface(
    {
      name: F.string(),
      age: F.number()
    },
    'Person'
  )
)

// You now have acces to everything to develop around this Type
Person.build // basic build function (enforcing correct type)
Person.show // Show from fp-ts
Person.type // io-ts
Person.strictType // io-ts
Person.eq // Eq from fp-ts
Person.lenseFromPath // and other optics (optionnals, prism, ) from monocle-ts
Person.arb // fast-check
Person.jsonSchema // JsonSchema-ish representation
```

### Discriminated, taggedUnion-like models

```typescript
import { summon, tagged } from 'morphic-ts/lib/batteries/summoner-no-union'

export const Bicycle = summon(F =>
  F.interface(
    {
      type: F.stringLiteral('Bicycle'),
      color: F.string()
    },
    'Bicycle'
  )
)

export const Car = summon(F =>
  F.interface(
    {
      type: F.stringLiteral('Car'),
      kind: F.keysOf({ electric: null, fuel: null, gaz: null }),
      power: F.number()
    },
    'Car'
  )
)

const Vehicule = tagged('type')({ Car, Bicycle })

// Now you have access to previously depicted derivation + ADT support (ctors, predicates, optics, matchers,reducers, etc.. see `ADT Manipulation` below)
```

### Want opaque nominal (instead of structural) infered types

You may use this pattern

```typescript
const Car_ = summon(F =>
  F.interface(
    {
      type: F.stringLiteral('Car'),
      kind: F.keysOf({ electric: null, fuel: null, gaz: null }),
      power: F.number()
    },
    'Car'
  )
)
export interface Car extends AType<typeof Car_> {}
export interface CarRaw extends EType<typeof Car_> {}
export const Car = AsOpaque<CarRaw, Car>(Car_)
```

We're sorry for the boilerplate, this is a current Typescript limitation but in our experience, this is worth the effort.

### Configurable

As nice as a General DSL solution to specify your Schema is, there's still some specifics you would like to use.

Morphic provides `Interpreter` to expose `Config` for a specific `Algebra` combinator.

For example, we may want to specify how fastcheck should generate some arrays.
We can add an extra parameter to a definition (last position) and use `Interpreter` specific function (named '*Interpreter*Config', here `fastCheckConfig`) and it will expose the ability to specify the configuration for this `Interpreter` and `combinator`.

```typescript
summon(F => F.array(F.string(), fastCheckConfig({ minLength: 2, maxLength: 4 })))
```

Note: _this is type guided and type safe, it's *not* an `any` in disguise_

You may provide several Configuration

```typescript
summon(F => F.array(F.string(), { ...fastCheckConfig({ minLength: 2, maxLength: 4 }), ...showConfig(...)} ))
```

## How it works

When you specify a Schema, you're using an API (eDSL implemented using final tagless).
This `API` defines a `Program` (your schema) using an `Algebra` (the combinators exposed to do so).

This `Algebra` you're using is actually composed of several `Algebras` merged together, some defines how to encode a `boolean`, some others a `strMap` (string Map), etc..

Then for each possible derivation there's possibly an Ìnterpreter` implementing some Algebras.
What Morphic does is orchestrating this machinery for you

This pattern has some interesting properties; it is extensible in both the `Algebra` and the `Interpreter`

## Generic Derivation

Specify the structure of your Schema only once and automatically has access various supported implementations

Participate into expanding implementation and/or schema capabilities

Example of implementations:

- Structural equality (via Eq from fp-ts)
- Validators (io-ts)
- Schema generation (JsonSchema flavor)
- Pretty print of data structure (Show from fp-ts)
- Generators (FastCheck)
- ...
- TypeOrm (WIP)

This is not an exhaustive list, because the design of Morphic enables to define more and more `Interpreters` for your `Schemas` (composed of `Algebras`).

## ADT Manipulation

ADT stands for `Algebraic Data Types`, this may be strange, just think about it as the pattern to represent your casual Business objects

ADT manipulation support maybe be used without relying on full Morphic objects.

The feature can be used standalone via the `makeADT` function with support for:

- Smart Ctors
- Predicates
- Optics (Arcane name for libraries helping manipulate immutable data structures in FP)
- Matchers
- Reducers
- Creation of new ADTs via selection, exclusion, intersection or union of existing ADTs

Ad'hoc usage via `makeADT` (Morphic's `summon` already does that for you):

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

### Transformers

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

## Roadmap

- Switch to Monorepo
- Interpreter for persistency (TypeORM)
- Implement Algebra for APIs

## Disclaimer

THIS LIBRARY IS USED INTO TWO PROFESSIONAL PROJECTS IN DEVELPOMENT AT THE MOMENT

BUT BEWARE, THIS REPO IS A POC (WORK-IN-PROGRESS)
THE API IS UNLIKELY TO CHANGE TRENDEMOUSLY BUT YOU MAY BE SAFER TO CONSIDER IT UNSTABLE AND USE AT YOUR OWN RISK
