import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'
import type { Predicate } from 'fp-ts/function'
import { pipe } from 'fp-ts/function'
import { failure, success, Type } from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/refined' {
  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A, B> {
    [IoTsURI]: {
      type: Type<A, E>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PredicateConfig<E, A> {
    [IoTsURI]: {
      type: Type<A, E>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const refinement = <A, O, B extends A>(T: Type<A, O>, ref: (a: A) => a is B, name: string): Type<B, O> =>
  new Type<B, O>(
    name,
    (x): x is B => T.is(x) && ref(x),
    (i, c) => {
      const r = T.decode(i)
      if (r._tag === 'Left') {
        return r
      }
      const v = r.right
      return ref(v) ? success(v) : failure(i, c)
    },
    T.encode
  )

/**
 *  @since 0.0.1
 */
export const predicate = <A, O>(T: Type<A, O>, predicate: Predicate<A>, name: string): Type<A, O> =>
  new Type<A, O>(
    name,
    (x): x is A => T.is(x) && predicate(x),
    (i, c) => {
      const r = T.decode(i)
      if (r._tag === 'Left') {
        return r
      }
      const v = r.right
      return predicate(v) ? success(v) : failure(i, c)
    },
    T.encode
  )

/**
 *  @since 0.0.1
 */
export const ioTsRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<IoTsURI, Env> => ({
    _F: IoTsURI,
    refined: (a, ref, config) => env =>
      pipe(
        a(env).type,
        type =>
          new IOTSType(
            iotsApplyConfig(config?.conf)(refinement(type, ref, config?.name || `Refined(${type.name})`), env, { type })
          )
      ),
    constrained: (a, pred, config) => env =>
      pipe(
        a(env).type,
        type =>
          new IOTSType(
            iotsApplyConfig(config?.conf)(predicate(type, pred, config?.name || `Constrained(${type.name})`), env, {
              type
            })
          )
      )
  })
)
