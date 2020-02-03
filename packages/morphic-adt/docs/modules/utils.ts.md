---
title: utils.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ElemType (type alias)](#elemtype-type-alias)
- [ExcludeUnion (type alias)](#excludeunion-type-alias)
- [ExtractUnion (type alias)](#extractunion-type-alias)
- [Remove (type alias)](#remove-type-alias)

---

# ElemType (type alias)

**Signature**

```ts
export type ElemType<A> = A extends Array<infer E> ? E : never
```

Added in v0.0.1

# ExcludeUnion (type alias)

**Signature**

```ts
export type ExcludeUnion<A, Tag extends keyof A, Tags extends A[Tag]> = Exclude<A, Record<Tag, Tags>>
```

Added in v0.0.1

# ExtractUnion (type alias)

**Signature**

```ts
export type ExtractUnion<A, Tag extends keyof A, Tags extends A[Tag]> = Extract<A, Record<Tag, Tags>>
```

Added in v0.0.1

# Remove (type alias)

**Signature**

```ts
export type Remove<A, Tag> = { [k in Exclude<keyof A, Tag>]: A[k] }
```

Added in v0.0.1
