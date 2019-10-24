import { identity } from 'fp-ts/lib/function'

export const URI = 'Builder'
export type URI = typeof URI

export type Builder<T> = (x: T) => T
export const makeBuilder = <A>() => new BuilderType<A>(identity)
export type BuilderValue<B extends BuilderType<any>> = B extends BuilderType<infer A> ? A : never

type Remove<A, Tag extends keyof A> = { [k in Exclude<keyof A, Tag>]: A[k] }
type ElemType<A> = A extends Array<infer E> ? E : never

type DicardKey<A, Tag extends keyof A, Key> = Extract<A, { [t in Tag]: Key }>
type TagsOf<A> = { [k in keyof A]: A[k] extends string ? k : never }[keyof A]

type ByTag<A> = <Tag extends TagsOf<A>>(
  t: Tag
) => <Tags extends (A[Tag] & string)[]>(
  ...tags: Tags
) => { [Key in ElemType<Tags>]: (x: Remove<DicardKey<A, Tag, Key>, Tag>) => DicardKey<A, Tag, Key> }

const makeByTag = <A>(): ByTag<A> => tag => (...keys) => {
  const res: any = {}
  for (const key of keys) {
    res[tag] = (rest: object) => ({ [tag]: key, ...rest })
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
