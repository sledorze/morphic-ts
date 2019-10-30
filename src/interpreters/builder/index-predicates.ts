import { VariantType } from '../../common'

export type IsA<A, V extends A> = (a: A) => a is V

export interface Predicates<A, V extends A> {
  isA: IsA<A, V>
}

export const makePredicates = <A = never>() => <Tag extends keyof A & string, Key extends A[Tag]>(
  tag: Tag,
  key: Key
): Predicates<A, VariantType<A, Tag, Key>> => {
  type V = VariantType<A, Tag, Key>
  const isA: IsA<A, V> = (rest: A): rest is V => rest[tag] === key
  return { isA }
}
