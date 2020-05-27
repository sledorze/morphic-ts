---
title: core.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Algebra (type alias)](#algebra-type-alias)
- [Algebra1 (type alias)](#algebra1-type-alias)
- [Algebra2 (type alias)](#algebra2-type-alias)
- [GetAlgebra (type alias)](#getalgebra-type-alias)

---

# Algebra (type alias)

**Signature**

```ts
export type Algebra<AllAlgebra extends AlgebraURIS, Interp, Env> = UnionToIntersection<
  AlgAlgebra<Interp, Env>[AllAlgebra]
>
```

Added in v0.0.1

# Algebra1 (type alias)

**Signature**

```ts
export type Algebra1<AllAlgebra extends AlgebraURIS, Interp extends URIS, Env extends AnyEnv> = UnionToIntersection<
  AlgAlgebra1<Interp, Env>[AllAlgebra]
>
```

Added in v0.0.1

# Algebra2 (type alias)

**Signature**

```ts
export type Algebra2<AllAlgebra extends AlgebraURIS, Interp extends URIS2, Env extends AnyEnv> = UnionToIntersection<
  AlgAlgebra2<Interp, Env>[AllAlgebra]
>
```

Added in v0.0.1

# GetAlgebra (type alias)

**Signature**

```ts
export type GetAlgebra<A extends AlgebraURIS> = A
```

Added in v0.0.1
