---
title: algebras/object.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ModelAlgebraObject (interface)](#modelalgebraobject-interface)
- [ModelAlgebraObject1 (interface)](#modelalgebraobject1-interface)
- [ModelAlgebraObject2 (interface)](#modelalgebraobject2-interface)
- [PropsKind1 (type alias)](#propskind1-type-alias)
- [PropsKind2 (type alias)](#propskind2-type-alias)

---

# ModelAlgebraObject (interface)

**Signature**

```ts
export interface ModelAlgebraObject {
  interface: <Props extends AnyMProps>(
    props: Props
  ) => M<{ [k in keyof Props]: Props[k]['_L'] }, { [k in keyof Props]: Props[k]['_A'] }>
  partial: <Props extends AnyMProps>(
    props: Props
  ) => M<Partial<{ [k in keyof Props]: Props[k]['_L'] }>, Partial<{ [k in keyof Props]: Props[k]['_A'] }>>
}
```

# ModelAlgebraObject1 (interface)

**Signature**

```ts
export interface ModelAlgebraObject1<F extends URIS> {
  interface: <Props>(props: PropsKind1<F, Props>) => Kind<F, Props>
  partial: <Props>(props: PropsKind1<F, Props>) => Kind<F, Partial<Props>>
}
```

# ModelAlgebraObject2 (interface)

**Signature**

```ts
export interface ModelAlgebraObject2<F extends URIS2> {
  interface: <PropsE, PropsA>(props: PropsKind2<F, PropsE, PropsA>) => Kind2<F, PropsE, PropsA>
  partial: <PropsE, PropsA>(props: PropsKind2<F, PropsE, PropsA>) => Kind2<F, Partial<PropsE>, Partial<PropsA>>
}
```

# PropsKind1 (type alias)

**Signature**

```ts
export type PropsKind1<F extends URIS, PropsA> = { [k in keyof PropsA]: Kind<F, PropsA[k]> }
```

# PropsKind2 (type alias)

**Signature**

```ts
export type PropsKind2<F extends URIS2, PropsA, PropsE> = {
  [k in keyof PropsA & keyof PropsE]: Kind2<F, PropsA[k], PropsE[k]>
}
```
