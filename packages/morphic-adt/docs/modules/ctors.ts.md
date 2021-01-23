---
title: ctors.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Ctors (interface)](#ctors-interface)
- [As (type alias)](#as-type-alias)
- [CtorType (type alias)](#ctortype-type-alias)
- [Of (type alias)](#of-type-alias)
- [Ctors (function)](#ctors-function)

---

# Ctors (interface)

**Signature**

```ts
export interface Ctors<A, Tag extends keyof A & string> {
  tag: Tag
  of: Of<A, Tag>
  as: As<A, Tag>
  make: (a: A) => A
}
```

Added in v0.0.1

# As (type alias)

**Signature**

```ts
export type As<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: Omit<ExtractUnion<A, Tag, key>, Tag>) => ExtractUnion<A, Tag, key>
}
```

Added in v0.0.1

# CtorType (type alias)

**Signature**

```ts
export type CtorType<C extends Ctors<any, any>> = C extends Ctors<infer A, any> ? A : never
```

Added in v0.0.1

# Of (type alias)

**Signature**

```ts
export type Of<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: Omit<ExtractUnion<A, Tag, key>, Tag>) => A
}
```

Added in v0.0.1

# Ctors (function)

**Signature**

```ts
export const Ctors = <A extends Tagged<Tag>, Tag extends string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Ctors<A, Tag> => ...
```

Added in v0.0.1
