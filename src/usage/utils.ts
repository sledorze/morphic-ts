export type IfStringLiteral<T, IfLiteral, IfString, IfNotString> = T extends string
  ? string extends T
    ? IfString
    : IfLiteral
  : IfNotString

/**
 * Keeps the common key in a union that are discriminants (Holds values which *are* literals)
 */
type TagsInKeys<T, K extends keyof T> = NonNullable<
  { [k in K]: undefined extends T[k] ? undefined : IfStringLiteral<T[k], k, never, never> }[K]
>
export type TagsOf<T> = TagsInKeys<T, keyof T> & string // this indirection is necessary

export const assignFunction = <F extends Function, C>(ab: F, c: C): F & C => {
  const newF: typeof ab = ((...x: any[]) => ab(...x)) as any
  return Object.assign(newF, c)
}
