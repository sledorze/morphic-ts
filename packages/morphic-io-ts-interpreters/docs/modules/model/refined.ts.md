---
title: model/refined.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Customize (interface)](#customize-interface)
- [ioTsRefinedInterpreter (constant)](#iotsrefinedinterpreter-constant)
- [applyCustomize (function)](#applycustomize-function)

---

# Customize (interface)

**Signature**

```ts
export interface Customize<RC, E, A> {
  <B>(a: t.BrandC<t.Type<A, E, unknown>, B>, env: RC): t.BrandC<t.Type<A, E, unknown>, B> // t.Type<A, E, unknown>
}
```

Added in v0.0.1

# ioTsRefinedInterpreter (constant)

**Signature**

```ts
export const ioTsRefinedInterpreter: <Env extends Partial<Record<"IoTsURI", any>>>() => ModelAlgebraRefined2<"IoTsURI", Env> = ...
```

Added in v0.0.1

# applyCustomize (function)

**Signature**

```ts
export const applyCustomize = <RC, E, A>(c: { [IoTsURI]?: Customize<RC, E, A> } | undefined) => ...
```

Added in v0.0.1
