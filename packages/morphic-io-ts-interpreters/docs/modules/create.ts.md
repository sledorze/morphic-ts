---
title: create.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Create (interface)](#create-interface)
- [Validatedbrand (interface)](#validatedbrand-interface)
- [Validated (type alias)](#validated-type-alias)

---

# Create (interface)

**Signature**

```ts
export interface Create<A> {
  (a: A): Either<Errors, Validated<A>>
}
```

Added in v0.0.1

# Validatedbrand (interface)

**Signature**

```ts
export interface Validatedbrand {
  readonly validated: unique symbol
}
```

Added in v0.0.1

# Validated (type alias)

**Signature**

```ts
export type Validated<A> = Branded<A, Validatedbrand>
```

Added in v0.0.1
