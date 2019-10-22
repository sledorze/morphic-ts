---
title: utils.ts
nav_order: 89
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NonNullValues (type alias)](#nonnullvalues-type-alias)
- [merge (constant)](#merge-constant)
- [collect (function)](#collect-function)
- [conjunction (function)](#conjunction-function)
- [mapRecord (function)](#maprecord-function)
- [mapTupled (function)](#maptupled-function)
- [projectField (function)](#projectfield-function)

---

# NonNullValues (type alias)

**Signature**

```ts
export type NonNullValues<O> = { [k in keyof O]: O[k] extends undefined ? never : O[k] }
```

# merge (constant)

**Signature**

```ts
export const merge = ...
```

# collect (function)

**Signature**

```ts
export const collect = <K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B> => ...
```

# conjunction (function)

**Signature**

```ts
export function conjunction<A, B>(...x: [A, B]): A & B
export function conjunction<A, B, C>(...x: [A, B, C]): A & B & C
export function conjunction<A, B, C, D>(...x: [A, B, C, D]): A & B & C & D
export function conjunction<A, B, C, D, E>(...x: [A, B, C, D, E]): A & B & C & D & E
export function conjunction<A, B, C, D, E, F>(...x: [A, B, C, D, E, F]): A & B & C & D & E & F
export function conjunction<A, B, C, D, E, F, G>(...x: [A, B, C, D, E, F, G]): A & B & C & D & E & F & G
export function conjunction<A, B, C, D, E, F, G, H>(...x: [A, B, C, D, E, F, G, H]): A & B & C & D & E & F & G & H
export function conjunction<A, B, C, D, E, F, G, H, I>(
  ...x: [A, B, C, D, E, F, G, H, I]
): A & B & C & D & E & F & G & H & I { ... }
```

# mapRecord (function)

**Signature**

```ts
export const mapRecord = <Dic extends { [k in keyof Dic]: any }, B>(
  d: Dic,
  f: (v: Dic[keyof Dic]) => B
): { [k in keyof Dic]: B } => ...
```

# mapTupled (function)

**Signature**

```ts
export const mapTupled = <T, U>(xs: [T, T, ...T[]], f: (x: T) => U): [U, U, ...U[]] => ...
```

# projectField (function)

**Signature**

```ts
export const projectField = <T extends Record<any, Record<any, any>>>(t: T) => <K extends keyof T[keyof T]>(
  k: K
): {
  [q in keyof T]: T[q][K]
} =>
  record.record.map(t, p => ...
```
