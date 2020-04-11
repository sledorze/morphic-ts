import { URIS, URIS2, Kind, Kind2 } from './HKT'
import { Compact } from './core'
export { Kind, Kind2 }

// /**
//  * Expose Configuration type for (a) specific interpreter(s) types
//  *  @since 0.0.1
//  */
// export type ByInterp<Config, Interp extends URIS | URIS2> = MaybeUndefinedIfOptional<
//   OptionalIfUndefined<
//     {
//       [I in Interp]: I extends keyof Config ? Config[I] : undefined
//     }
//   >
// >

// /**
//  *  @since 0.0.1
//  */
// export type MaybeUndefinedIfOptional<X> = keyof KeepNotUndefined<X> extends never ? X | undefined : X
// /**
//  *  @since 0.0.1
//  */
// export type isOptionalConfig<C, Y> = keyof KeepNotUndefined<ByInterp<C, URIS | URIS2>> extends never
//   ? Y
//   : 'a configuration is required'

/**
 * generates a config wrapper:
 *
 * Example:
 *
 * ```typescript
 *   const eqConfig = genConfig(EqURI)
 * ```
 *
 * Usage:
 *
 * ```typescript
 *   summonAs(F => F.unknown(eqConfig({ compare: 'default-circular' })))
 *   summonAs(F => F.unknown({...eqConfig({ compare: 'default-circular' }), ...iotsConfig(x => x)}))
 * ```
 *
 *  @since 0.0.1
 */

export interface GenConfig<A, R> {
  (a: A, r: R): A
}

export type NoEnv = unknown

export type MapToGenConfig<T extends Record<URIS | URIS2, any>> = { [k in URIS | URIS2]?: GenConfig<T[k], any> }

export interface ConfigType<E, A> {
  _E: E
  _A: A
}

export type ConfigsForType<E, A> = MapToGenConfig<ConfigType<E, A>>

/**
 *  @since 0.0.1
 */

export type ConfigsEnvs<T extends MapToGenConfig<any>> = Compact<
  {
    [k in keyof T]: T[k] extends (a: any, env: infer R) => any ? R : never
  }
>

export const genConfig = <Uri extends URIS | URIS2>(uri: Uri) => <R, E, A>(
  config: GenConfig<ConfigType<E, A>[Uri], R>
): { [k in Uri]: GenConfig<ConfigType<E, A>[Uri], unknown extends R ? unknown : R> } => ({ [uri]: config } as any)

export const getApplyConfig = <Uri extends URIS | URIS2>(uri: Uri) => <R, E, A>(
  config: GenConfig<ConfigType<E, A>[Uri], R>
): GenConfig<ConfigType<E, A>[Uri], unknown extends R ? unknown : R> => config[uri]
