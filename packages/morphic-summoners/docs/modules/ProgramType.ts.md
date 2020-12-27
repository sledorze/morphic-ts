---
title: ProgramType.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ProgramAlgebra (interface)](#programalgebra-interface)
- [ProgramAlgebraURI (interface)](#programalgebrauri-interface)
- [ProgramType (interface)](#programtype-interface)
- [ProgramURI (type alias)](#programuri-type-alias)

---

# ProgramAlgebra (interface)

**Signature**

```ts
export interface ProgramAlgebra<F, Env> {
  _F: F
}
```

Added in v0.0.1

# ProgramAlgebraURI (interface)

**Signature**

```ts
export interface ProgramAlgebraURI {}
```

Added in v0.0.1

# ProgramType (interface)

**Signature**

```ts
export interface ProgramType<R extends AnyConfigEnv, E, A> {
  _R: (_: R) => void
  _E: E
  _A: A
}
```

Added in v0.0.1

# ProgramURI (type alias)

**Signature**

```ts
export declare type ProgramURI = Exclude<keyof ProgramType<any, any, any>, '_E' | '_A' | '_R'>
```

Added in v0.0.1
