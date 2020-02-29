---
title: object.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraObject (interface)](#modelalgebraobject-interface)
- [ModelAlgebraObject1 (interface)](#modelalgebraobject1-interface)
- [ModelAlgebraObject2 (interface)](#modelalgebraobject2-interface)
- [ObjectURI (type alias)](#objecturi-type-alias)
- [PropsKind1 (type alias)](#propskind1-type-alias)
- [PropsKind2 (type alias)](#propskind2-type-alias)
- [ObjectURI (constant)](#objecturi-constant)

---

# ModelAlgebraObject (interface)

**Signature**

```ts
export interface ModelAlgebraObject<F> {
  _F: F
  interface: {
    <Props extends AnyMProps<F>>(props: Props, name: string): isOptionalConfig<
      ObjectInterfaceConfig,
      HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
    >
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config: ByInterp<ObjectInterfaceConfig, URIS | URIS2>
    ): HKT2<F, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  }
  partial: {
    <Props extends AnyMProps<F>>(props: Props, name: string): isOptionalConfig<
      ObjectPartialConfig,
      HKT2<F, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
    >
    <Props extends AnyMProps<F>>(props: Props, name: string, config: ByInterp<ObjectPartialConfig, URIS | URIS2>): HKT2<
      F,
      Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
      Partial<{ [k in keyof Props]: Props[k]['_A'] }>
    >
  }
}
```

Added in v0.0.1

# ModelAlgebraObject1 (interface)

**Signature**

```ts
export interface ModelAlgebraObject1<F extends URIS> {
  _F: F
  interface: <Props>(
    props: PropsKind1<F, Props>,
    name: string,
    config?: ByInterp<ObjectInterfaceConfig, F>
  ) => Kind<F, Props>
  partial: <Props>(
    props: PropsKind1<F, Props>,
    name: string,
    config?: ByInterp<ObjectPartialConfig, F>
  ) => Kind<F, Partial<Props>>
}
```

Added in v0.0.1

# ModelAlgebraObject2 (interface)

**Signature**

```ts
export interface ModelAlgebraObject2<F extends URIS2> {
  _F: F
  interface: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig, F>
  ) => Kind2<F, PropsE, PropsA>
  partial: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectPartialConfig, F>
  ) => Kind2<F, Partial<PropsE>, Partial<PropsA>>
}
```

Added in v0.0.1

# ObjectURI (type alias)

**Signature**

```ts
export type ObjectURI = typeof ObjectURI
```

Added in v0.0.1

# PropsKind1 (type alias)

**Signature**

```ts
export type PropsKind1<F extends URIS, PropsA> = { [k in keyof PropsA]: Kind<F, PropsA[k]> }
```

Added in v0.0.1

# PropsKind2 (type alias)

**Signature**

```ts
export type PropsKind2<F extends URIS2, PropsA, PropsE> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, PropsA[k], PropsE[k]>
}
```

Added in v0.0.1

# ObjectURI (constant)

**Signature**

```ts
export const ObjectURI: "ObjectURI" = ...
```

Added in v0.0.1
