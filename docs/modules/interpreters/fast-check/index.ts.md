---
title: interpreters/fast-check/index.ts
nav_order: 28
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [FastCheckType (class)](#fastchecktype-class)
- [URI (constant)](#uri-constant)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# FastCheckType (class)

**Signature**

```ts
export class FastCheckType<A> {
  constructor(public arb: fc.Arbitrary<A>) { ... }
  ...
}
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```
