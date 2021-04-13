---
title: primitives.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ArrayConfig (interface)](#arrayconfig-interface)
- [BigIntConfig (interface)](#bigintconfig-interface)
- [BooleanConfig (interface)](#booleanconfig-interface)
- [DateConfig (interface)](#dateconfig-interface)
- [EitherConfig (interface)](#eitherconfig-interface)
- [KeysOfConfig (interface)](#keysofconfig-interface)
- [ModelAlgebraPrimitive (interface)](#modelalgebraprimitive-interface)
- [MutableConfig (interface)](#mutableconfig-interface)
- [NonEmptyArrayConfig (interface)](#nonemptyarrayconfig-interface)
- [NullableConfig (interface)](#nullableconfig-interface)
- [NumberConfig (interface)](#numberconfig-interface)
- [NumberLiteralConfig (interface)](#numberliteralconfig-interface)
- [OneOfLiteralsConfig (interface)](#oneofliteralsconfig-interface)
- [OptionConfig (interface)](#optionconfig-interface)
- [OptionalConfig (interface)](#optionalconfig-interface)
- [StringConfig (interface)](#stringconfig-interface)
- [StringLiteralConfig (interface)](#stringliteralconfig-interface)
- [TagConfig (interface)](#tagconfig-interface)
- [UUIDConfig (interface)](#uuidconfig-interface)
- [UnknownEConfig (interface)](#unknowneconfig-interface)
- [Keys (type alias)](#keys-type-alias)
- [LiteralT (type alias)](#literalt-type-alias)
- [PrimitiveURI (type alias)](#primitiveuri-type-alias)
- [PrimitiveURI (constant)](#primitiveuri-constant)

---

# ArrayConfig (interface)

**Signature**

```ts
export interface ArrayConfig<L, A> {}
```

Added in v0.0.1

# BigIntConfig (interface)

**Signature**

```ts
export interface BigIntConfig {}
```

Added in v0.0.1

# BooleanConfig (interface)

**Signature**

```ts
export interface BooleanConfig {}
```

Added in v0.0.1

# DateConfig (interface)

**Signature**

```ts
export interface DateConfig {}
```

Added in v0.0.1

# EitherConfig (interface)

**Signature**

```ts
export interface EitherConfig<EE, EA, AE, AA> {}
```

Added in v0.0.1

# KeysOfConfig (interface)

**Signature**

```ts
export interface KeysOfConfig<K> {}
```

Added in v0.0.1

# ModelAlgebraPrimitive (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive<F extends URIS, Env extends AnyEnv> {
  _F: F
  nullable: <L, A>(
    T: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, null | L, Option<A>, NullableConfig<L, A>>>
  ) => Kind<F, Env, null | L, Option<A>>
  boolean(config?: Named<ConfigsForType<Env, boolean, boolean, BooleanConfig>>): Kind<F, Env, boolean, boolean>
  number(config?: Named<ConfigsForType<Env, number, number, NumberConfig>>): Kind<F, Env, number, number>
  bigint(config?: Named<ConfigsForType<Env, string, bigint, BigIntConfig>>): Kind<F, Env, string, bigint>
  string(config?: Named<ConfigsForType<Env, string, string, StringConfig>>): Kind<F, Env, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: Named<ConfigsForType<Env, string, T, StringLiteralConfig<T>>>
  ) => Kind<F, Env, string, typeof value>
  numberLiteral: <T extends number>(
    value: T,
    config?: Named<ConfigsForType<Env, number, T, NumberLiteralConfig<T>>>
  ) => Kind<F, Env, number, typeof value>

  oneOfLiterals: <T extends readonly [LiteralT, ...LiteralT[]]>(
    value: T,
    config?: Named<ConfigsForType<Env, LiteralT, T[number], OneOfLiteralsConfig<T[number]>>>
  ) => Kind<F, Env, LiteralT, T[number]>

  tag: <T extends string>(
    value: T,
    config?: Named<ConfigsForType<Env, undefined, T, TagConfig<T>>>
  ) => Kind<F, Env, undefined, typeof value>
  keysOf: <K extends Keys>(
    keys: K,
    config?: Named<ConfigsForType<Env, string, keyof K, KeysOfConfig<K>>>
  ) => Kind<F, Env, string, keyof typeof keys>
  mutable: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Mutable<L>, Mutable<A>, MutableConfig<L, A>>>
  ) => Kind<F, Env, Mutable<L>, Mutable<A>>
  array: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Array<L>, Array<A>, ArrayConfig<L, A>>>
  ) => Kind<F, Env, Array<L>, Array<A>>
  nonEmptyArray: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Array<L>, ReadonlyNonEmptyArray<A>, NonEmptyArrayConfig<L, A>>>
  ) => Kind<F, Env, Array<L>, ReadonlyNonEmptyArray<A>>
  date(config?: Named<ConfigsForType<Env, string, Date, DateConfig>>): Kind<F, Env, string, Date>
  uuid(config?: Named<ConfigsForType<Env, string, UUID, UUIDConfig>>): Kind<F, Env, string, UUID>
  either: <EE, EA, AE, AA>(
    e: Kind<F, Env, EE, EA>,
    a: Kind<F, Env, AE, AA>,
    config?: Named<ConfigsForType<Env, Either<EE, AE>, Either<EA, AA>, EitherConfig<EE, EA, AE, AA>>>
  ) => Kind<F, Env, Either<EE, AE>, Either<EA, AA>>
  optional: {
    <E, A>(
      a: Kind<F, Env, E, A>,
      config?: Named<ConfigsForType<Env, E | undefined, A | undefined, OptionConfig<E, A>>>
    ): Kind<F, Env, E | undefined, A | undefined>
  }
  option: {
    <E, A>(a: Kind<F, Env, E, A>, config?: Named<ConfigsForType<Env, Option<E>, Option<A>, OptionConfig<E, A>>>): Kind<
      F,
      Env,
      Option<E>,
      Option<A>
    >
  }
  unknownE: {
    <L, A>(T: Kind<F, Env, L, A>, config?: Named<ConfigsForType<Env, unknown, A, UnknownEConfig<L, A>>>): Kind<
      F,
      Env,
      unknown,
      A
    >
  }
}
```

Added in v0.0.1

# MutableConfig (interface)

**Signature**

```ts
export interface MutableConfig<L, A> {}
```

Added in v0.0.1

# NonEmptyArrayConfig (interface)

**Signature**

```ts
export interface NonEmptyArrayConfig<L, A> {}
```

Added in v0.0.1

# NullableConfig (interface)

**Signature**

```ts
export interface NullableConfig<L, A> {}
```

Added in v0.0.1

# NumberConfig (interface)

**Signature**

```ts
export interface NumberConfig {}
```

Added in v0.0.1

# NumberLiteralConfig (interface)

**Signature**

```ts
export interface NumberLiteralConfig<T> {}
```

Added in v0.0.1

# OneOfLiteralsConfig (interface)

**Signature**

```ts
export interface OneOfLiteralsConfig<T> {}
```

Added in v0.0.1

# OptionConfig (interface)

**Signature**

```ts
export interface OptionConfig<L, A> {}
```

Added in v0.0.1

# OptionalConfig (interface)

**Signature**

```ts
export interface OptionalConfig<L, A> {}
```

Added in v0.0.1

# StringConfig (interface)

**Signature**

```ts
export interface StringConfig {}
```

Added in v0.0.1

# StringLiteralConfig (interface)

**Signature**

```ts
export interface StringLiteralConfig<T> {}
```

Added in v0.0.1

# TagConfig (interface)

**Signature**

```ts
export interface TagConfig<T> {}
```

Added in v0.0.1

# UUIDConfig (interface)

**Signature**

```ts
export interface UUIDConfig {}
```

Added in v0.0.1

# UnknownEConfig (interface)

**Signature**

```ts
export interface UnknownEConfig<L, A> {}
```

Added in v0.0.1

# Keys (type alias)

**Signature**

```ts
export type Keys = Record<string, null>
```

Added in v0.0.1

# LiteralT (type alias)

**Signature**

```ts
export type LiteralT = string | number
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
