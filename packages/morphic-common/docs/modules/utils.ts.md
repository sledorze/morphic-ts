---
title: utils.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Includes (type alias)](#includes-type-alias)
- [IsNever (type alias)](#isnever-type-alias)
- [collect (function)](#collect-function)
- [getGuardId (function)](#getguardid-function)
- [mapRecord (function)](#maprecord-function)
- [memo (function)](#memo-function)
- [merge (function)](#merge-function)
- [projectField (function)](#projectfield-function)
- [projectFieldWithEnv (function)](#projectfieldwithenv-function)

---

# Includes (type alias)

**Signature**

```ts
export type Includes<A, B, Y, N> = IsNever<B, Y, A extends B ? Y : N>
```

Added in v0.0.1

# IsNever (type alias)

**Signature**

```ts
export type IsNever<X, Y, N> = 'X' | X extends 'X' ? Y : N
```

Added in v0.0.1

# collect (function)

**Signature**

```ts
export const collect = <K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B> => ...
```

Added in v0.0.1

# getGuardId (function)

**Signature**

```ts
export const getGuardId = (guards: ((x: unknown) => Either<any, any>)[], sym: symbol): ((a: unknown) => number) => ...
```

Added in v0.0.1

Returns a function returning the index of the first guard matching a particular Objet
Caching the result under the given Symbol inside the Object

# mapRecord (function)

**Signature**

```ts
export const mapRecord = <Dic extends { [k in keyof Dic]: any }, B>(
  d: Dic,
  f: (v: Dic[keyof Dic]) => B
): { [k in keyof Dic]: B } => ...
```

Added in v0.0.1

# memo (function)

**Signature**

```ts
export const memo: <F extends () => any>(get: F) => typeof get = <F extends () => any>(get: F): typeof get => ...
```

Added in v0.0.1

# merge (function)

**Signature**

```ts
export const merge = <R extends unknown[]>(...x: R): UnionToIntersection<R[number]> => ...
```

Added in v0.0.1

# projectField (function)

**Signature**

```ts
export const projectField = <T extends Record<any, Record<any, any>>>(t: T) => <K extends keyof T[keyof T]>(
  k: K
): {
  [q in keyof T]: T[q][K]
} =>
  record.map(t, p => ...
```

Added in v0.0.1

# projectFieldWithEnv (function)

**Signature**

```ts
export const projectFieldWithEnv = <T extends Record<any, (e: R, c: C) => Record<any, any>>, R, C>(
  t: T,
  env: R,
  c: C
) => <K extends keyof ReturnType<T[keyof T]>>(
  k: K
): {
  [q in keyof T]: ReturnType<T[q]>[K]
} =>
  record.map(t, p => ...
```

Added in v0.0.1
