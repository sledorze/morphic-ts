---
title: primitives.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraPrimitive (interface)](#modelalgebraprimitive-interface)
- [ModelAlgebraPrimitive1 (interface)](#modelalgebraprimitive1-interface)
- [ModelAlgebraPrimitive2 (interface)](#modelalgebraprimitive2-interface)
- [Keys (type alias)](#keys-type-alias)
- [PrimitiveURI (type alias)](#primitiveuri-type-alias)
- [PrimitiveURI (constant)](#primitiveuri-constant)

---

# ModelAlgebraPrimitive (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive<F> {
  _F: F
  nullable: {
    <L, A>(T: HKT2<F, L, A>): isOptionalConfig<PrimitiveNullableConfig<L, A>, HKT2<F, null | L, Option<A>>>
    <L, A>(T: HKT2<F, L, A>, config: ByInterp<PrimitiveNullableConfig<L, A>, URIS | URIS2>): HKT2<
      F,
      null | L,
      Option<A>
    >
  }
  boolean: {
    (): isOptionalConfig<PrimitiveBooleanConfig, HKT2<F, boolean, boolean>>
    (config: ByInterp<PrimitiveBooleanConfig, URIS | URIS2>): HKT2<F, boolean, boolean>
  }
  number: {
    (): isOptionalConfig<PrimitiveNumberConfig, HKT2<F, number, number>>
    (config: ByInterp<PrimitiveNumberConfig, URIS | URIS2>): HKT2<F, number, number>
  }
  bigint: {
    (): isOptionalConfig<PrimitiveBigIntConfig, HKT2<F, string, bigint>>
    (config: ByInterp<PrimitiveBigIntConfig, URIS | URIS2>): HKT2<F, string, bigint>
  }
  string: {
    (): isOptionalConfig<PrimitiveStringConfig, HKT2<F, string, string>>
    (config: ByInterp<PrimitiveStringConfig, URIS | URIS2>): HKT2<F, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): isOptionalConfig<PrimitiveStringLiteralConfig<T>, HKT2<F, string, typeof value>>
    <T extends string>(value: T, config: ByInterp<PrimitiveStringLiteralConfig<T>, URIS | URIS2>): HKT2<
      F,
      string,
      typeof value
    >
  }
  keysOf: {
    <K extends Keys>(keys: K): isOptionalConfig<PrimitiveKeysOfConfig<keyof K>, HKT2<F, string, keyof typeof keys>>
    <K extends Keys>(keys: K, config: ByInterp<PrimitiveKeysOfConfig<keyof K>, URIS | URIS2>): HKT2<
      F,
      string,
      keyof typeof keys
    >
  }
  array: {
    <L, A>(a: HKT2<F, L, A>): isOptionalConfig<PrimitiveArrayConfig<L, A>, HKT2<F, Array<L>, Array<A>>>
    <L, A>(a: HKT2<F, L, A>, config: ByInterp<PrimitiveArrayConfig<L, A>, URIS | URIS2>): HKT2<F, Array<L>, Array<A>>
  }
  date: {
    (): isOptionalConfig<PrimitiveDateConfig, HKT2<F, string, Date>>
    (config: ByInterp<PrimitiveDateConfig, URIS | URIS2>): HKT2<F, string, Date>
  }
}
```

Added in v0.0.1

# ModelAlgebraPrimitive1 (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive1<F extends URIS> {
  _F: F
  nullable: <A>(T: Kind<F, A>, config?: ByInterp<PrimitiveNullableConfig<never, A>, F>) => Kind<F, Option<A>>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind<F, boolean>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind<F, number>
  bigint(config?: ByInterp<PrimitiveBigIntConfig, F>): Kind<F, bigint>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind<F, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: ByInterp<PrimitiveStringLiteralConfig<T>, F>
  ) => Kind<F, typeof value>
  keysOf: <K extends Keys>(keys: K, config?: ByInterp<PrimitiveKeysOfConfig<keyof K>, F>) => Kind<F, keyof typeof keys>
  array: <A>(a: Kind<F, A>, config?: ByInterp<PrimitiveArrayConfig<never, A>, F>) => Kind<F, Array<A>>
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind<F, Date>
}
```

Added in v0.0.1

# ModelAlgebraPrimitive2 (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive2<F extends URIS2> {
  _F: F
  nullable: <L, A>(
    T: Kind2<F, L, A>,
    config?: ByInterp<PrimitiveNullableConfig<L, A>, F>
  ) => Kind2<F, null | L, Option<A>>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind2<F, boolean, boolean>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind2<F, number, number>
  bigint(config?: ByInterp<PrimitiveBigIntConfig, F>): Kind2<F, string, bigint>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind2<F, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: ByInterp<PrimitiveStringLiteralConfig<T>, F>
  ) => Kind2<F, string, typeof value>
  keysOf: <K extends Keys>(
    keys: K,
    config?: ByInterp<PrimitiveKeysOfConfig<keyof K>, F>
  ) => Kind2<F, string, keyof typeof keys>
  array: <L, A>(a: Kind2<F, L, A>, config?: ByInterp<PrimitiveArrayConfig<L, A>, F>) => Kind2<F, Array<L>, Array<A>>
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind2<F, string, Date>
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
