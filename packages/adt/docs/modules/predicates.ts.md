---
title: predicates.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Predicates (interface)](#predicates-interface)
- [Is (type alias)](#is-type-alias)
- [IsAny (type alias)](#isany-type-alias)
- [Verified (type alias)](#verified-type-alias)
- [Predicates (function)](#predicates-function)

---

# Predicates (interface)

**Signature**

```ts
export interface Predicates<A, Tag extends keyof A & string> {
  is: Is<A, Tag>
  verified: Verified<A>
  isAnyOf: IsAny<A, Tag>
}
```

Added in v0.0.1

# Is (type alias)

**Signature**

```ts
export type Is<A, Tag extends keyof A & string> = { [key in A[Tag] & string]: (a: A) => a is ExtractUnion<A, Tag, key> }
```

Added in v0.0.1

# IsAny (type alias)

**Signature**

```ts
export type IsAny<A, Tag extends keyof A & string> = <Keys extends (A[Tag] & string)[]>(
  ...keys: Keys
) => (a: A) => a is ExtractUnion<A, Tag, ElemType<Keys>>
```

Added in v0.0.1

# Verified (type alias)

**Signature**

```ts
export type Verified<A> = (a: A) => a is A
```

Added in v0.0.1

# Predicates (function)

**Signature**

```ts
export const Predicates = <A, Tag extends TagsOf<A> & string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Predicates<A, Tag> => ({
  is: record.mapWithIndex((key, _) => (rest: A) => (rest[tag] as any) === key)(keys) as any, // FIXME: typecheck that
  verified: (a: A): a is A => ...
```

Added in v0.0.1
