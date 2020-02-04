---
title: StateEither.ts
nav_order: 17
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [StateEither (interface)](#stateeither-interface)
- [URI (type alias)](#uri-type-alias)
- [StateEither (constant)](#stateeither-constant)
- [URI (constant)](#uri-constant)
- [evalState (constant)](#evalstate-constant)
- [execState (constant)](#execstate-constant)
- [get (constant)](#get-constant)
- [gets (constant)](#gets-constant)
- [modify (constant)](#modify-constant)
- [put (constant)](#put-constant)
- [right (constant)](#right-constant)
- [rightState (constant)](#rightstate-constant)
- [stateEither (constant)](#stateeither-constant)
- [stateEitherSeq (constant)](#stateeitherseq-constant)
- [StateEitherK (function)](#stateeitherk-function)
- [StatekEitherK (function)](#statekeitherk-function)
- [chainEitherK (function)](#chaineitherk-function)
- [fromEitherK (function)](#fromeitherk-function)
- [left (function)](#left-function)
- [leftState (function)](#leftstate-function)
- [run (function)](#run-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [filterOrElse (export)](#filterorelse-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [fromPredicate (export)](#frompredicate-export)
- [map (export)](#map-export)

---

# StateEither (interface)

**Signature**

```ts
export interface StateEither<S, E, A> {
  (s: S): Either<E, [A, S]>
}
```

Added in v0.1.0
/
/\*\*

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0
/
/\*\*

# StateEither (constant)

**Signature**

```ts
export const StateEither: <S, E, A>(ma: Either<E, A>) => StateEither<S, E, A> = ...
```

Added in v0.1.0
/
/\*\*

# URI (constant)

**Signature**

```ts
export const URI: "StateEither" = ...
```

Added in v0.1.0
/
/\*\*

# evalState (constant)

**Signature**

```ts
export const evalState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => Either<E, A> = ...
```

Added in v0.1.0
/
/\*\*

# execState (constant)

**Signature**

```ts
export const execState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => Either<E, S> = ...
```

Added in v0.1.0
/
/\*\*

# get (constant)

**Signature**

```ts
export const get: <S>() => StateEither<S, never, S> = ...
```

Added in v0.1.0
/
/\*\*

# gets (constant)

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateEither<S, never, A> = ...
```

Added in v0.1.0
/
/\*\*

# modify (constant)

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateEither<S, never, void> = ...
```

Added in v0.1.0
/
/\*\*

# put (constant)

**Signature**

```ts
export const put: <S>(s: S) => StateEither<S, never, void> = ...
```

Added in v0.1.0
/
/\*\*

# right (constant)

**Signature**

```ts
export const right: <S, A>(a: A) => StateEither<S, never, A> = ...
```

Added in v0.1.0
/
/\*\*

# rightState (constant)

**Signature**

```ts
export const rightState: <S, A>(ma: State<S, A>) => StateEither<S, never, A> = ...
```

Added in v0.1.0
/
/\*\*

# stateEither (constant)

**Signature**

```ts
export const stateEither: Monad3<URI> & MonadThrow3<URI> = ...
```

Added in v0.1.0
/
/\*\*

# stateEitherSeq (constant)

Like `stateEither` but `ap` is sequential

**Signature**

```ts
export const stateEitherSeq: typeof stateEither = ...
```

Added in v0.1.0
/
/\*\*

# StateEitherK (function)

**Signature**

```ts
export function StateEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S>(...a: A) => StateEither<S, E, B> { ... }
```

Added in v0.1.10
/
/\*\*

# StatekEitherK (function)

**Signature**

```ts
export function StatekEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S>(ma: StateEither<S, E, A>) => StateEither<S, E, B> { ... }
```

Added in v0.1.10
/
/\*\*

# chainEitherK (function)

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S>(ma: StateEither<S, E, A>) => StateEither<S, E, B> { ... }
```

Added in v0.1.10
/
/\*\*

# fromEitherK (function)

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S>(...a: A) => StateEither<S, E, B> { ... }
```

Added in v0.1.10
/
/\*\*

# left (function)

**Signature**

```ts
export function left<S, E>(e: E): StateEither<S, E, never> { ... }
```

Added in v0.1.0
/
/\*\*

# leftState (function)

**Signature**

```ts
export function leftState<S, E>(me: State<S, E>): StateEither<S, E, never> { ... }
```

Added in v0.1.0
/
/\*\*

# run (function)

**Signature**

```ts
export function run<S, E, A>(ma: StateEither<S, E, A>, s: S): Either<E, [A, S]> { ... }
```

Added in v0.1.0
/
/\*\*

# ap (export)

**Signature**

```ts
<R, E, A>(fa: StateEither<R, E, A>) => <B>(fab: StateEither<R, E, (a: A) => B>) => StateEither<R, E, B>
```

Added in v0.1.0

# apFirst (export)

**Signature**

```ts
<R, E, B>(fb: StateEither<R, E, B>) => <A>(fa: StateEither<R, E, A>) => StateEither<R, E, A>
```

Added in v0.1.0

# apSecond (export)

**Signature**

```ts
<R, E, B>(fb: StateEither<R, E, B>) => <A>(fa: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.0

# chain (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateEither<R, E, B>) => (ma: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.0

# chainFirst (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateEither<R, E, B>) => (ma: StateEither<R, E, A>) => StateEither<R, E, A>
```

Added in v0.1.0

# filterOrElse (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: StateEither<R, E, A>) => StateEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateEither<R, E, A>) => StateEither<R, E, A>; }
```

Added in v0.1.0

# flatten (export)

**Signature**

```ts
<R, E, A>(mma: StateEither<R, E, StateEither<R, E, A>>) => StateEither<R, E, A>
```

Added in v0.1.0

# fromEither (export)

**Signature**

```ts
<R, E, A>(ma: E.Either<E, A>) => StateEither<R, E, A>
```

Added in v0.1.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateEither<R, E, A>
```

Added in v0.1.0

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => StateEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateEither<R, E, A>; }
```

Added in v0.1.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: StateEither<R, E, A>) => StateEither<R, E, B>
```

Added in v0.1.0
