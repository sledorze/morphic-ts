---
title: interpreters/io-ts-string/interpreters.ts
nav_order: 38
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IOTypes (type alias)](#iotypes-type-alias)
- [defineIoTsStringInterpreter (constant)](#defineiotsstringinterpreter-constant)
- [ioTsStringNonStrict (constant)](#iotsstringnonstrict-constant)

---

# IOTypes (type alias)

**Signature**

```ts
export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }
```

# defineIoTsStringInterpreter (constant)

**Signature**

```ts
export const defineIoTsStringInterpreter = ...
```

# ioTsStringNonStrict (constant)

**Signature**

```ts
export const ioTsStringNonStrict = ...
```
