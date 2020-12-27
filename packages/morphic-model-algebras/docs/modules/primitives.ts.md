---
title: primitives.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraPrimitive (interface)](#modelalgebraprimitive-interface)
- [Keys (type alias)](#keys-type-alias)
- [PrimitiveURI (type alias)](#primitiveuri-type-alias)
- [PrimitiveURI (constant)](#primitiveuri-constant)

---

# ModelAlgebraPrimitive (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive<F extends URIS, Env extends AnyEnv> {
  _F: F
  nullable: <L, A>(
    T: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, null | L, Option<A>>
  ) => Kind<F, Env, null | L, Option<A>>
  boolean(config?: ConfigsForType<Env, boolean, boolean>): Kind<F, Env, boolean, boolean>
  number(config?: ConfigsForType<Env, number, number>): Kind<F, Env, number, number>
  bigint(config?: ConfigsForType<Env, string, bigint>): Kind<F, Env, string, bigint>
  string(config?: ConfigsForType<Env, string, string>): Kind<F, Env, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: ConfigsForType<Env, string, T>
  ) => Kind<F, Env, string, typeof value>
  tag: <T extends string>(value: T, config?: ConfigsForType<Env, undefined, T>) => Kind<F, Env, undefined, typeof value>
  keysOf: <K extends Keys>(
    keys: K,
    config?: ConfigsForType<Env, string, keyof K>
  ) => Kind<F, Env, string, keyof typeof keys>
  mutable: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Mutable<L>, Mutable<A>>
  ) => Kind<F, Env, Mutable<L>, Mutable<A>>
  array: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Array<L>, Array<A>>
  ) => Kind<F, Env, Array<L>, Array<A>>
  nonEmptyArray: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Array<L>, ReadonlyNonEmptyArray<A>>
  ) => Kind<F, Env, Array<L>, ReadonlyNonEmptyArray<A>>
  date(config?: ConfigsForType<Env, string, Date>): Kind<F, Env, string, Date>
  uuid(config?: ConfigsForType<Env, string, UUID>): Kind<F, Env, string, UUID>
  either: <EE, EA, AE, AA>(
    e: Kind<F, Env, EE, EA>,
    a: Kind<F, Env, AE, AA>,
    config?: ConfigsForType<Env, Either<EE, AE>, Either<EA, AA>>
  ) => Kind<F, Env, Either<EE, AE>, Either<EA, AA>>
  option: {
    <E, A>(a: Kind<F, Env, E, A>, config?: ConfigsForType<Env, Option<E>, Option<A>>): Kind<
      F,
      Env,
      Option<E>,
      Option<A>
    >
  }
}
```

Added in v0.0.1

# Keys (type alias)

**Signature**

```ts
export type Keys = Record<string, null>
```

Added in v0.0.1

# PrimitiveURI (type alias)

**Signature**

```ts
export type PrimitiveURI = typeof PrimitiveURI
```

Added in v0.0.1

# PrimitiveURI (constant)

**Signature**

```ts
export const PrimitiveURI: "PrimitiveURI" = ...
```

Added in v0.0.1
