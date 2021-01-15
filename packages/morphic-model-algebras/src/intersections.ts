import type { ConfigTypeKind, ConfigTypeURIS, HKT, Kind, URIS } from '@morphic-ts/common/lib//HKT'
import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
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
 * @since 0.0.1
 */
export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {}

/**
 *  Map an Array of E and A to an Array of ConfigType for a particular URI
 *  @since 0.0.1
 */
export type IntersectionLA<L extends readonly unknown[], A extends readonly unknown[], URI extends ConfigTypeURIS> = {
  [k in keyof L]: k extends keyof A ? ConfigTypeKind<URI, L[k], A[k]> : never
}

/**
 *  Map some Props to their ConfigTypes for a particular URI
 *  @since 0.0.1
 */
export type InterfaceLA<Props, URI extends ConfigTypeURIS> = {
  [k in keyof Props]: Props[k] extends HKT<infer R, infer E, infer A> ? ConfigTypeKind<URI, E, A> : never
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraIntersection<F extends URIS, Env extends AnyEnv> {
  _F: F
  intersection: {
    <Types extends readonly OfType<F, any, any, Env>[]>(...types: Types): (
      name: string,
      config?: ConfigsForType<
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
        >,
        IntersectionConfig<
          {
            [k in keyof Types]: Types[k] extends OfType<F, infer LA, infer A, Env> ? LA : never
          },
          {
            [k in keyof Types]: Types[k] extends OfType<F, infer LA, infer A, Env> ? A : never
          }
        >
      >
    ) => Kind<
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
