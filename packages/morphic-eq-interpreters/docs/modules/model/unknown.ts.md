---
title: model/unknown.ts
nav_order: 15
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [CustomizeUnknown (interface)](#customizeunknown-interface)
- [eqUnknownInterpreter (constant)](#equnknowninterpreter-constant)

---

# CustomizeUnknown (interface)

**Signature**

```ts
export interface CustomizeUnknown<RC> {
  compare: 'default-circular' | 'default-non-circular' | ((env: RC) => Eq<unknown>)
}
```

Added in v0.0.1

# eqUnknownInterpreter (constant)

**Signature**

```ts
export const eqUnknownInterpreter: <Env extends Partial<Readonly<Record<"EqURI", any>>>>() => ModelAlgebraUnknown<"EqURI", Env> = ...
```

Added in v0.0.1
