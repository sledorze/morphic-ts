import type { AnyEnv, ConfigsForType, Named } from '@morphic-ts/common/lib/config'
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
export interface UnionConfig<Types> {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraUnions<F extends URIS, Env extends AnyEnv> {
  _F: F
  union: {
    <Types extends readonly [Kind<F, Env, any, any>, ...Kind<F, Env, any, any>[]]>(...types: Types): (
      guards: {
        [k in keyof Types]: (
          _: {
            [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? A : never
          }[number]
        ) => [Types[k]] extends [HKT<Env, infer E, infer A>]
          ? [Types[number]] extends [HKT<Env, infer E, infer All>]
            ? Either<Exclude<All, A>, A>
            : never
          : never
      },
      config?: Named<
        ConfigsForType<
          Env,
          {
            [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? E : never
          }[number],
          {
            [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? A : never
          }[number],
          UnionConfig<Types>
        >
      >
    ) => Kind<
      F,
      Env,
      {
        [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? E : never
      }[number],
      {
        [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, infer A>] ? A : never
      }[number]
    >
  }
}
