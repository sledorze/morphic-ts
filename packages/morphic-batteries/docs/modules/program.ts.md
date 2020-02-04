---
title: program.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [AlgebraUnion (interface)](#algebraunion-interface)
- [P (interface)](#p-interface)
- [ProgramUnionURI (type alias)](#programunionuri-type-alias)
- [ProgramUnionURI (constant)](#programunionuri-constant)

---

# AlgebraUnion (interface)

**Signature**

```ts
export interface AlgebraUnion<F> extends InferredAlgebra<F, ProgramUnionURI> {}
```

Added in v0.0.1

# P (interface)

**Signature**

```ts
export interface P<E, A> extends InferredProgram<E, A, ProgramUnionURI> {}
```

Added in v0.0.1

# ProgramUnionURI (type alias)

**Signature**

```ts
export type ProgramUnionURI = typeof ProgramUnionURI
```

Added in v0.0.1

# ProgramUnionURI (constant)

**Signature**

```ts
export const ProgramUnionURI: typeof ProgramUnionURI = ...
```

Added in v0.0.1
