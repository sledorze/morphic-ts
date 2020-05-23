---
title: tagged-unions.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraTaggedUnions (interface)](#modelalgebrataggedunions-interface)
- [ModelAlgebraTaggedUnions1 (interface)](#modelalgebrataggedunions1-interface)
- [ModelAlgebraTaggedUnions2 (interface)](#modelalgebrataggedunions2-interface)
- [TaggedTypes (type alias)](#taggedtypes-type-alias)
- [TaggedTypes1 (type alias)](#taggedtypes1-type-alias)
- [TaggedTypes2 (type alias)](#taggedtypes2-type-alias)
- [TaggedUnionsURI (type alias)](#taggedunionsuri-type-alias)
- [TaggedValues (type alias)](#taggedvalues-type-alias)
- [TaggedUnionsURI (constant)](#taggedunionsuri-constant)

---

# ModelAlgebraTaggedUnions (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions<F, Env> {
  _F: F
  taggedUnion: {
    <Tag extends string, Types extends TaggedTypes<F, Tag, any, any, Env>>(
      tag: Tag,
      types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> },
      name: string,
      config?: ConfigsForType<Env, Types[keyof Types]['_E'], Types[keyof Types]['_A']>
    ): HKT2<F, Env, Types[keyof Types]['_E'], Types[keyof Types]['_A']>
  }
}
```

Added in v0.0.1

# ModelAlgebraTaggedUnions1 (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions1<F extends URIS, Env extends AnyEnv> {
  _F: F
  taggedUnion<Tag extends string, O>(
    tag: Tag,
    types: TaggedTypes1<F, Tag, O, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, TaggedValues<Tag, O>[keyof O]>
  ): Kind<F, Env, TaggedValues<Tag, O>[keyof O]>
}
```

Added in v0.0.1

# ModelAlgebraTaggedUnions2 (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  taggedUnion<Tag extends string, A, L>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L, Env>,
    name: string,
    config?: ConfigsForType<Env, TaggedValues<Tag, L>[keyof L], TaggedValues<Tag, A>[keyof A]>
  ): Kind2<F, Env, TaggedValues<Tag, L>[keyof L], TaggedValues<Tag, A>[keyof A]>
}
```

Added in v0.0.1

# TaggedTypes (type alias)

**Signature**

```ts
export type TaggedTypes<F, Tag extends string, L, A, R> = {
  [o in keyof A & keyof L]: HKT2<F, R, L[o], (A & { [x in o]: { [k in Tag]: o } })[o]>
}
```

Added in v0.0.1

# TaggedTypes1 (type alias)

**Signature**

```ts
export type TaggedTypes1<F extends URIS, Tag extends string, O, R> = {
  [o in keyof O]: Kind<F, R, O[o] & { [t in Tag]: o }>
}
```

Added in v0.0.1

# TaggedTypes2 (type alias)

**Signature**

```ts
export type TaggedTypes2<F extends URIS2, Tag extends string, L, A, R> = {
  [o in keyof A & keyof L]: Kind2<F, R, A[o] & { [t in Tag]: o }, L[o] & { [t in Tag]: o }>
}
```

Added in v0.0.1

# TaggedUnionsURI (type alias)

**Signature**

```ts
export type TaggedUnionsURI = typeof TaggedUnionsURI
```

Added in v0.0.1

# TaggedValues (type alias)

**Signature**

```ts
export type TaggedValues<Tag extends string, O> = { [o in keyof O]: O[o] & { [t in Tag]: o } }
```

Added in v0.0.1

# TaggedUnionsURI (constant)

**Signature**

```ts
export const TaggedUnionsURI: "TaggedUnionsURI" = ...
```

Added in v0.0.1
