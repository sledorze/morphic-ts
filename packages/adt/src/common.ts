/**
 * @since 0.0.1
 */
export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? string extends T
    ? IfString
    : IfLiteral
  : IfNotString

/**
 * @since 0.0.1
 */
export type Remove<A, Tag> = { [k in Exclude<keyof A, Tag>]: A[k] }

/**
 * @since 0.0.1
 */
export type ElemType<A> = A extends Array<infer E> ? E : never

/**
 * @since 0.0.1
 * Keeps the common key in a union that are discriminants (Holds values which *are* literals)
 */
type TagsInKeys<T, K extends keyof T> = NonNullable<
  {
    [k in K]: undefined extends T[k] ? undefined : IfStringLiteral<T[k], k, never, never>
  }[K]
>

/**
 * @since 0.0.1
 */
export type TagsOf<T> = TagsInKeys<T, keyof T> // this indirection is necessary

/**
 * @since 0.0.1
 */
export type ExtractUnion<A, Tag extends keyof A & string, Tags extends string> = Extract<A, Record<Tag, Tags>>

/**
 * @since 0.0.1
 */
export type ExcludeUnion<A, Tag extends keyof A & string, Tags extends string> = Exclude<A, Record<Tag, Tags>>

/**
 * @since 0.0.1
 */
export const assignFunction = <F extends Function, C>(ab: F, c: C): F & C => Object.assign(ab, c)
