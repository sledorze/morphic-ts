---
title: program-no-union.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [AlgebraNoUnion (interface)](#algebranounion-interface)
- [P (interface)](#p-interface)
- [ProgramNoUnionURI (type alias)](#programnounionuri-type-alias)
- [ProgramNoUnionURI (constant)](#programnounionuri-constant)

---

# AlgebraNoUnion (interface)

**Signature**

```ts
export interface AlgebraNoUnion<F extends URIS, Env> extends InferredAlgebra<F, ProgramNoUnionURI, Env> {}
```

Added in v0.0.1

# P (interface)

**Signature**

```ts
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramNoUnionURI> {}
```

Added in v0.0.1

# ProgramNoUnionURI (type alias)

**Signature**

```ts
export type ProgramNoUnionURI = typeof ProgramNoUnionURI
```

Added in v0.0.1

# ProgramNoUnionURI (constant)

**Signature**

```ts
export const ProgramNoUnionURI: "ProgramNoUnionURI" = ...
```

Added in v0.0.1
