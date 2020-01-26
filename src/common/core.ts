import { Kind, URIS, URIS2, Kind2 } from './HKT'

export type OfType<F extends URIS, A> = Kind<F, A>
export type OfType2<F extends URIS2, L, A> = Kind2<F, L, A>

/**
 * This is necessary to help fixing F type for inference
 */
export interface InterpreterFor<F extends URIS | URIS2> {
  readonly InterpreterType: F
}
// export type InterpreterOf<F extends URIS | URIS2, O extends object> =

export function InterpreterFor<F extends URIS | URIS2>(k: F): <O extends object>(o: O) => InterpreterFor<F> & O {
  return o => Object.assign({}, o, { InterpreterType: k })
}

type Function1 = (a: any) => any
export type CacheType = <F extends Function1>(f: F) => F

export function cacheUnaryFunction<F extends Function1>(f: F) {
  type K = F extends (a: infer K) => any ? K : any
  type V = F extends (a: any) => infer V ? V : any
  const mapping = new Map<K, V>()
  const fres = (key: K): V => {
    const res = mapping.get(key)
    if (res !== undefined) {
      return res
    } else {
      const v = f(key)
      mapping.set(key, v)
      return v
    }
  }
  return fres as F
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type Compact<A> = {
  [K in keyof A]: A[K]
}

export type KeepNotUndefined<O> = UnionToIntersection<
  NonNullable<{ [k in keyof O]: undefined extends O[k] ? never : { [x in k]: O[k] } }[keyof O]>
>
type KeepOptionalIfUndefined<O> = UnionToIntersection<
  NonNullable<{ [k in keyof O]: undefined extends O[k] ? { [x in k]?: O[k] } : never }[keyof O]>
>
export type OptionalIfUndefined<T> = Compact<KeepNotUndefined<T> & KeepOptionalIfUndefined<T>>

/**
 * Expose Configuration type for (a) specific interpreter(s) types
 */
export type ByInterp<Config, Interp extends URIS | URIS2> = MaybeUndefinedIfOptional<
  OptionalIfUndefined<
    {
      [I in Interp]: I extends keyof Config ? Config[I] : undefined
    }
  >
>

export type MaybeUndefinedIfOptional<X> = keyof KeepNotUndefined<X> extends never ? X | undefined : X

export type isOptionalConfig<C, Y, N> = keyof KeepNotUndefined<ByInterp<C, URIS | URIS2>> extends never ? Y : N

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
 */
export const genConfig = <K extends URIS | URIS2>(k: K) => <T>(c: T extends { [k in K]?: infer C } ? C : never): T =>
  ({ [k]: c } as any)
