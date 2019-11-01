import { ExtractUnion, ElemType } from '../../common'

export type IsA<A, Tag extends keyof A & string> = <Key extends A[Tag] & string>(
  k: Key
) => (a: A) => a is ExtractUnion<A, Tag, Key>

export type IsAny<A, Tag extends keyof A & string> = <Keys extends (A[Tag] & string)[]>(
  ...keys: Keys
) => (a: A) => a is ExtractUnion<A, Tag, ElemType<Keys>>

export interface Predicates<A, Tag extends keyof A & string> {
  isA: IsA<A, Tag>
  isAnyOf: IsAny<A, Tag>
}

export const Predicates = <A, Tag extends keyof A & string>(tag: Tag): Predicates<A, Tag> => ({
  isA: <Key extends A[Tag] & string>(key: Key) => (rest: A): rest is ExtractUnion<A, Tag, Key> => rest[tag] === key,
  isAnyOf: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => (
    rest: A
  ): rest is ExtractUnion<A, Tag, ElemType<Keys>> => keys.indexOf(rest[tag] as A[Tag] & string) !== -1
})
