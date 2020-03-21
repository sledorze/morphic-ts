---
title: model/common.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Customize (interface)](#customize-interface)
- [applyCustomize (function)](#applycustomize-function)

---

# Customize (interface)

**Signature**

```ts
export interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}
```

Added in v0.0.1

# applyCustomize (function)

**Signature**

```ts
export const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) => ...
```

Added in v0.0.1
