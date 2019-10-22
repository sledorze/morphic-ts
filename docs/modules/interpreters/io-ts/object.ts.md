---
title: interpreters/io-ts/object.ts
nav_order: 49
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IOTypes (type alias)](#iotypes-type-alias)
- [ioTsNonStrictObjectInterpreter (constant)](#iotsnonstrictobjectinterpreter-constant)

---

# IOTypes (type alias)

**Signature**

```ts
export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }
```

# ioTsNonStrictObjectInterpreter (constant)

**Signature**

```ts
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject1<URI> = ...
```
