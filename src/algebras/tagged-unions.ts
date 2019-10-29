import { URIS, Kind, URIS2, Kind2 } from '../HKT'
import { M } from '../core'

// TODO: replace with explicit `TagKey` if no impact on inference
// type TagKey<Tag extends string, o extends keyof any> = { [t in Tag]: o }
export type TaggedValues<Tag extends string, O> = { [o in keyof O]: O[o] & { [t in Tag]: o } }

export type TaggedTypes<Tag extends string, L, A> = {
  [o in keyof A & keyof L]: M<L[o], (A & { [x in o]: { [k in Tag]: o } })[o]>
}

type DecorateTag<X extends M<any, any>, Tag extends string, VTag> = X extends M<infer L, infer A>
  ? M<L, A & { [k in Tag]: VTag }>
  : never

export interface ModelAlgebraTaggedUnions {
  taggedUnion<Tag extends string, Types extends TaggedTypes<Tag, any, any>>(
    tag: Tag,
    types: Types &
      {
        [o in keyof Types]: DecorateTag<Types[o], Tag, o>
      }
  ): M<
    {
      [k in keyof Types]: Types[k]['_L']
    }[keyof Types],
    {
      [k in keyof Types]: Types[k]['_A']
    }[keyof Types]
  >
}

export type TaggedTypes1<F extends URIS, Tag extends string, O> = { [o in keyof O]: Kind<F, O[o] & { [t in Tag]: o }> }

export interface ModelAlgebraTaggedUnions1<F extends URIS> {
  taggedUnion<Tag extends string, O>(tag: Tag, types: TaggedTypes1<F, Tag, O>): Kind<F, TaggedValues<Tag, O>[keyof O]>
}

export type TaggedTypes2<F extends URIS2, Tag extends string, L, A> = {
  [o in keyof A & keyof L]: Kind2<F, A[o] & { [t in Tag]: o }, L[o] & { [t in Tag]: o }>
}

export interface ModelAlgebraTaggedUnions2<F extends URIS2> {
  taggedUnion<Tag extends string, A, L>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L>
  ): Kind2<F, TaggedValues<Tag, A>[keyof A], TaggedValues<Tag, L>[keyof L]>
}
