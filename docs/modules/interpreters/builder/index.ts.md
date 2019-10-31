---
title: interpreters/builder/index.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ThereIsSomeMissingTags (interface)](#thereissomemissingtags-interface)
- [Builder (type alias)](#builder-type-alias)
- [BuilderValue (type alias)](#buildervalue-type-alias)
- [URI (type alias)](#uri-type-alias)
- [BuilderType (class)](#buildertype-class)
- [URI (constant)](#uri-constant)
- [makeBuilder (function)](#makebuilder-function)

---

# ThereIsSomeMissingTags (interface)

**Signature**

```ts
export interface ThereIsSomeMissingTags<A, B> {}
```

# Builder (type alias)

**Signature**

```ts
export type Builder<T> = (x: T) => T
```

# BuilderValue (type alias)

**Signature**

```ts
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never
```

<<<<<<< Updated upstream
=======
# ByTag (type alias)

**Signature**

```ts
export type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(
  ...tags: Tags
) => A[Tag] extends ElemType<typeof tags>
  ? ADT<A, Tag, ElemType<typeof tags>>
  : ThereIsSomeMissingTags<A[Tag], ElemType<typeof tags>>
```

>>>>>>> Stashed changes
# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# BuilderType (class)

**Signature**

```ts
export class BuilderType<A> {
  constructor(public builder: Builder<A>) { ... }
  ...
}
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# makeBuilder (function)

**Signature**

```ts
export const makeBuilder = <A>() => ...
```
