import { URIS, URIS2 } from './HKT'
import { OptionalIfUndefined, KeepNotUndefined, Compact } from './core'

/**
 * Expose Configuration type for (a) specific interpreter(s) types
 *  @since 0.0.1
 */
export type ByInterp<Config, Interp extends URIS | URIS2> = MaybeUndefinedIfOptional<
  OptionalIfUndefined<
    {
      [I in Interp]: I extends keyof Config ? Config[I] : undefined
    }
  >
>

/**
 *  @since 0.0.1
 */
export type MaybeUndefinedIfOptional<X> = keyof KeepNotUndefined<X> extends never ? X | undefined : X

/**
 *  @since 0.0.1
 */
export type isOptionalConfig<C, Y> = keyof KeepNotUndefined<ByInterp<C, URIS | URIS2>> extends never
  ? Y
  : 'a configuration is required'

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

export const genConfig: <Uri extends URIS | URIS2>(uri: Uri) => ConfigWrapper<Uri> = uri => config =>
  ({ [uri]: config } as any)

/**
 *  @since 0.0.1
 */

export interface GenConfig<A, R> {
  (a: A, r: R): A
}

export interface ConfigWrapper<Uri extends URIS | URIS2> {
  <A, R>(config: GenConfig<A, R>): { [k in Uri]: GenConfig<A, unknown extends R ? unknown : R> }
}

export type NoEnv = unknown

export type ConfigsOf<Conf> = { [k in URIS | URIS2]?: Conf }
export type ConfigsEnvs<T extends ConfigsOf<any>> = Compact<
  {
    [k in keyof T]: T[k] extends (a: any, env: infer R) => any ? R : never
  }
>
