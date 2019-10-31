---
title: common/index.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ElemType (type alias)](#elemtype-type-alias)
- [ExtractUnion (type alias)](#extractunion-type-alias)
- [IfStringLiteral (type alias)](#ifstringliteral-type-alias)
- [Remove (type alias)](#remove-type-alias)
- [TagsOf (type alias)](#tagsof-type-alias)
- [VariantType (type alias)](#varianttype-type-alias)

---

# ElemType (type alias)

**Signature**

```ts
export type ElemType<A> = A extends Array<infer E> ? E : never
```

# ExtractUnion (type alias)

**Signature**

```ts
export type ExtractUnion<A, Tag extends keyof A & string, Tags extends string> = IfStringLiteral<
  Tags,
  Extract<A, Record<Tag, Tags>>,
  never,
  never
>
```

# IfStringLiteral (type alias)

**Signature**

```ts
export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? (string extends T ? IfString : IfLiteral)
  : IfNotString
```

# Remove (type alias)

**Signature**

```ts
export type Remove<A, Tag> = { [k in Exclude<keyof A, Tag>]: A[k] }
```

# TagsOf (type alias)

**Signature**

```ts
export type TagsOf<T> = TagsInKeys<T, keyof T>
```

# VariantType (type alias)

**Signature**

```ts
export type VariantType<A, Tag extends string, Key> = IfStringLiteral<Key, Extract<A, Record<Tag, Key>>, never, never>
```
