---
title: hkt.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Algebra (interface)](#algebra-interface)
- [AlgebraURIS (type alias)](#algebrauris-type-alias)

---

# Algebra (interface)

**Signature**

```ts
export interface Algebra<F extends URIS, Env extends AnyEnv> {
  _AF: F
  _ENV: Env
}
```

Added in v0.0.1

# AlgebraURIS (type alias)

**Signature**

```ts
export type AlgebraURIS = Exclude<keyof Algebra<never, never>, '_AF' | '_ENV'>
```

Added in v0.0.1
