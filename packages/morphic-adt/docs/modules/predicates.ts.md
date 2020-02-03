---
title: predicates.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IsAny (interface)](#isany-interface)
- [Predicates (interface)](#predicates-interface)
- [Verified (interface)](#verified-interface)
- [Is (type alias)](#is-type-alias)
- [Predicates (function)](#predicates-function)

---

# IsAny (interface)

**Signature**

```ts
export interface IsAny<A, Tag extends keyof A> {
  <Keys extends A[Tag][]>(keys: Keys): (a: A) => a is ExtractUnion<A, Tag, ElemType<Keys>>
}
```

Added in v0.0.1

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

# Verified (interface)

**Signature**

```ts
export interface Verified<A> {
  (a: A): a is A
}
```

Added in v0.0.1

# Is (type alias)

**Signature**

```ts
export type Is<A, Tag extends keyof A> = {
  [key in A[Tag] & string]: (a: A) => a is ExtractUnion<A, Tag, key>
}
```

Added in v0.0.1

# Predicates (function)

**Signature**

```ts
export const Predicates = <A, Tag extends keyof A & string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Predicates<A, Tag> => ({
  is: record.mapWithIndex((key, _) => (rest: A) => (rest[tag] as any) === key)(keys) as any, // FIXME: typecheck that
  verified: (a: A): a is A => ((a[tag] as unknown) as string) in keys,
  isAnyOf: <Keys extends A[Tag][]>(keys: Keys) => (rest: A): rest is ExtractUnion<A, Tag, ElemType<Keys>> => ...
```

Added in v0.0.1
