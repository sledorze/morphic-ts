---
title: program-orderable.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [AlgebraNoUnion (interface)](#algebranounion-interface)
- [P (interface)](#p-interface)
- [ProgramOrderableURI (type alias)](#programorderableuri-type-alias)
- [ProgramOrderableURI (constant)](#programorderableuri-constant)

---

# AlgebraNoUnion (interface)

**Signature**

```ts
export interface AlgebraNoUnion<F, Env> extends InferredAlgebra<F, ProgramOrderableURI, Env> {}
```

Added in v0.0.1

# P (interface)

**Signature**

```ts
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramOrderableURI> {}
```

Added in v0.0.1

# ProgramOrderableURI (type alias)

**Signature**

```ts
export type ProgramOrderableURI = typeof ProgramOrderableURI
```

Added in v0.0.1

# ProgramOrderableURI (constant)

**Signature**

```ts
export const ProgramOrderableURI: "ProgramOrderableURI" = ...
```

Added in v0.0.1
