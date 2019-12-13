---
title: adt/common.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ElemType (type alias)](#elemtype-type-alias)
- [ExcludeUnion (type alias)](#excludeunion-type-alias)
- [ExtractUnion (type alias)](#extractunion-type-alias)
- [IfStringLiteral (type alias)](#ifstringliteral-type-alias)
- [Remove (type alias)](#remove-type-alias)
- [TagsOf (type alias)](#tagsof-type-alias)
- [assignFunction (function)](#assignfunction-function)

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
export type ExcludeUnion<A, Tag extends keyof A & string, Tags extends string> = Exclude<A, Record<Tag, Tags>>
```

Added in v0.0.1

# ExtractUnion (type alias)

**Signature**

```ts
export type ExtractUnion<A, Tag extends keyof A & string, Tags extends string> = Extract<A, Record<Tag, Tags>>
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

# Remove (type alias)

**Signature**

```ts
export type Remove<A, Tag> = { [k in Exclude<keyof A, Tag>]: A[k] }
```

Added in v0.0.1

# TagsOf (type alias)

**Signature**

```ts
export type TagsOf<T> = TagsInKeys<T, keyof T>
```

Added in v0.0.1

# assignFunction (function)

**Signature**

```ts
export const assignFunction = <F extends Function, C>(ab: F, c: C): F & C => ...
```

Added in v0.0.1
