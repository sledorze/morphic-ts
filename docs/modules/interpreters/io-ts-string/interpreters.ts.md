---
title: interpreters/io-ts-string/interpreters.ts
nav_order: 38
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IOTypes (type alias)](#iotypes-type-alias)
- [defineIoTs2Interpreter (constant)](#defineiotsstringinterpreter-constant)
- [ioTs2NonStrict (constant)](#iotsstringnonstrict-constant)

---

# IOTypes (type alias)

**Signature**

```ts
export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }
```

# defineIoTs2Interpreter (constant)

**Signature**

```ts
export const defineIoTs2Interpreter = ...
```

# ioTs2NonStrict (constant)

**Signature**

```ts
export const ioTs2NonStrict = ...
```
