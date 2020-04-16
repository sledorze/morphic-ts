import { URIS, Kind, URIS2, Kind2, HKT2 } from '@morphic-ts/common/lib/HKT'
import { UnionToIntersection } from '@morphic-ts/common/lib/core'
import { ConfigsForType, ConfigsEnvs } from '@morphic-ts/common/lib/config'

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
}

/**
 *  @since 0.0.1
 */
export type TaggedValues<Tag extends string, O> = { [o in keyof O]: O[o] & { [t in Tag]: o } }

/**
 *  @since 0.0.1
 */
export type TaggedTypes<F, Tag extends string, L, A, R> = {
  [o in keyof A & keyof L]: HKT2<F, R, L[o], (A & { [x in o]: { [k in Tag]: o } })[o]>
}

type UX<T extends TaggedTypes<any, any, any, any, any>> = {
  [k in keyof T]: T[k] extends HKT2<any, infer R, any, any> ? R : never
}[keyof T]

// type EnvOfTaggedTypes<T extends TaggedTypes<any, any, any, any, any>> = {
//   [k in keyof UnionToIntersection<UX<T>>]: UnionToIntersection<UX<T>>[k]
// }

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
    <Tag extends string, Types extends TaggedTypes<F, Tag, any, any, any>>(
      tag: Tag,
      types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> },
      name: string
    ): HKT2<
      F,
      {
        [k in keyof UnionToIntersection<UX<Types>>]: UnionToIntersection<UX<Types>>[k]
      },
      Types[keyof Types]['_E'],
      Types[keyof Types]['_A']
    >
  }
  taggedUnionCfg: {
    <Tag extends string, Types extends TaggedTypes<F, Tag, any, any, any>>(
      tag: Tag,
      types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> },
      name: string
    ): <C extends ConfigsForType<Types[keyof Types]['_E'], Types[keyof Types]['_A']>>(
      config: C
    ) => HKT2<
      F,
      {
        [k in keyof UnionToIntersection<UX<Types>>]: UnionToIntersection<UX<Types>>[k]
      } &
        ConfigsEnvs<C>,
      Types[keyof Types]['_E'],
      Types[keyof Types]['_A']
    >
  }
}

/**
 *  @since 0.0.1
 */
export type TaggedTypes1<F extends URIS, Tag extends string, O, R> = {
  [o in keyof O]: Kind<F, R, O[o] & { [t in Tag]: o }>
}
type EnvOfTaggedTypes1<T extends TaggedTypes1<URIS, any, any, any>> = T extends TaggedTypes1<URIS, any, any, infer R>
  ? R
  : never

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTaggedUnions1<F extends URIS> {
  _F: F
  taggedUnion<Tag extends string, O, R>(
    tag: Tag,
    types: TaggedTypes1<F, Tag, O, R>,
    name: string
  ): Kind<F, EnvOfTaggedTypes1<typeof types>, TaggedValues<Tag, O>[keyof O]>
  taggedUnionCfg<Tag extends string, O, R>(
    tag: Tag,
    types: TaggedTypes1<F, Tag, O, R>,
    name: string
  ): <C extends ConfigsForType<unknown, TaggedValues<Tag, O>[keyof O]>>(
    config: C
  ) => Kind<F, EnvOfTaggedTypes1<typeof types> & ConfigsEnvs<C>, TaggedValues<Tag, O>[keyof O]>
}

/**
 *  @since 0.0.1
 */
export type TaggedTypes2<F extends URIS2, Tag extends string, L, A, R> = {
  [o in keyof A & keyof L]: Kind2<F, R, A[o] & { [t in Tag]: o }, L[o] & { [t in Tag]: o }>
}
export type EnvOfTaggedTypes2<T extends TaggedTypes2<URIS, any, any, any, any>> = T extends TaggedTypes2<
  URIS,
  any,
  any,
  any,
  infer R
>
  ? R
  : never

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTaggedUnions2<F extends URIS2> {
  _F: F
  taggedUnion<Tag extends string, A, L, R>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L, R>,
    name: string
  ): Kind2<F, EnvOfTaggedTypes2<typeof types>, TaggedValues<Tag, L>[keyof L], TaggedValues<Tag, A>[keyof A]>
  taggedUnionCfg<Tag extends string, A, L, R>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L, R>,
    name: string
  ): <C extends ConfigsForType<TaggedValues<Tag, L>[keyof L], TaggedValues<Tag, A>[keyof A]>>(
    config: C
  ) => Kind2<
    F,
    EnvOfTaggedTypes2<typeof types> & ConfigsEnvs<C>,
    TaggedValues<Tag, L>[keyof L],
    TaggedValues<Tag, A>[keyof A]
  >
}
