---
title: matcher.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Matchers (interface)](#matchers-interface)
- [Reducer (interface)](#reducer-interface)
- [Matchers (function)](#matchers-function)

---

# Matchers (interface)

**Signature**

```ts
export interface Matchers<A, Tag extends keyof A & string> {
  fold: Folder<A>
  match: Matcher<A, Tag>
  transform: Transform<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
  createReducer: <S>(initialState: S) => ReducerBuilder<S, A, Tag>
}
```

Added in v0.0.1

# Reducer (interface)

**Signature**

```ts
export interface Reducer<S, A> {
  (state: S | undefined, action: A): S
}
```

Added in v0.0.1

# Matchers (function)

**Signature**

```ts
export const Matchers = <A, Tag extends TagsOf<A> & string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Matchers<A, Tag> => ...
```

Added in v0.0.1
