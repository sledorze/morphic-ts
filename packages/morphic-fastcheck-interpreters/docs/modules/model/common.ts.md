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
export interface Customize<A> {
  (a: Arbitrary<A>): Arbitrary<A>
}
```

Added in v0.0.1

# applyCustomize (function)

**Signature**

```ts
export const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) => ...
```

Added in v0.0.1
