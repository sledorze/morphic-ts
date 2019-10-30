import { identity } from 'fp-ts/lib/function'
import { ElemType, TagsOf, ExtractUnion, VariantType } from '../../common'
import * as M from './index-monocle'
import * as Ma from './index-matcher'
import * as C from './index-ctors'
import * as P from './index-predicates'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

interface Variant<A, V extends A, Tag extends string>
  extends M.MonocleFor<V>,
    C.CtorsIntern<A, V, Tag>,
    P.Predicates<A, V> {}

type Variants<A, Tag extends string, Tags extends string> = {
  [Key in Tags]: Variant<A, VariantType<A, Tag, Key>, Tag>
}

interface ADT<A, Tag extends keyof A & string, Tags extends string>
  extends Ma.Matchers<ExtractUnion<A, Tag, Tags>, Tag> {
  variants: Variants<A, Tag, Tags>
}

export type ByTag<A> = <Tag extends TagsOf<A> & string>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(...tags: Tags) => ADT<A, Tag, ElemType<typeof tags>>

export const makeByTag = <A>(): ByTag<A> => tag => (..._keys) => {
  type Tag = typeof tag

  type Keys = ElemType<typeof _keys>
  const keys = (_keys as any) as Keys[]

  type Union = ExtractUnion<A, Tag, Keys>
  const variants = {} as Variants<A, Tag, Keys>

  const ctors = C.makeCtors<A, Tag>(tag)
  const predicates = P.makePredicates<A>()
  const monocles = M.getMonocleFor<Union>()

  for (const key of keys) {
    const { of, narrowed } = ctors(key)
    const { isA } = predicates(tag, key)
    const variant: Variant<A, VariantType<A, Tag, Keys>, Tag> = {
      of,
      narrowed,
      isA,
      ...monocles
    }
    variants[key] = variant
  }
  const matchers = Ma.makeMatchers<Union, Tag>(tag)

  const res: ADT<A, Tag, Keys> = {
    variants,
    ...matchers
  }
  return res
}

export class BuilderType<A> {
  byTag: ByTag<A>

  constructor(public builder: Builder<A>) {
    this.byTag = makeByTag<A>()
  }
}

declare module '../../HKT' {
  interface URItoKind<A> {
    Builder: BuilderType<A>
  }
}
