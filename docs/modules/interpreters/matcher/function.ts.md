---
title: interpreters/matcher/function.ts
nav_order: 64
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Compact (type alias)](#compact-type-alias)
- [FStruct (type alias)](#fstruct-type-alias)
- [Match (type alias)](#match-type-alias)
- [folder (function)](#folder-function)
- [folderWiden (function)](#folderwiden-function)

---

# Compact (type alias)

**Signature**

```ts
export type Compact<A> = { [k in keyof A]: A[k] }
```

# FStruct (type alias)

**Signature**

```ts
export type FStruct<R extends Record<any, any>, K extends keyof R = keyof R> = {
  [k in K]: { [kv in R[k]]: R extends { [r in k]: kv } ? Compact<R> : never }
}
```

# Match (type alias)

**Signature**

```ts
export type Match<StructK, R> = { [KV in keyof StructK]: (v: StructK[KV]) => R }
```

# folder (function)

Usage

type A = { type: 'left'; leftValue: string } | { type: 'right'; rightValue: string }

folder<A>()('type')<string>({
left: ({ leftValue }) => leftValue,
right: ({ rightValue }) => rightValue
})

**Signature**

```ts
export const folder = <A extends object>() => <D extends keyof A>(discr: D) => <R>(match: Match<FStruct<A>[D], R>) => (
  a: A
): R => ...
```

# folderWiden (function)

**Signature**

```ts
export const folderWiden = <A extends object>() => <D extends keyof A>(discr: D) => <
  M extends Match<FStruct<A>[D], any>
>(
  match: M
) => (a: A): M[keyof M] extends (a: any) => infer R ? R : never => ...
```
