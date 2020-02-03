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

export type SelectKeyOfMatchingValues<KeyedValues, Constraint> = {
  [k in keyof KeyedValues]: KeyedValues[k] extends Constraint ? k : never
}[keyof KeyedValues]

export const assignCallable = <C, F extends Function & C, D>(F: F, d: D): F & C & D =>
  assignFunction(F, Object.assign({}, F, d))

export const wrapFun = <A, B, X>(g: ((a: A) => B) & X): typeof g => ((x: any) => g(x)) as any

export interface InhabitedTypes<E, A> {
  // tslint:disable-next-line: no-unused-expression
  _E: E
  // tslint:disable-next-line: no-unused-expression
  _A: A
}
export type AType<X extends InhabitedTypes<any, any>> = X['_A']
export type EType<X extends InhabitedTypes<any, any>> = X['_E']

/**
 * Fake inhabitation of types
 */
export const inhabitTypes = <E, A, T>(t: T): T & InhabitedTypes<E, A> => t as any
