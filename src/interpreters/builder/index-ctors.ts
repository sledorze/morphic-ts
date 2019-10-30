import { Remove, ExtractUnion } from '../../common'

export type Ctor<S, V extends S, Tag extends string> = (x: Remove<V, Tag>) => S
export type CtorNarrowed<S, V extends S, Tag extends string> = (x: Remove<V, Tag>) => V

export interface CtorsIntern<A, V extends A, Tag extends string> {
  of: Ctor<A, V, Tag>
  narrowed: CtorNarrowed<A, V, Tag>
}

export interface Ctors<A, Tags extends A[Tag] & string, Tag extends keyof A & string>
  extends CtorsIntern<A, ExtractUnion<A, Tag, Tags>, Tag> {}

export const makeCtors = <A, Tag extends keyof A & string>(tag: Tag) => <K extends A[Tag] & string>(
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
