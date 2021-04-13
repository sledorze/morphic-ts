import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import type { Arbitrary } from 'fast-check'
import { array, bigInt, boolean, constant, float, integer, oneof, option, string, uuid } from 'fast-check'
import { left as ELeft, right as ERight } from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { cons } from 'fp-ts/NonEmptyArray'
import { fromNullable, none, some } from 'fp-ts/Option'
import type { UUID } from 'io-ts-types/lib/UUID'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */

  interface NonEmptyArrayConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface NullableConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface MutableConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionalConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface EitherConfig<EE, EA, AE, AA> {
    [FastCheckURI]: {
      left: Arbitrary<EA>
      right: Arbitrary<AA>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    date: configs => env =>
      new FastCheckType(
        fastCheckApplyConfig(configs?.conf)(
          integer().map(n => new Date(n)),
          env,
          {}
        )
      ),
    boolean: configs => env => new FastCheckType(fastCheckApplyConfig(configs?.conf)(boolean(), env, {})),
    string: configs => env => new FastCheckType(fastCheckApplyConfig(configs?.conf)(string(), env, {})),
    number: configs => env => new FastCheckType(fastCheckApplyConfig(configs?.conf)(float(), env, {})),
    bigint: configs => env => new FastCheckType(fastCheckApplyConfig(configs?.conf)(bigInt(), env, {})),
    stringLiteral: (l, config) => env => new FastCheckType(fastCheckApplyConfig(config?.conf)(constant(l), env, {})),
    numberLiteral: (l, config) => env => new FastCheckType(fastCheckApplyConfig(config?.conf)(constant(l), env, {})),
    oneOfLiterals: (l, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config?.conf)(oneof(...l.map(constant)), env, {})),
    tag: (l, config) => env => new FastCheckType(fastCheckApplyConfig(config?.conf)(constant(l), env, {})),
    keysOf: (k, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config?.conf)(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant)), env, {})
      ),
    nullable: (T, config) => env =>
      pipe(
        T(env).arb,
        arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(option(arb).map(fromNullable), env, { arb }))
      ),
    optional: (T, config) => env =>
      pipe(
        T(env).arb,
        arb =>
          new FastCheckType(
            fastCheckApplyConfig(config?.conf)(
              option(arb).map(x => (x === null ? undefined : x)),
              env,
              { arb }
            )
          )
      ),
    mutable: (T, config) => env =>
      pipe(T(env).arb, arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(arb, env, { arb }))),
    array: (T, config) => env =>
      pipe(T(env).arb, arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(array(arb), env, { arb }))),
    nonEmptyArray: (T, config) => env =>
      pipe(
        T(env).arb,
        arb =>
          new FastCheckType(
            fastCheckApplyConfig(config?.conf)(
              array(arb).chain(rest => arb.map(h => cons(h, rest))),
              env,
              { arb }
            )
          )
      ),
    uuid: config => env =>
      pipe(uuid() as Arbitrary<UUID>, arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(arb, env, { arb }))),
    either: (e, a, config) => env =>
      ((left, right) =>
        new FastCheckType(
          fastCheckApplyConfig(config?.conf)(oneof(left.map(ELeft), right.map(ERight)) as any, env, {
            left,
            right
          })
        ))(e(env).arb, a(env).arb),
    option: (T, config) => env =>
      pipe(
        T(env).arb,
        arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(oneof(arb.map(some), constant(none)), env, { arb }))
      ),
    unknownE: (a, config) => env => new FastCheckType(fastCheckApplyConfig(config?.conf)(a(env).arb, env, {}))
  })
)
