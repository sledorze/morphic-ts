---
title: algebras/primitives.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraPrimitive (interface)](#modelalgebraprimitive-interface)
- [ModelAlgebraPrimitive1 (interface)](#modelalgebraprimitive1-interface)
- [ModelAlgebraPrimitive2 (interface)](#modelalgebraprimitive2-interface)
- [Keys (type alias)](#keys-type-alias)

---

# ModelAlgebraPrimitive (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive {
  date: M<string, Date>
  string: M<string, string>
  number: M<number, number>
  boolean: M<boolean, boolean>
  stringLiteral: <T extends string>(value: T) => M<string, typeof value>
  keysOf: <K extends Keys>(keys: K) => M<string, keyof typeof keys>
  nullable: <L, A>(T: M<L, A>) => M<null | L, Option<A>>
  array: <L, A>(a: M<L, A>) => M<Array<L>, Array<A>>
}
```

# ModelAlgebraPrimitive1 (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive1<F extends URIS> {
  date: Kind<F, Date>
  string: Kind<F, string>
  number: Kind<F, number>
  boolean: Kind<F, boolean>
  stringLiteral: <T extends string>(value: T) => Kind<F, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind<F, keyof typeof keys>
  nullable: <A>(T: Kind<F, A>) => Kind<F, Option<A>>
  array: <A>(a: Kind<F, A>) => Kind<F, Array<A>>
}
```

# ModelAlgebraPrimitive2 (interface)

**Signature**

```ts
export interface ModelAlgebraPrimitive2<F extends URIS2> {
  date: Kind2<F, string, Date>
  string: Kind2<F, string, string>
  number: Kind2<F, number, number>
  boolean: Kind2<F, boolean, boolean>
  stringLiteral: <T extends string>(value: T) => Kind2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind2<F, string, keyof typeof keys>
  nullable: <L, A>(T: Kind2<F, L, A>) => Kind2<F, null | L, Option<A>>
  array: <L, A>(a: Kind2<F, L, A>) => Kind2<F, Array<L>, Array<A>>
}
```

# Keys (type alias)

**Signature**

```ts
export type Keys = Record<string, null>
```
