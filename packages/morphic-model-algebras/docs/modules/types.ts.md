---
title: types.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Array (type alias)](#array-type-alias)
- [Mutable (type alias)](#mutable-type-alias)

---

# Array (type alias)

**Signature**

```ts
export type Array<T> = ReadonlyArray<T>
```

Added in v0.0.1

# Mutable (type alias)

**Signature**

```ts
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

Added in v0.0.1
