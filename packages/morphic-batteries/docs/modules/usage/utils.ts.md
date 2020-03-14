---
title: usage/utils.ts
nav_order: 17
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [InhabitedTypes (interface)](#inhabitedtypes-interface)
- [AType (type alias)](#atype-type-alias)
- [EType (type alias)](#etype-type-alias)
- [SelectKeyOfMatchingValues (type alias)](#selectkeyofmatchingvalues-type-alias)
- [assignCallable (function)](#assigncallable-function)
- [assignFunction (function)](#assignfunction-function)
- [inhabitTypes (function)](#inhabittypes-function)
- [wrapFun (function)](#wrapfun-function)

---

# InhabitedTypes (interface)

**Signature**

```ts
export interface InhabitedTypes<E, A> {
  // tslint:disable-next-line: no-unused-expression
  _E: E
  // tslint:disable-next-line: no-unused-expression
  _A: A
}
```

Added in v0.0.1

# AType (type alias)

**Signature**

```ts
export type AType<X extends InhabitedTypes<any, any>> = X['_A']
```

Added in v0.0.1

# EType (type alias)

**Signature**

```ts
export type EType<X extends InhabitedTypes<any, any>> = X['_E']
```

Added in v0.0.1

# SelectKeyOfMatchingValues (type alias)

**Signature**

```ts
export type SelectKeyOfMatchingValues<KeyedValues, Constraint> = {
  [k in keyof KeyedValues]: KeyedValues[k] extends Constraint ? k : never
}[keyof KeyedValues]
```

Added in v0.0.1

# assignCallable (function)

**Signature**

```ts
export const assignCallable = <C, F extends Function & C, D>(F: F, d: D): F & C & D => ...
```

Added in v0.0.1

# assignFunction (function)

**Signature**

```ts
export const assignFunction = <F extends Function, C>(ab: F, c: C): F & C => ...
```

Added in v0.0.1

# inhabitTypes (function)

Fake inhabitation of types
/
/\*\*

**Signature**

```ts
export const inhabitTypes = <E, A, T>(t: T): T & InhabitedTypes<E, A> => ...
```

Added in v0.0.1

# wrapFun (function)

**Signature**

```ts
export const wrapFun = <A, B, X>(g: ((a: A) => B) & X): typeof g => ((x: any) => ...
```

Added in v0.0.1
