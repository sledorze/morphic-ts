---
title: hkt.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Algebra (interface)](#algebra-interface)
- [Algebra1 (interface)](#algebra1-interface)
- [Algebra2 (interface)](#algebra2-interface)
- [AlgebraURIS (type alias)](#algebrauris-type-alias)

---

# Algebra (interface)

**Signature**

```ts
export interface Algebra<F, Env> {
  _AF: F
  _ENV: Env
}
```

Added in v0.0.1

# Algebra1 (interface)

**Signature**

```ts
export interface Algebra1<F extends URIS, Env extends AnyEnv> {
  _AF: F
  _ENV: Env
}
```

Added in v0.0.1

# Algebra2 (interface)

**Signature**

```ts
export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
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
