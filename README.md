# Morphic-ts

[![Greenkeeper badge](https://badges.greenkeeper.io/sledorze/morphic-ts.svg)](https://greenkeeper.io/)

![Test CI](https://github.com/sledorze/morphic-ts/workflows/Test%20CI/badge.svg)

Business Models just got a lot easier

This library addresses the pain of writing _and maintaining_ code for business _without any Magic_ in Typescript

The goal is to increase, in order of importance

- Correctness
- Productivity
- Developer Experience

It is has two side blended into one; generic ADT manipulation AND Generic, customizable and extensible derivations

## Two minutes intro

Add the batteries package to your repo

```bash
yarn add '@morphic-ts/batteries'
```

Then summon your first Morph

```typescript
import { summon } from '@morphic-ts/batteries/lib/summoner-BASTJ'

export const Person = summon(F =>
  F.interface(
    {
      name: F.string(),
      age: F.number()
    },
    'Person'
  )
)
```

You now have access to everything to develop around this Type

```typescript
Person.build // basic build function (enforcing correct type)
Person.show // Show from fp-ts
Person.type // io-ts
Person.strictType // io-ts
Person.eq // Eq from fp-ts
Person.lenseFromPath // and other optics (optionals, prism, ) from monocle-ts
Person.arb // fast-check
Person.jsonSchema // JsonSchema-ish representation
```

### Discriminated, taggedUnion-like models

```typescript
import { summon, tagged } from '@morphic-ts/batteries/lib/summoner-ESBASTJ'

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

const Vehicle = tagged('type')({ Car, Bicycle })
```

Now you have access to previously depicted derivation + ADT support (ctors, predicates, optics, matchers,reducers, etc.. see `ADT Manipulation` below)

### Want opaque nominal (instead of structural) inferred types

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
A snippet is available to help with that in this repo .vscode folder; we recommend using it extensively.

### Configurable

As nice as a General DSL solution to specify your Schema is, there's still some specifics you would like to use.

Morphic gives you the ability to change any derivation via an optional config.

For example, we may want to specify how fastcheck should generate some strings:

```typescript
summon(F => F.array(F.string({ FastCheckURI: arb => arb.filter(s => s.length > 2) })))
```

Note: _this is type guided and type safe, it's *not* an `any` in disguise_

You may provide several Configurations (by indexing by several URI)

### Config Environment

Configs are used to override some specific interpreter instances and
this is of great value.

But there's a pitfall.

If one wants to use the fastcheck version of a Morph, for testing reasons, but do not want to have fastcheck included in its app, he needs to reinterpret a Morph:

Using `derive`:

```typescript
const Person = summonESBST(F =>
  F.interface(
    {
      name: F.string,
      birthDate: F.date
    },
    'Person'
  )
)
const PersonARB = Person.derive(modelFastCheckInterpreter)({})
```

He can also reinterpret using another summoner.

```typescript
const AnotherPerson = summonESBASTJ(Person) // Reinterpreter using another summoner (thus generating different type classes)
```

However, it is often desirable to override fastcheck via a config, for instance, to generate realistic arbitration (here the name with alphabetic letters and a min/max length or a birth date in the past).

Doing so means that one needs to add a config for fastcheck when defining the `Person` members Morphs, thus, including the fastcheck lib.

But doing so, the lib is imported outside of tests, which is not desirable.

Config Environment solve this issue by offering the ability to give access to an environment for the config of each interpreter.

The motivation is providing ways to abstract over dependencies used in configs.

We can access an environnement to use in a config like so (here IoTsTypes):

```typescript
summon(F =>
  F.interface({ a: F.string({ IoTsURI: (x, env: IoTsTypes) => env.WM.withMessage(x, () => 'not ok') }) }, 'a')
)
```

The environnement type has to be specified at definition site.

To prevent really importing the lib to get it's type (the definition is purely a type), we can rely on type imports from typescript.

```typescript
import type * as fc from 'fast-check'
```

The Config also infers the correct Env type and only typechecks correctly if `summon` has been instantiated with correct Env constraints using the `summonFor` constructor.

Creating the summon requires providing (all) the environments a summoner will be able to support.

```typescript
export const { summon } = summonFor<{ IoTsURI: IoTsTypes }>({ IoTsURI: { WM } })
```

I advise you to use a proxy interface to keep this opaque an lean.

```typescript
export interface AppEnv {
  IoTsURI: IoTsTypes
}

export const { summon } = summonFor<AppEnv>({ IoTsURI: { WM } })
```

If the underlying Interpreter of `summoner` does not generate a type-class (e.g. `io-ts`), then there is no need to feed it at creation time:

```typescript
export const { summon } = summonFor<{ IoTsURI: IoTsTypes }>({})
```

This will type-check accordingly.

However the type constraint of the Env will remain in the summoner signature, so that any (re)interpretation from another summoner will thread that constraint; there no compromise on type safety.

The consequence is that any interpreting summoner Env will need to cover all the Env from the source summoner.

This transitive aspect is the necessary condition for correct (re)interpretations.

### Define

Summoners now also provide a `define` member in order to help creating Programs (not Morphs).

Those `define` are only constrained by the summoner Algebra (Program), not the summoner TypeClasses. And as such, these can freely be combined with any kind of summoner implementing this Algebra.

They also carry their Config Env constraints.

You can directly create a `Define` instance by using `defineFor` and specifying the algebra (via a program Uri).

```typescript
defineFor(ProgramNoUnionURI)(F => F.string)
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

Note: ADT behaviour is available via Summoners; however it is also available without the derivation machinery, hence this paragraph, which also applies to summoned Morphs.

ADT stands for `Algebraic Data Types`, this may be strange, just think about it as the pattern to represent your casual Business objects

ADT manipulation support maybe be used without relying on full Morphic objects.

The feature can be used standalone via the `makeADT` function with support for:

- Smart Ctors
- Predicates
- Optics (Arcane name for libraries helping manipulate immutable data structures in FP)
- Matchers
- Reducers
- Creation of new ADTs via selection, exclusion, intersection or union of existing ADTs

Ad-hoc usage via `makeADT` (Morphic's `summon` already does that for you):

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

### Constructors

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
Vehicle.match(
  {
    Car: ({ seats }) => seats,
    Motorbike: ({ seats }) => seats
  },
  _ => 1
)

// match widens the returned type by contructing a union of all branches result types
// Here it is number | 'none'
Vehicle.match(
  {
    Car: ({ seats }) => seats,
    Motorbike: ({ seats }) => seats
  },
  _ => 'none' as const
)

// A stricter variant enforcing homogeneous return type in branches exists
Vehicle.matchStrict({
  Car: ({ seats }) => seats,
  Motorbike: ({ seats }) => seats,
  Bicycle: _ => 1
})

// Which would error in case of heterogeneous return types, like this:
Vehicle.matchStrict({
  Car: ({ seats }) => seats,
  Motorbike: ({ seats }) => seats,
  Bicycle: _ => 'none'
})
```

### Transformers

```typescript
// You may transform matching a subset
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
const Motorized = Vehicle.select('Car', 'Motorbike') // ADT<Car | Motorbike, "type">

const TrafficJamProof = Vehicle.exclude('Car') // ADT<Motorbike | Bicycle, "type">

const Faster = intersectADT(Motorized, TrafficJamProof) // ADT<Motorbike, "type">

const Faster = intersectADT(Motorized, TrafficJamProof) // ADT<Motorbike, "type">

const ManyChoice = unionADT(Motorized, TrafficJamProof) // ADT<Car  | Motorbike | Bicycle, "type">
```

### Optics (via Monocle)

We support lenses, optional, prism pre-typed helpers

Lense example:

```typescript
const seatLense = Motorized.lenseFromProp('seats') // Lens<Car | Motorbike, number>

const incSeat = seatLense.modify(increment) // (s: Car | Motorbike) => Car | Motorbike
```

## Road Map

- Interpreter for persistency (TypeORM)
- Implement Algebra for APIs

## Disclaimer

THIS LIBRARY IS USED INTO TWO PROFESSIONAL PROJECTS IN DEVELOPMENT AT THE MOMENT

BUT BEWARE, THIS REPO IS A POC (WORK-IN-PROGRESS)
THE API IS UNLIKELY TO CHANGE TREMENDOUSLY BUT YOU MAY BE SAFER TO CONSIDER IT UNSTABLE AND USE AT YOUR OWN RISK
