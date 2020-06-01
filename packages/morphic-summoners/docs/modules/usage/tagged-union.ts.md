---
title: usage/tagged-union.ts
nav_order: 20
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Refinable (interface)](#refinable-interface)
- [AOfMorhpADT (type alias)](#aofmorhpadt-type-alias)
- [AOfTypes (type alias)](#aoftypes-type-alias)
- [EOfMorhpADT (type alias)](#eofmorhpadt-type-alias)
- [EOfTypes (type alias)](#eoftypes-type-alias)
- [IfStringLiteral (type alias)](#ifstringliteral-type-alias)
- [MorphADT (type alias)](#morphadt-type-alias)
- [TaggedBuilder (type alias)](#taggedbuilder-type-alias)
- [TaggedUnionProg (type alias)](#taggedunionprog-type-alias)
- [UnionTypes (type alias)](#uniontypes-type-alias)
- [makeTagged (function)](#maketagged-function)

---

# Refinable (interface)

**Signature**

```ts
export interface Refinable<
  Types extends AnyADTTypes,
  Tag extends string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  R
> {
  selectMorph: <Keys extends (keyof Types)[]>(
    keys: Keys
  ) => MorphADT<
    {
      [k in Extract<keyof Types, ElemType<Keys>>]: Types[k]
    },
    Tag,
    ProgURI,
    InterpURI,
    R
  >
  excludeMorph: <Keys extends (keyof Types)[]>(
    keys: Keys
  ) => MorphADT<
    {
      [k in Exclude<keyof Types, ElemType<Keys>>]: Types[k]
    },
    Tag,
    ProgURI,
    InterpURI,
    R
  >
}
```

Added in v0.0.1

# AOfMorhpADT (type alias)

Extracts the type of `A` for a given Morph type
/
/\*\*

**Signature**

```ts
export type AOfMorhpADT<T extends HasTypes<any>> = AOfTypes<T['_Types']>
```

Added in v0.0.1

# AOfTypes (type alias)

**Signature**

```ts
export type AOfTypes<Types extends AnyADTTypes> = Types[keyof Types][1]
```

Added in v0.0.1

# EOfMorhpADT (type alias)

Extracts the type of `E` for a given Morph type
/
/\*\*

**Signature**

```ts
export type EOfMorhpADT<T extends HasTypes<any>> = EOfTypes<T['_Types']>
```

Added in v0.0.1

# EOfTypes (type alias)

**Signature**

```ts
export type EOfTypes<Types extends AnyADTTypes> = Types[keyof Types][0]
```

Added in v0.0.1

# IfStringLiteral (type alias)

**Signature**

```ts
export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? string extends T
    ? IfString
    : IfLiteral
  : IfNotString
```

Added in v0.0.1

# MorphADT (type alias)

**Signature**

```ts
export type MorphADT<
  Types extends AnyADTTypes,
  Tag extends string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  R
> = HasTypes<Types> &
  ADT<AOfTypes<Types>, Tag> &
  Morph<R, EOfTypes<Types>, AOfTypes<Types>, InterpURI, ProgURI> &
  Refinable<Types, Tag, ProgURI, InterpURI, R>
```

Added in v0.0.1

# TaggedBuilder (type alias)

**Signature**

```ts
export type TaggedBuilder<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R> = <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI, R>>(
  o: Types
) => MorphADT<
  {
    [k in keyof Types]: Types[k] extends InhabitedTypes<any, infer E, infer A> ? [E, A] : never
  },
  Tag,
  ProgURI,
  InterpURI,
  R
>
```

Added in v0.0.1

# TaggedUnionProg (type alias)

**Signature**

```ts
export type TaggedUnionProg<R, E, A, ProgURI extends ProgramURI> = ProgramType<R, E, A>[ProgURI] &
  (<G>(a: Algebra<G, R>[TaggedUnionsURI]) => HKT2<G, R, E, A>)
```

Added in v0.0.1

# UnionTypes (type alias)

**Signature**

```ts
export type UnionTypes<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI,
  R
> = {
  [k in keyof Types]: M<R, EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}
```

Added in v0.0.1

# makeTagged (function)

**Signature**

```ts
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI, R>(
  summ: <E, A>(F: TaggedUnionProg<R, E, A, ProgURI>) => M<R, E, A, ProgURI, InterpURI>
): TaggedBuilder<ProgURI, InterpURI, R> { ... }
```

Added in v0.0.1
