export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? (string extends T ? IfString : IfLiteral)
  : IfNotString

export type Remove<A, Tag> = { [k in Exclude<keyof A, Tag>]: A[k] }
export type ElemType<A> = A extends Array<infer E> ? E : never

type TagsInKeys<T, K extends keyof T> = NonNullable<
  ({ [k in K]: undefined extends T[k] ? undefined : IfStringLiteral<T[k], k, never, never> })[K]
>
export type TagsOf<T> = TagsInKeys<T, keyof T> // this indirection is necessary

export type VariantType<A, Tag extends string, Key> = IfStringLiteral<Key, Extract<A, Record<Tag, Key>>, never, never> // Extract<A, Record<Tag, Key>>

export type ExtractUnion<A, Tag extends keyof A & string, Tags extends string> =
  // IfStringLiteral<
  // Tags,
  Extract<A, Record<Tag, Tags>>
//   never,
//   never
// >
