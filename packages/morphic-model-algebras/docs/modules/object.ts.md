---
title: object.ts
nav_order: 4
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
export interface ModelAlgebraObject<F, Env> {
  _F: F
  interface: {
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config?: ConfigsForType<Env, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
    ): HKT2<F, Env, { [k in keyof Props]: Props[k]['_E'] }, { [k in keyof Props]: Props[k]['_A'] }>
  }
  partial: {
    <Props extends AnyMProps<F>>(
      props: Props,
      name: string,
      config?: ConfigsForType<
        Env,
        Partial<{ [k in keyof Props]: Props[k]['_E'] }>,
        Partial<{ [k in keyof Props]: Props[k]['_A'] }>
      >
    ): HKT2<F, Env, Partial<{ [k in keyof Props]: Props[k]['_E'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
  }
  both: {
    <Props extends AnyMProps<F>, PProps extends AnyMProps<F>>(
      props: Props,
      partial: PProps,
      name: string,
      config?: ConfigsForType<
        Env,
        { [k in keyof Props]: Props[k]['_E'] } & Partial<{ [k in keyof PProps]: PProps[k]['_E'] }>,
        { [k in keyof Props]: Props[k]['_A'] } & Partial<{ [k in keyof PProps]: PProps[k]['_A'] }>
      >
    ): HKT2<
      F,
      Env,
      { [k in keyof Props]: Props[k]['_E'] } & Partial<{ [k in keyof PProps]: PProps[k]['_E'] }>,
      { [k in keyof Props]: Props[k]['_A'] } & Partial<{ [k in keyof PProps]: PProps[k]['_A'] }>
    >
  }
}
```

Added in v0.0.1

# ModelAlgebraObject1 (interface)

**Signature**

```ts
export interface ModelAlgebraObject1<F extends URIS, Env extends AnyEnv> {
  _F: F
  interface: <Props>(
    props: PropsKind1<F, Props, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, Props>
  ) => Kind<F, Env, Props>
  partial: <Props>(
    props: PropsKind1<F, Props, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, Partial<Props>>
  ) => Kind<F, Env, Partial<Props>>
  both: <Props, PProps>(
    props: PropsKind1<F, Props, Env>,
    partial: PropsKind1<F, PProps, Env>,
    name: string,
    config?: ConfigsForType<Env, unknown, Props & Partial<PProps>>
  ) => Kind<F, Env, Props & Partial<PProps>>
}
```

Added in v0.0.1

# ModelAlgebraObject2 (interface)

**Signature**

```ts
export interface ModelAlgebraObject2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  interface: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA, Env>,
    name: string,
    config?: ConfigsForType<Env, PropsE, PropsA>
  ) => Kind2<F, Env, PropsE, PropsA>
  partial: <PropsE, PropsA>(
    props: PropsKind2<F, PropsE, PropsA, Env>,
    name: string,
    config?: ConfigsForType<Env, Partial<PropsE>, Partial<PropsA>>
  ) => Kind2<F, Env, Partial<PropsE>, Partial<PropsA>>
  both: <PropsE, PPropsE, PropsA, PPropsA>(
    props: PropsKind2<F, PropsE, PropsA, Env>,
    partial: PropsKind2<F, PPropsE, PPropsA, Env>,
    name: string,
    config?: ConfigsForType<Env, PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>
  ) => Kind2<F, Env, PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>
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
export type PropsKind1<F extends URIS, PropsA, R> = { [k in keyof PropsA]: Kind<F, R, PropsA[k]> }
```

Added in v0.0.1

# PropsKind2 (type alias)

**Signature**

```ts
export type PropsKind2<F extends URIS2, PropsA, PropsE, R> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, R, PropsA[k], PropsE[k]>
}
```

Added in v0.0.1

# ObjectURI (constant)

**Signature**

```ts
export const ObjectURI: "ObjectURI" = ...
```

Added in v0.0.1
