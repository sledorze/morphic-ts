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
    <Types extends readonly [Kind<F, Env, any, any>, ...Kind<F, Env, any, any>[]]>(types: Types): (
      guards: {
        [k in keyof Types]: (
          _: {
            [h in keyof Types]: Types[h] extends Kind<F, Env, infer E, infer A> ? A : never
          }[number]
        ) => Types[k] extends HKT<any, any, any>
          ? Either<Exclude<Types[number]['_A'], Types[k]['_A']>, Types[k]['_A']>
          : never
      },
      name: string
    ) => Kind<F, Env, Types[number]['_E'], Types[number]['_A']>
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
