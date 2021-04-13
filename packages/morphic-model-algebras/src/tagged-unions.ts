import type { AnyEnv, ConfigsForType, Named } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const TaggedUnionsURI = 'TaggedUnionsURI' as const
/**
 *  @since 0.0.1
 */
export type TaggedUnionsURI = typeof TaggedUnionsURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [TaggedUnionsURI]: ModelAlgebraTaggedUnions<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface TaggedUnionConfig<Types> {}

/**
 *  @since 0.0.1
 */
type TaggedTypes<F extends URIS, X, R> = {
  [o in keyof X]: Kind<F, R, any, any>
}

type PropsE<T> = T[keyof T] extends { _E: infer E } ? E : never
type PropsA<T> = T[keyof T] extends { _A: infer A } ? A : never

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraTaggedUnions<F extends URIS, Env> {
  _F: F
  taggedUnion: {
    <Tag extends string, Types extends TaggedTypes<F, any, Env>>(
      tag: Tag,
      types: Types,
      config?: Named<ConfigsForType<Env, PropsE<Types>, PropsA<Types>, TaggedUnionConfig<Types>>>
    ): Kind<F, Env, PropsE<Types>, PropsA<Types>>
  }
}
