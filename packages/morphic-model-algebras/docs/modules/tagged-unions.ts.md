---
title: tagged-unions.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraTaggedUnions (interface)](#modelalgebrataggedunions-interface)
- [TaggedUnionsURI (type alias)](#taggedunionsuri-type-alias)
- [TaggedUnionsURI (constant)](#taggedunionsuri-constant)

---

# ModelAlgebraTaggedUnions (interface)

**Signature**

```ts
export interface ModelAlgebraTaggedUnions<F extends URIS, Env> {
  _F: F
  taggedUnion: {
    <Tag extends string, Types extends TaggedTypes<F, any, Env>>(
      tag: Tag,
      types: Types,
      name: string,
      config?: ConfigsForType<Env, PropsE<Types>, PropsA<Types>>
    ): Kind<F, Env, PropsE<Types>, PropsA<Types>>
  }
}
```

Added in v0.0.1

# TaggedUnionsURI (type alias)

**Signature**

```ts
export type TaggedUnionsURI = typeof TaggedUnionsURI
```

Added in v0.0.1

# TaggedUnionsURI (constant)

**Signature**

```ts
export const TaggedUnionsURI: "TaggedUnionsURI" = ...
```

Added in v0.0.1
