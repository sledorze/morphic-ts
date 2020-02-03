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
export interface Algebra<F> {
  _AF: F
}
```

Added in v0.0.1

# Algebra1 (interface)

**Signature**

```ts
export interface Algebra1<F extends URIS> {
  _AF: F
}
```

Added in v0.0.1

# Algebra2 (interface)

**Signature**

```ts
export interface Algebra2<F extends URIS2> {
  _AF: F
}
```

Added in v0.0.1

# AlgebraURIS (type alias)

**Signature**

```ts
export type AlgebraURIS = keyof Algebra<never>
```

Added in v0.0.1
