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
  /** Folds to a value */
  fold: Folder<A>
  /** Transforms partial values to the same type */
  transform: Transform<A, Tag>
  /** Matcher which is widens its Return type (infers a Union of all branches), supports a default as last parameter */
  match: MatcherWiden<A, Tag>
  /**
   * Matcher which is strict in its Return type (should be the same for all branches)
   */
  matchStrict: MatcherStrict<A, Tag>
  /**
   * Matcher which composes lenses across different cases (all cases must be specified)
   */
  matchLens: LensMatcher<A, Tag>
  /**
   * Matcher which composes optionals across different cases (undesired cases can be omitted)
   */
  matchOptional: OptionalMatcher<A, Tag>
  /** Creates a reducer enabling State evolution */
  createReducer: <S>(initialState: S) => ReducerBuilder<S, A, Tag>
  /** Enforces the inner function to return a specificiable type */
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
