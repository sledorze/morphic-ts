import { ExtractUnion } from '../../common'

export type IsA<A, Tag extends keyof A & string> = <Key extends A[Tag] & string>(
  k: Key
) => (a: A) => a is ExtractUnion<A, Tag, Key>

export interface Predicates<A, Tag extends keyof A & string> {
  isA: IsA<A, Tag>
}

export const Predicates = <A, Tag extends keyof A & string>(tag: Tag): Predicates<A, Tag> => ({
  isA: <Key extends A[Tag] & string>(key: Key) => (rest: A): rest is ExtractUnion<A, Tag, Key> => rest[tag] === key
})
