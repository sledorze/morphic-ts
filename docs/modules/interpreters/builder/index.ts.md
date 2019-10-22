---
title: interpreters/builder/index.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Builder (type alias)](#builder-type-alias)
- [BuilderValue (type alias)](#buildervalue-type-alias)
- [URI (type alias)](#uri-type-alias)
- [BuilderType (class)](#buildertype-class)
- [URI (constant)](#uri-constant)
- [makeBuilder (function)](#makebuilder-function)

---

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
