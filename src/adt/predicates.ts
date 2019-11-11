import { ExtractUnion, ElemType, TagsOf } from '../common'
import { KeysDefinition } from '.'

export type IsA<A, Tag extends keyof A & string> = <Key extends A[Tag] & string>(
  k: Key
) => (a: A) => a is ExtractUnion<A, Tag, Key>

export type IsAny<A, Tag extends keyof A & string> = <Keys extends (A[Tag] & string)[]>(
  ...keys: Keys
) => (a: A) => a is ExtractUnion<A, Tag, ElemType<Keys>>

export type Verified<A> = (a: A) => a is A

export interface Predicates<A, Tag extends keyof A & string> {
  is: IsA<A, Tag>
  verified: Verified<A>
  isAnyOf: IsAny<A, Tag>
}

export const Predicates = <A, Tag extends TagsOf<A> & string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Predicates<A, Tag> => ({
  is: <Key extends A[Tag] & string>(key: Key) => (rest: A): rest is ExtractUnion<A, Tag, Key> => rest[tag] === key,
  verified: (a: A): a is A => {
    const key = (a[tag] as unknown) as string
    return key in keys
  },
  isAnyOf: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => (
    rest: A
  ): rest is ExtractUnion<A, Tag, ElemType<Keys>> => keys.indexOf(rest[tag] as A[Tag] & string) !== -1
})
