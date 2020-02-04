---
title: index.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EqURI (type alias)](#equri-type-alias)
- [EqType (class)](#eqtype-class)
- [EqURI (constant)](#equri-constant)
- [eqConfig (constant)](#eqconfig-constant)

---

# EqURI (type alias)

**Signature**

```ts
export type EqURI = typeof EqURI
```

Added in v0.0.1

# EqType (class)

**Signature**

```ts
export class EqType<A> {
  constructor(public eq: Eq<A>) { ... }
  ...
}
```

Added in v0.0.1

# EqURI (constant)

**Signature**

```ts
export const EqURI: typeof EqURI = ...
```

Added in v0.0.1

# eqConfig (constant)

**Signature**

```ts
export const eqConfig: ConfigWrapper<typeof EqURI> = ...
```

Added in v0.0.1
