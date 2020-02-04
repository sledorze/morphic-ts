---
title: index.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ShowURI (type alias)](#showuri-type-alias)
- [ShowType (class)](#showtype-class)
- [ShowURI (constant)](#showuri-constant)
- [showConfig (constant)](#showconfig-constant)

---

# ShowURI (type alias)

**Signature**

```ts
export type ShowURI = typeof ShowURI
```

Added in v0.0.1

# ShowType (class)

**Signature**

```ts
export class ShowType<A> {
  constructor(public show: Show<A>) { ... }
  ...
}
```

Added in v0.0.1

# ShowURI (constant)

**Signature**

```ts
export const ShowURI: typeof ShowURI = ...
```

Added in v0.0.1

# showConfig (constant)

**Signature**

```ts
export const showConfig: ConfigWrapper<typeof ShowURI> = ...
```

Added in v0.0.1
