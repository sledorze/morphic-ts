---
title: usage/ProgramType.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ProgramAlgebra (interface)](#programalgebra-interface)
- [ProgramAlgebraURI (interface)](#programalgebrauri-interface)
- [ProgramType (interface)](#programtype-interface)
- [ProgramTypes (interface)](#programtypes-interface)
- [ProgramURI (type alias)](#programuri-type-alias)

---

# ProgramAlgebra (interface)

**Signature**

```ts
export interface ProgramAlgebra<F> {
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

A Program is expressed within an Algebra to materialize a Morph
/
/\*\*

**Signature**

```ts
export interface ProgramType<E, A> {
  _E: E
  _A: A
}
```

Added in v0.0.1

# ProgramTypes (interface)

**Signature**

```ts
export interface ProgramTypes {}
```

Added in v0.0.1

# ProgramURI (type alias)

**Signature**

```ts
export declare type ProgramURI = Exclude<keyof ProgramType<any, any>, '_E' | '_A'>
```

Added in v0.0.1
