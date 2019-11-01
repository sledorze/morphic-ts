import { Remove, ExtractUnion } from '../../common'

export type Ctor<A, N extends A, Tag extends string> = (x: Remove<N, Tag>) => A
export type CtorNarrowed<N, Tag extends string> = (x: Remove<N, Tag>) => N

export interface CtorsIntern<A, V extends A, Tag extends string> {
  of: Ctor<A, V, Tag>
  narrowed: CtorNarrowed<V, Tag>
}

export interface Ctors<A, Tags extends A[Tag] & string, Tag extends keyof A & string>
  extends CtorsIntern<A, ExtractUnion<A, Tag, Tags>, Tag> {}

export const Ctors = <A, Tag extends keyof A & string>(tag: Tag) => <K extends A[Tag] & string>(
  key: K
): Ctors<A, typeof key, Tag> => {
  const ctor: any = (rest: object) => ({
    [tag]: key,
    ...rest
  })
  return {
    of: ctor,
    narrowed: ctor
  }
}
