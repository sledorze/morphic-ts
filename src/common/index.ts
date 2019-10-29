export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? (string extends T ? IfString : IfLiteral)
  : IfNotString

export type Remove<A, Tag extends string> = { [k in Exclude<keyof A, Tag>]: A[k] }
export type ElemType<A> = A extends Array<infer E> ? E : never

export type VariantType<A, Tag extends string, Key> = IfStringLiteral<
  Key,
  Extract<A, { [t in Tag]: Key }>,
  never,
  never
>

type TagsInKeys<T, K extends keyof T> = NonNullable<
  ({ [k in K]: undefined extends T[k] ? undefined : IfStringLiteral<T[k], k, never, never> })[K]
>
export type TagsOf<T> = TagsInKeys<T, keyof T> // this indirection is necessary

export type Ctor<S, V extends S, Tag extends string> = (x: Remove<V, Tag>) => S
export type CtorNarrowed<S, V extends S, Tag extends string> = (x: Remove<V, Tag>) => V
export type IsA<S, V extends S> = (x: S) => x is V
