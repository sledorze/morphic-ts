---
title: matcher.ts
nav_order: 3
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
export interface Matchers<A, Tag extends keyof A> {
  fold: Folder<A>
  transform: Transform<A, Tag>
  matchWiden: MatcherWiden<A, Tag>
  match: Matcher<A, Tag>
  createReducer: <S>(initialState: S) => ReducerBuilder<S, A, Tag>
  strict: <R>(f: (_: A) => R) => (_: A) => R
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
export const Matchers = <A, Tag extends keyof A>(tag: Tag) => (keys: KeysDefinition<A, Tag>): Matchers<A, Tag> => ...
```

Added in v0.0.1
