---
title: model/primitives.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [BigIntStringC (interface)](#bigintstringc-interface)
- [BigIntString (constant)](#bigintstring-constant)
- [ioTsPrimitiveInterpreter (constant)](#iotsprimitiveinterpreter-constant)

---

# BigIntStringC (interface)

**Signature**

```ts
export interface BigIntStringC extends t.Type<bigint, string, unknown> {}
```

Added in v0.0.1

# BigIntString (constant)

**Signature**

```ts
export const BigIntString: BigIntStringC = ...
```

Added in v0.0.1

# ioTsPrimitiveInterpreter (constant)

**Signature**

```ts
export const ioTsPrimitiveInterpreter: <Env extends Partial<Record<"IoTsURI", any>>>() => ModelAlgebraPrimitive2<"IoTsURI", Env> = ...
```

Added in v0.0.1
