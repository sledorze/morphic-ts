---
title: object.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [BothConfig (interface)](#bothconfig-interface)
- [InterfaceConfig (interface)](#interfaceconfig-interface)
- [ModelAlgebraObject (interface)](#modelalgebraobject-interface)
- [PartialConfig (interface)](#partialconfig-interface)
- [AnyProps (type alias)](#anyprops-type-alias)
- [ObjectURI (type alias)](#objecturi-type-alias)
- [PropsA (type alias)](#propsa-type-alias)
- [PropsE (type alias)](#propse-type-alias)
- [PropsKind (type alias)](#propskind-type-alias)
- [ObjectURI (constant)](#objecturi-constant)

---

# BothConfig (interface)

**Signature**

```ts
export interface BothConfig<Props, PropsPartial> {}
```

Added in v0.0.1

# InterfaceConfig (interface)

**Signature**

```ts
export interface InterfaceConfig<Props> {}
```

Added in v0.0.1

# ModelAlgebraObject (interface)

**Signature**

```ts
export interface ModelAlgebraObject<F extends URIS, Env extends AnyEnv> {
  _F: F
  interface: <Props extends AnyProps<Props, Env>>(
    props: Props,
    name: string,
    config?: ConfigsForType<
      Env,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_E']
        }
      >,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_A']
        }
      >,
      InterfaceConfig<
        PropsKind<
          F,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_E']
            }
          >,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_A']
            }
          >,
          Env
        >
      >
    >
  ) => Kind<
    F,
    Env,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_E']
      }
    >,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_A']
      }
    >
  >
  partial: <Props extends AnyProps<Props, Env>>(
    props: Props,
    name: string,
    config?: ConfigsForType<
      Env,
      Partial<
        Readonly<
          {
            [k in keyof Props]: Props[k]['_E']
          }
        >
      >,
      Partial<
        Readonly<
          {
            [k in keyof Props]: Props[k]['_A']
          }
        >
      >,
      PartialConfig<
        PropsKind<
          F,
          Partial<
            Readonly<
              {
                [k in keyof Props]: Props[k]['_E']
              }
            >
          >,
          Partial<
            Readonly<
              {
                [k in keyof Props]: Props[k]['_A']
              }
            >
          >,
          Env
        >
      >
    >
  ) => Kind<
    F,
    Env,
    Partial<
      {
        [k in keyof Props]: Props[k]['_E']
      }
    >,
    Partial<
      {
        [k in keyof Props]: Props[k]['_A']
      }
    >
  >
  both: <Props extends AnyProps<Props, Env>, PartialProps extends AnyProps<PartialProps, Env>>(
    props: Props,
    partial: PartialProps,
    name: string,
    config?: ConfigsForType<
      Env,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_E']
        } &
          Partial<
            {
              [k in keyof PartialProps]: PartialProps[k]['_E']
            }
          >
      >,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_A']
        } &
          Partial<
            {
              [k in keyof PartialProps]: PartialProps[k]['_A']
            }
          >
      >,
      BothConfig<
        PropsKind<
          F,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_E']
            }
          >,
          Readonly<
            {
              [k in keyof Props]: Props[k]['_A']
            }
          >,
          Env
        >,
        PropsKind<
          F,
          Partial<
            Readonly<
              {
                [k in keyof PartialProps]: PartialProps[k]['_E']
              }
            >
          >,
          Partial<
            Readonly<
              {
                [k in keyof PartialProps]: PartialProps[k]['_A']
              }
            >
          >,
          Env
        >
      >
    >
  ) => Kind<
    F,
    Env,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_E']
      } &
        Partial<
          {
            [k in keyof PartialProps]: PartialProps[k]['_E']
          }
        >
    >,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_A']
      } &
        Partial<
          {
            [k in keyof PartialProps]: PartialProps[k]['_A']
          }
        >
    >
  >
}
```

Added in v0.0.1

# PartialConfig (interface)

**Signature**

```ts
export interface PartialConfig<Props> {}
```

Added in v0.0.1

# AnyProps (type alias)

**Signature**

```ts
export type AnyProps<Props, Env extends AnyEnv> = { [k in keyof Props]: HKT<Env, any, any> }
```

Added in v0.0.1

# ObjectURI (type alias)

**Signature**

```ts
export type ObjectURI = typeof ObjectURI
```

Added in v0.0.1

# PropsA (type alias)

**Signature**

```ts
export type PropsA<
  Props extends {
    [k in keyof Props]: HKT<any, any, any>
  }
> = {
  [k in keyof Props]: Props[k]['_A']
}
```

Added in v0.0.1

# PropsE (type alias)

**Signature**

```ts
export type PropsE<
  Props extends {
    [k in keyof Props]: HKT<any, any, any>
  }
> = {
  [k in keyof Props]: Props[k]['_E']
}
```

Added in v0.0.1

# PropsKind (type alias)

**Signature**

```ts
export type PropsKind<F extends URIS, PropsE, PropsA, R> = Readonly<
  {
    [k in keyof PropsA & keyof PropsE]: Kind<F, R, PropsE[k], PropsA[k]>
  }
>
```

Added in v0.0.1

# ObjectURI (constant)

**Signature**

```ts
export const ObjectURI: "ObjectURI" = ...
```

Added in v0.0.1
