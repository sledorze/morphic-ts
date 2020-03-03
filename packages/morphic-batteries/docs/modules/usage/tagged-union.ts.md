---
title: usage/tagged-union.ts
nav_order: 14
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [AOfMorhpADT (type alias)](#aofmorhpadt-type-alias)
- [AOfTypes (type alias)](#aoftypes-type-alias)
- [EOfMorhpADT (type alias)](#eofmorhpadt-type-alias)
- [EOfTypes (type alias)](#eoftypes-type-alias)
- [IfStringLiteral (type alias)](#ifstringliteral-type-alias)
- [MorphADT (type alias)](#morphadt-type-alias)
- [TaggedUnionProg (type alias)](#taggedunionprog-type-alias)
- [TagsOf (type alias)](#tagsof-type-alias)
- [UnionTypes (type alias)](#uniontypes-type-alias)
- [makeTagged (function)](#maketagged-function)

---

# AOfMorhpADT (type alias)

Extracts the type of `A` for a given Morph type
/
/\*\*

**Signature**

```ts
export type AOfMorhpADT<T extends MorphADT<any, any, any, any>> = T extends MorphADT<
  infer Types,
  infer _T,
  infer _P,
  infer _I
>
  ? AOfTypes<Types>
  : never
```

Added in v0.0.1

# AOfTypes (type alias)

**Signature**

```ts
export type AOfTypes<
  Types extends {
    [k in keyof Types]: [any, any]
  }
> = Types[keyof Types][1]
```

Added in v0.0.1

# EOfMorhpADT (type alias)

Extracts the type of `E` for a given Morph type
/
/\*\*

**Signature**

```ts
export type EOfMorhpADT<T extends MorphADT<any, any, any, any>> = T extends MorphADT<
  infer Types,
  infer _T,
  infer _P,
  infer _I
>
  ? EOfTypes<Types>
  : never
```

Added in v0.0.1

# EOfTypes (type alias)

**Signature**

```ts
export type EOfTypes<
  Types extends {
    [k in keyof Types]: [any, any]
  }
> = Types[keyof Types][0]
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
  Types extends { [k in keyof Types]: [any, any] },
  Tag extends string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = ADT<AOfTypes<Types>, Tag> &
  Morph<EOfTypes<Types>, AOfTypes<Types>, InterpURI, ProgURI> & {
    selectMorph: <Keys extends (keyof Types)[]>(
      keys: Keys
    ) => MorphADT<
      {
        [k in Extract<keyof Types, ElemType<Keys>>]: Types[k]
      },
      Tag,
      ProgURI,
      InterpURI
    >
    excludeMorph: <Keys extends (keyof Types)[]>(
      keys: Keys
    ) => MorphADT<
      {
        [k in Exclude<keyof Types, ElemType<Keys>>]: Types[k]
      },
      Tag,
      ProgURI,
      InterpURI
    >
  }
```

Added in v0.0.1

# TaggedUnionProg (type alias)

**Signature**

```ts
export type TaggedUnionProg<E, A, ProgURI extends ProgramURI> = ProgramType<E, A>[ProgURI] &
  (<G>(a: Algebra<G>[TaggedUnionsURI]) => HKT2<G, E, A>)
```

Added in v0.0.1

# TagsOf (type alias)

**Signature**

```ts
export type TagsOf<T> = TagsInKeys<T, keyof T> & string
```

Added in v0.0.1

# UnionTypes (type alias)

**Signature**

```ts
export type UnionTypes<
  Types extends AnyTypes,
  Tag extends keyof any,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = {
  [k in keyof Types]: M<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }, ProgURI, InterpURI>
}
```

Added in v0.0.1

# makeTagged (function)

**Signature**

```ts
export function makeTagged<ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  summ: <E, A>(F: TaggedUnionProg<E, A, ProgURI>) => M<E, A, ProgURI, InterpURI>
): <Tag extends string>(
  tag: Tag
) => <Types extends UnionTypes<Types, Tag, ProgURI, InterpURI>>(
  o: Types
) => MorphADT<
  {
    [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never
  },
  TagType<Types>,
  ProgURI,
  InterpURI
> { ... }
```

Added in v0.0.1
