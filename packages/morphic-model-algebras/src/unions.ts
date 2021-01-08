import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'

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
    <Types extends readonly [Kind<F, Env, any, any>, ...Kind<F, Env, any, any>[]]>(types: Types, name: string): Kind<
      F,
      Env,
      {
        [h in keyof Types]: [Types[h]] extends [Kind<F, Env, infer E, infer A>] ? E : never
      }[keyof Types & number],
      {
        [h in keyof Types]: [Types[h]] extends [Kind<F, Env, infer E, infer A>] ? A : never
      }[keyof Types & number]
    >
  }
}
