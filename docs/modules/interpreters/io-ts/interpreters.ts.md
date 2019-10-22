---
title: interpreters/io-ts/interpreters.ts
nav_order: 47
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IOTypes (type alias)](#iotypes-type-alias)
- [defineIoTsInterpreter (constant)](#defineiotsinterpreter-constant)
- [ioTsNonStrict (constant)](#iotsnonstrict-constant)
- [ioTsNonStrictObjectInterpreter (constant)](#iotsnonstrictobjectinterpreter-constant)
- [ioTsStrict (constant)](#iotsstrict-constant)
- [ioTsStrictObjectInterpreter (constant)](#iotsstrictobjectinterpreter-constant)

---

# IOTypes (type alias)

**Signature**

```ts
export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }
```

# defineIoTsInterpreter (constant)

**Signature**

```ts
export const defineIoTsInterpreter = ...
```

# ioTsNonStrict (constant)

**Signature**

```ts
export const ioTsNonStrict = ...
```

# ioTsNonStrictObjectInterpreter (constant)

**Signature**

```ts
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject1<URI> = ...
```

# ioTsStrict (constant)

**Signature**

```ts
export const ioTsStrict = ...
```

# ioTsStrictObjectInterpreter (constant)

**Signature**

```ts
export const ioTsStrictObjectInterpreter: ModelAlgebraObject1<URI> = ...
```
