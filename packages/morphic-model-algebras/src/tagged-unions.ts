import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib/HKT'
import { isOptionalConfig, ByInterp } from '@morphic-ts/common/lib/core'
import { TaggedUnionConfig } from '@morphic-ts/algebras/lib/hkt'

/**
 *  @since 0.0.1
 */
export const TaggedUnionsURI = 'TaggedUnionsURI' as const
/**
 *  @since 0.0.1
 */
export type TaggedUnionsURI = typeof TaggedUnionsURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F> {
    [TaggedUnionsURI]: ModelAlgebraTaggedUnions<F>
  }
  export interface Algebra1<F extends URIS> {
    [TaggedUnionsURI]: ModelAlgebraTaggedUnions1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [TaggedUnionsURI]: ModelAlgebraTaggedUnions2<F>
  }
  /**
   *  @since 0.0.1
   */
  export interface TaggedUnionConfig {}
}

// TODO: replace with explicit `TagKey` if no impact on inference
// type TagKey<Tag extends string, o extends keyof any> = { [t in Tag]: o }
/**
 *  @since 0.0.1
 */
export type TaggedValues<Tag extends string, O> = { [o in keyof O]: O[o] & { [t in Tag]: o } }

/**
 *  @since 0.0.1
 */
export type TaggedTypes<F, Tag extends string, L, A> = {
  [o in keyof A & keyof L]: HKT2<F, 'TODOENV', L[o], (A & { [x in o]: { [k in Tag]: o } })[o]>
}

type DecorateTag<X extends HKT2<any, any, any, any>, Tag extends string, VTag> = X extends HKT2<
  infer F,
  infer R,
  infer L,
  infer A
>
  ? HKT2<F, R, L, A & { [k in Tag]: VTag }>
  : never

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTaggedUnions<F> {
  _F: F
  taggedUnion: {
    <Tag extends string, Types extends TaggedTypes<F, Tag, any, any>>(
      tag: Tag,
      types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> },
      name: string
    ): isOptionalConfig<TaggedUnionConfig, HKT2<F, 'TODOENV', Types[keyof Types]['_E'], Types[keyof Types]['_A']>>
    <Tag extends string, Types extends TaggedTypes<F, Tag, any, any>>(
      tag: Tag,
      types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> },
      name: string,
      config: ByInterp<TaggedUnionConfig, URIS | URIS2>
    ): HKT2<F, 'TODOENV', Types[keyof Types]['_E'], Types[keyof Types]['_A']>
  }
}

/**
 *  @since 0.0.1
 */
export type TaggedTypes1<F extends URIS, Tag extends string, O> = {
  [o in keyof O]: Kind<F, 'TODOENV', O[o] & { [t in Tag]: o }>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTaggedUnions1<F extends URIS> {
  _F: F
  taggedUnion<Tag extends string, O>(
    tag: Tag,
    types: TaggedTypes1<F, Tag, O>,
    name: string,
    config?: ByInterp<TaggedUnionConfig, F>
  ): Kind<F, 'TODOENV', TaggedValues<Tag, O>[keyof O]>
}

/**
 *  @since 0.0.1
 */
export type TaggedTypes2<F extends URIS2, Tag extends string, L, A> = {
  [o in keyof A & keyof L]: Kind2<F, 'TODOENV', A[o] & { [t in Tag]: o }, L[o] & { [t in Tag]: o }>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTaggedUnions2<F extends URIS2> {
  _F: F
  taggedUnion<Tag extends string, A, L>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L>,
    name: string,
    config?: ByInterp<TaggedUnionConfig, F>
  ): Kind2<F, 'TODOENV', TaggedValues<Tag, A>[keyof A], TaggedValues<Tag, L>[keyof L]>
}
