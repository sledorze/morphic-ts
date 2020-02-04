---
title: index.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [FastCheckURI (type alias)](#fastcheckuri-type-alias)
- [FastCheckType (class)](#fastchecktype-class)
- [FastCheckURI (constant)](#fastcheckuri-constant)
- [fastCheckConfig (constant)](#fastcheckconfig-constant)

---

# FastCheckURI (type alias)

**Signature**

```ts
export type FastCheckURI = typeof FastCheckURI
```

Added in v0.0.1

# FastCheckType (class)

**Signature**

```ts
export class FastCheckType<A> {
  constructor(public arb: Arbitrary<A>) { ... }
  ...
}
```

Added in v0.0.1

# FastCheckURI (constant)

**Signature**

```ts
export const FastCheckURI: typeof FastCheckURI = ...
```

Added in v0.0.1

# fastCheckConfig (constant)

**Signature**

```ts
export const fastCheckConfig: ConfigWrapper<typeof FastCheckURI> = ...
```

Added in v0.0.1
