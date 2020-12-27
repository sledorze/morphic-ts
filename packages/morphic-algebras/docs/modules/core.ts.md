---
title: core.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Algebra (type alias)](#algebra-type-alias)
- [GetAlgebra (type alias)](#getalgebra-type-alias)

---

# Algebra (type alias)

**Signature**

```ts
export type Algebra<AllAlgebra extends AlgebraURIS, Interp extends URIS, Env extends AnyEnv> = UnionToIntersection<
  AlgAlgebra<Interp, Env>[AllAlgebra]
>
```

Added in v0.0.1

# GetAlgebra (type alias)

**Signature**

```ts
export type GetAlgebra<A extends AlgebraURIS> = A
```

Added in v0.0.1
