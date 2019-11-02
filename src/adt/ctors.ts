import { Remove, ExtractUnion } from '../../common'
import { identity } from 'fp-ts/lib/function'

export type Ctor<A, N extends A, Tag extends string> = (x: Remove<N, Tag>) => A

export interface Ctors<A, Tag extends keyof A & string> {
  of: <Key extends A[Tag] & string>(key: Key, props: Remove<ExtractUnion<A, Tag, Key>, Tag>) => A
  as: <Key extends A[Tag] & string>(
    key: Key,
    props: Remove<ExtractUnion<A, Tag, Key>, Tag>
  ) => ExtractUnion<A, Tag, Key>
  make: (a: A) => A
}

export const Ctors = <A, Tag extends keyof A & string>(tag: Tag): Ctors<A, Tag> => {
  const ctor = (key: any, props: any) => ({
    [tag]: key,
    ...props
  })
  return {
    of: ctor as Ctors<A, Tag>['of'],
    as: ctor as Ctors<A, Tag>['as'],
    make: identity
  }
}
