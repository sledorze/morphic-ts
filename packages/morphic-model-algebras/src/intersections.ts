import type { Kind, URIS } from '@morphic-ts/common/lib//HKT'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { OfType, UnionToIntersection } from '@morphic-ts/common/lib/core'
/**
 *  @since 0.0.1
 */
export const IntersectionURI = 'IntersectionURI' as const
/**
 *  @since 0.0.1
 */
export type IntersectionURI = typeof IntersectionURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [IntersectionURI]: ModelAlgebraIntersection<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <Types extends readonly OfType<F, any, any, Env>[]>(types: Types, name: string): Kind<
      F,
      Env,
      UnionToIntersection<
        {
          [k in keyof Types]: Types[k] extends OfType<F, infer LA, infer A, Env>
            ? unknown extends LA
              ? never
              : LA
            : never
        }[number]
      >,
      UnionToIntersection<
        {
          [k in keyof Types]: Types[k] extends OfType<F, infer LA, infer A, Env>
            ? unknown extends A
              ? never
              : A
            : never
        }[number]
      >
    >
  }
}
