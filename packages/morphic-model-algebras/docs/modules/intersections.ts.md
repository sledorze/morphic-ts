---
title: intersections.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IntersectionConfig (interface)](#intersectionconfig-interface)
- [ModelAlgebraIntersection (interface)](#modelalgebraintersection-interface)
- [InterfaceLA (type alias)](#interfacela-type-alias)
- [IntersectionLA (type alias)](#intersectionla-type-alias)
- [IntersectionURI (type alias)](#intersectionuri-type-alias)
- [IntersectionURI (constant)](#intersectionuri-constant)

---

# IntersectionConfig (interface)

**Signature**

```ts
export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {}
```

Added in v0.0.1

# ModelAlgebraIntersection (interface)

**Signature**

```ts
export interface ModelAlgebraIntersection<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <Types extends readonly OfType<F, any, any, Env>[]>(...types: Types): (
      config?: Named<
        ConfigsForType<
          Env,
          UnionToIntersection<
            {
              [k in keyof Types]: [Types[k]] extends [OfType<F, infer LA, infer A, Env>]
                ? unknown extends LA
                  ? never
                  : LA
                : never
            }[number]
          >,
          UnionToIntersection<
            {
              [k in keyof Types]: [Types[k]] extends [OfType<F, infer LA, infer A, Env>]
                ? unknown extends A
                  ? never
                  : A
                : never
            }[number]
          >,
          IntersectionConfig<
            {
              [k in keyof Types]: [Types[k]] extends [OfType<F, infer LA, infer A, Env>] ? LA : never
            },
            {
              [k in keyof Types]: [Types[k]] extends [OfType<F, infer LA, infer A, Env>] ? A : never
            }
          >
        >
      >
    ) => Kind<
      F,
      Env,
      UnionToIntersection<
        {
          [k in keyof Types]: [Types[k]] extends [OfType<F, infer LA, infer A, Env>]
            ? unknown extends LA
              ? never
              : LA
            : never
        }[number]
      >,
      UnionToIntersection<
        {
          [k in keyof Types]: [Types[k]] extends [OfType<F, infer LA, infer A, Env>]
            ? unknown extends A
              ? never
              : A
            : never
        }[number]
      >
    >
  }
}
```

Added in v0.0.1

# InterfaceLA (type alias)

Map some Props to their ConfigTypes for a particular URI

**Signature**

```ts
export type InterfaceLA<Props, URI extends ConfigTypeURIS> = {
  [k in keyof Props]: Props[k] extends HKT<infer R, infer E, infer A> ? ConfigTypeKind<URI, E, A> : never
}
```

Added in v0.0.1

# IntersectionLA (type alias)

Map an Array of E and A to an Array of ConfigType for a particular URI

**Signature**

```ts
export type IntersectionLA<L extends readonly unknown[], A extends readonly unknown[], URI extends ConfigTypeURIS> = {
  [k in keyof L]: k extends keyof A ? ConfigTypeKind<URI, L[k], A[k]> : never
}
```

Added in v0.0.1

# IntersectionURI (type alias)

**Signature**

```ts
export type IntersectionURI = typeof IntersectionURI
```

Added in v0.0.1

# IntersectionURI (constant)

**Signature**

```ts
export const IntersectionURI: "IntersectionURI" = ...
```

Added in v0.0.1
