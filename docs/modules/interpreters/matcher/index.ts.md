---
title: interpreters/matcher/index.ts
nav_order: 65
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [MatcherValue (type alias)](#matchervalue-type-alias)
- [URI (type alias)](#uri-type-alias)
- [MatcherType (class)](#matchertype-class)
  - [fold (method)](#fold-method)
  - [foldOn (method)](#foldon-method)
  - [foldOnWiden (method)](#foldonwiden-method)
- [URI (constant)](#uri-constant)
- [makeMatcher (function)](#makematcher-function)

---

# MatcherValue (type alias)

**Signature**

```ts
export type MatcherValue<B extends MatcherType<any>> = B extends MatcherType<infer A> ? A : never
```

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# MatcherType (class)

**Signature**

```ts
export class MatcherType<A> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(f: (a: A) => R): (a: A) => R { ... }
```

## foldOn (method)

**Signature**

```ts
foldOn<D extends keyof A>(discr: D): <R>(match: Match<FStruct<A>[D], R>) => (a: A) => R { ... }
```

## foldOnWiden (method)

**Signature**

```ts
foldOnWiden<D extends keyof A>(
    discr: D
  ): <M extends Match<FStruct<A>[D], any>>(match: M) => (a: A) => ReturnType<M[keyof M]> extends infer R ? R : never { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# makeMatcher (function)

**Signature**

```ts
export const makeMatcher = <A>() => ...
```
