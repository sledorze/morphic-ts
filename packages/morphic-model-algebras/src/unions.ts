import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { HKT, Kind, URIS } from '@morphic-ts/common/lib/HKT'
import type { Either } from 'fp-ts/lib/Either'

/**
 *  @since 0.0.1
 */
export const UnionsURI = 'UnionsURI' as const
/**
 *  @since 0.0.1
 */
export type UnionsURI = typeof UnionsURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [UnionsURI]: ModelAlgebraUnions<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnions<F extends URIS, Env extends AnyEnv> {
  _F: F
  union: {
    <Types extends readonly [Kind<F, Env, any, any>, ...Kind<F, Env, any, any>[]]>(types: Types): (
      guards: {
        [k in keyof Types]: (
          _: {
            [h in keyof Types]: Types[h] extends Kind<F, Env, infer E, infer A> ? A : never
          }[number]
        ) => Types[k] extends HKT<any, any, any>
          ? Either<Exclude<Types[number]['_A'], Types[k]['_A']>, Types[k]['_A']>
          : never
      },
      name: string
    ) => Kind<F, Env, Types[number]['_E'], Types[number]['_A']>
  }
}
