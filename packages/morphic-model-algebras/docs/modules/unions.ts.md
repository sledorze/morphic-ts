---
title: unions.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraUnions (interface)](#modelalgebraunions-interface)
- [UnionsURI (type alias)](#unionsuri-type-alias)
- [UnionsURI (constant)](#unionsuri-constant)

---

# ModelAlgebraUnions (interface)

**Signature**

```ts
export interface ModelAlgebraUnions<F extends URIS, Env extends AnyEnv> {
  _F: F
  union: {
    <A, B, LA, LB>(types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>], name: string): Kind<F, Env, LA | LB, A | B>
    <A, B, C, LA, LB, LC>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>],
      name: string
    ): Kind<F, Env, LA | LB | LC, A | B | C>
    <A, B, C, D, LA, LB, LC, LD>(
      types: [OfType<F, LA, A, Env>, OfType<F, LB, B, Env>, OfType<F, LC, C, Env>, OfType<F, LD, D, Env>],
      name: string
    ): Kind<F, Env, LA | LB | LC | LD, A | B | C | D>
    <A, B, C, D, E, LA, LB, LC, LD, LE>(
      types: [
        OfType<F, LA, A, Env>,
        OfType<F, LB, B, Env>,
        OfType<F, LC, C, Env>,
        OfType<F, LD, D, Env>,
        OfType<F, LE, E, Env>
      ],
      name: string
    ): Kind<F, Env, LA | LB | LC | LD | LE, A | B | C | D | E>
    <L, A>(types: Array<OfType<F, L, A, Env>>, name: string): Kind<F, Env, Array<L>, Array<A>>
  }
}
```

Added in v0.0.1

# UnionsURI (type alias)

**Signature**

```ts
export type UnionsURI = typeof UnionsURI
```

Added in v0.0.1

# UnionsURI (constant)

**Signature**

```ts
export const UnionsURI: "UnionsURI" = ...
```

Added in v0.0.1
