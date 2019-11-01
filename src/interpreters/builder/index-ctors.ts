import { Remove, ExtractUnion } from '../../common'

export type Ctor<A, N extends A, Tag extends string> = (x: Remove<N, Tag>) => A
export type CtorNarrowed<N, Tag extends string> = (x: Remove<N, Tag>) => N

export interface Ctors<A, Tag extends keyof A & string> {
  of: <Key extends A[Tag] & string>(key: Key) => Ctor<A, ExtractUnion<A, Tag, Key>, Tag>
  as: <Key extends A[Tag] & string>(key: Key) => CtorNarrowed<ExtractUnion<A, Tag, Key>, Tag>
}

export const Ctors = <A, Tag extends keyof A & string>(tag: Tag): Ctors<A, Tag> => {
  const ctor: any = (key: string) => (rest: object) => ({
    [tag]: key,
    ...rest
  })
  return {
    of: ctor,
    as: ctor
  }
}
