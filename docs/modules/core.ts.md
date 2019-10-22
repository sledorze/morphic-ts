---
title: core.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [AnyTypeDic (interface)](#anytypedic-interface)
- [InterpreterFor (interface)](#interpreterfor-interface)
- [InterpreterFor2 (interface)](#interpreterfor2-interface)
- [M (interface)](#m-interface)
- [AnyType (type alias)](#anytype-type-alias)
- [AnyType2 (type alias)](#anytype2-type-alias)
- [InterpreterOf (type alias)](#interpreterof-type-alias)
- [InterpreterOf2 (type alias)](#interpreterof2-type-alias)
- [OfType (type alias)](#oftype-type-alias)
- [OfType2 (type alias)](#oftype2-type-alias)
- [TypeOfA (type alias)](#typeofa-type-alias)
- [TypeOfA2 (type alias)](#typeofa2-type-alias)
- [TypeOfL2 (type alias)](#typeofl2-type-alias)
- [InterpreterFor (function)](#interpreterfor-function)
- [InterpreterFor2 (function)](#interpreterfor2-function)
- [cacheByKey (function)](#cachebykey-function)

---

# AnyTypeDic (interface)

**Signature**

```ts
export interface AnyTypeDic<F extends URIS> {
  [k: string]: Kind<F, any>
}
```

# InterpreterFor (interface)

This is necessary to help fixing F type for inference

**Signature**

```ts
export interface InterpreterFor<F extends URIS> {
  readonly InterpreterType: F
}
```

# InterpreterFor2 (interface)

**Signature**

```ts
export interface InterpreterFor2<F extends URIS2> {
  readonly InterpreterType: F
}
```

# M (interface)

**Signature**

```ts
export interface M<L, A> {
  _L: L
  _A: A
}
```

# AnyType (type alias)

**Signature**

```ts
export type AnyType<F extends URIS> = Kind<F, any>
```

# AnyType2 (type alias)

**Signature**

```ts
export type AnyType2<F extends URIS2> = Kind2<F, any, any>
```

# InterpreterOf (type alias)

**Signature**

```ts
export type InterpreterOf<F extends URIS, O extends object> = InterpreterFor<F> & O
```

# InterpreterOf2 (type alias)

**Signature**

```ts
export type InterpreterOf2<F extends URIS2, O extends object> = InterpreterFor2<F> & O
```

# OfType (type alias)

**Signature**

```ts
export type OfType<F extends URIS, A> = Kind<F, A>
```

# OfType2 (type alias)

**Signature**

```ts
export type OfType2<F extends URIS2, L, A> = Kind2<F, L, A>
```

# TypeOfA (type alias)

**Signature**

```ts
export type TypeOfA<X extends any> = X extends OfType<infer _, infer A> ? A : never
```

# TypeOfA2 (type alias)

**Signature**

```ts
export type TypeOfA2<X extends any> = X extends OfType2<infer _, infer A, any> ? A : never
```

# TypeOfL2 (type alias)

**Signature**

```ts
export type TypeOfL2<X extends any> = X extends OfType2<infer _, any, infer L> ? L : never
```

# InterpreterFor (function)

**Signature**

```ts
export const InterpreterFor = <K extends URIS>(k: K) => <O extends object>(o: O): InterpreterOf<K, O> => ...
```

# InterpreterFor2 (function)

**Signature**

```ts
export const InterpreterFor2 = <K extends URIS2>(k: K) => <O extends object>(o: O): InterpreterOf2<K, O> => ...
```

# cacheByKey (function)

**Signature**

```ts
export const cacheByKey = <K, V>(f: (k: K) => V) => ...
```
