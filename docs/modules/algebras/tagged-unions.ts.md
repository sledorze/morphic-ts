---
title: algebras/tagged-unions.ts
nav_order: 6
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
- [TaggedValues (type alias)](#taggedvalues-type-alias)

---

# ModelAlgebraTaggedUnions (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions {
  taggedUnion<Tag extends string, Types extends TaggedTypes<Tag, any, any>>(
    tag: Tag,
    types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> }
  ): M<{ [k in keyof Types]: Types[k]['_L'] }[keyof Types], { [k in keyof Types]: Types[k]['_A'] }[keyof Types]>
}
```

# ModelAlgebraTaggedUnions1 (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions1<F extends URIS> {
  taggedUnion<Tag extends string, O>(tag: Tag, types: TaggedTypes1<F, Tag, O>): Kind<F, TaggedValues<Tag, O>[keyof O]>
}
```

# ModelAlgebraTaggedUnions2 (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions2<F extends URIS2> {
  taggedUnion<Tag extends string, A, L>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L>
  ): Kind2<F, TaggedValues<Tag, A>[keyof A], TaggedValues<Tag, L>[keyof L]>
}
```

# TaggedTypes (type alias)

**Signature**

```ts
export type TaggedTypes<Tag extends string, L, A> = {
  [o in keyof A & keyof L]: M<L[o], (A & { [x in o]: { [k in Tag]: o } })[o]>
}
```

# TaggedTypes1 (type alias)

**Signature**

```ts
export type TaggedTypes1<F extends URIS, Tag extends string, O> = { [o in keyof O]: Kind<F, O[o] & { [t in Tag]: o }> }
```

# TaggedTypes2 (type alias)

**Signature**

```ts
export type TaggedTypes2<F extends URIS2, Tag extends string, L, A> = {
  [o in keyof A & keyof L]: Kind2<F, A[o] & { [t in Tag]: o }, L[o] & { [t in Tag]: o }>
}
```

# TaggedValues (type alias)

**Signature**

```ts
export type TaggedValues<Tag extends string, O> = { [o in keyof O]: O[o] & { [t in Tag]: o } }
```
