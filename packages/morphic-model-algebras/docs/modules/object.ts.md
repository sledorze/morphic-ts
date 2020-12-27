---
title: object.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraObject (interface)](#modelalgebraobject-interface)
- [AnyProps (type alias)](#anyprops-type-alias)
- [ObjectURI (type alias)](#objecturi-type-alias)
- [PropsA (type alias)](#propsa-type-alias)
- [PropsE (type alias)](#propse-type-alias)
- [PropsKind (type alias)](#propskind-type-alias)
- [ObjectURI (constant)](#objecturi-constant)

---

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
    props: PropsKind<
      F,
      {
        [k in keyof Props]: Props[k]['_E']
      },
      {
        [k in keyof Props]: Props[k]['_A']
      },
      Env
    >,
    partial: PropsKind<F, PropsE<PartialProps>, PropsA<PartialProps>, Env>,
    name: string,
    config?: ConfigsForType<
      Env,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_E']
        } &
          Partial<PropsE<PartialProps>>
      >,
      Readonly<
        {
          [k in keyof Props]: Props[k]['_A']
        } &
          Partial<PropsA<PartialProps>>
      >
    >
  ) => Kind<
    F,
    Env,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_E']
      } &
        Partial<PropsE<PartialProps>>
    >,
    Readonly<
      {
        [k in keyof Props]: Props[k]['_A']
      } &
        Partial<PropsA<PartialProps>>
    >
  >
}
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

/\*\*

**Signature**

```ts
export type PropsKind<F extends URIS, PropsA, PropsE, R> = Readonly<
  {
    [k in keyof PropsA & keyof PropsE]: Kind<F, R, PropsA[k], PropsE[k]>
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
