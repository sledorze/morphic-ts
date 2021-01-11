---
title: intersections.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraIntersection (interface)](#modelalgebraintersection-interface)
- [IntersectionURI (type alias)](#intersectionuri-type-alias)
- [IntersectionURI (constant)](#intersectionuri-constant)

---

# ModelAlgebraIntersection (interface)

**Signature**

```ts
export interface ModelAlgebraIntersection<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <Types extends readonly OfType<F, any, any, Env>[]>(types: Types, name: string): Kind<
      F,
      Env,
      UnionToIntersection<
        {
          [k in keyof Types]: Types[k] extends OfType<F, infer LA, infer A, Env>
            ? unknown extends LA
              ? never
              : LA
            : never
        }[number]
      >,
      UnionToIntersection<
        {
          [k in keyof Types]: Types[k] extends OfType<F, infer LA, infer A, Env>
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
