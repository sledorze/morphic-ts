import { Remove, ExtractUnion } from '../../common'
import { identity } from 'fp-ts/lib/function'

export type Ctor<A, N extends A, Tag extends string> = (x: Remove<N, Tag>) => A

export interface Ctors<A, Tag extends keyof A & string> {
  of: <Key extends A[Tag] & string>(key: Key, x: Remove<ExtractUnion<A, Tag, Key>, Tag>) => A
  as: <Key extends A[Tag] & string>(key: Key, x: Remove<ExtractUnion<A, Tag, Key>, Tag>) => ExtractUnion<A, Tag, Key>
  make: (a: A) => A
}

export const Ctors = <A, Tag extends keyof A & string>(tag: Tag): Ctors<A, Tag> => {
  const ctor: any = (key: string) => (rest: object) => ({
    [tag]: key,
    ...rest
  })
  return {
    of: ctor,
    as: ctor,
    make: identity
  }
}
