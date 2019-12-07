import { ExtractUnion, ElemType, TagsOf } from './common'
import { KeysDefinition } from '.'
import { record } from 'fp-ts'

export type Is<A, Tag extends keyof A & string> = {
  [key in A[Tag] & string]: (a: A) => a is ExtractUnion<A, Tag, key>
}

export type IsAny<A, Tag extends keyof A & string> = <Keys extends (A[Tag] & string)[]>(
  ...keys: Keys
) => (a: A) => a is ExtractUnion<A, Tag, ElemType<Keys>>

export type Verified<A> = (a: A) => a is A

export interface Predicates<A, Tag extends keyof A & string> {
  is: Is<A, Tag>
  verified: Verified<A>
  isAnyOf: IsAny<A, Tag>
}

export const Predicates = <A, Tag extends TagsOf<A> & string>(tag: Tag) => (
  keys: KeysDefinition<A, Tag>
): Predicates<A, Tag> => ({
  is: record.mapWithIndex((key, _) => (rest: A) => (rest[tag] as any) === key)(keys) as any, // FIXME: typecheck that
  verified: (a: A): a is A => {
    const key = (a[tag] as unknown) as string
    return key in keys
  },
  isAnyOf: <Keys extends (A[Tag] & string)[]>(...keys: Keys) => (
    rest: A
  ): rest is ExtractUnion<A, Tag, ElemType<Keys>> => keys.indexOf(rest[tag] as A[Tag] & string) !== -1
})
