---
title: unions.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraUnions (interface)](#modelalgebraunions-interface)
- [UnionConfig (interface)](#unionconfig-interface)
- [UnionsURI (type alias)](#unionsuri-type-alias)
- [UnionsURI (constant)](#unionsuri-constant)

---

# ModelAlgebraUnions (interface)

**Signature**

```ts
export interface ModelAlgebraUnions<F extends URIS, Env extends AnyEnv> {
  _F: F
  union: {
    <Types extends readonly [Kind<F, Env, any, any>, ...Kind<F, Env, any, any>[]]>(...types: Types): (
      guards: {
        [k in keyof Types]: (
          _: {
            [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? A : never
          }[number]
        ) => [Types[k]] extends [HKT<Env, infer E, infer A>]
          ? [Types[number]] extends [HKT<Env, infer E, infer All>]
            ? Either<Exclude<All, A>, A>
            : never
          : never
      },
      config?: Named<
        ConfigsForType<
          Env,
          {
            [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? E : never
          }[number],
          {
            [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? A : never
          }[number],
          UnionConfig<Types>
        >
      >
    ) => Kind<
      F,
      Env,
      {
        [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? E : never
      }[number],
      {
        [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? A : never
      }[number]
    >
  }
}
```

Added in v0.0.1

# UnionConfig (interface)

**Signature**

```ts
export interface UnionConfig<Types> {}
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
