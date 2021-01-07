import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import { getEq as EgetEq } from 'fp-ts/Either'
import type { Eq } from 'fp-ts/Eq'
import { eq, eqBoolean, eqNumber, eqStrict, eqString } from 'fp-ts/Eq'
import { getEq as OgetEq } from 'fp-ts/Option'
import { pipe } from 'fp-ts/pipeable'
import { getEq as AgetEq } from 'fp-ts/ReadonlyArray'
import { getEq as NEAgetEq } from 'fp-ts/ReadonlyNonEmptyArray'
import type { UUID } from 'io-ts-types/lib/UUID'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */

  interface NonEmptyArrayConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface NullableConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface MutableConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionalConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface EitherConfig<EE, EA, AE, AA> {
    [EqURI]: {
      left: Eq<EA>
      right: Eq<AA>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
}

const getOptionalEq = <A>(eq: Eq<A>): Eq<A | undefined> => ({
  equals: (a, b) => (a === undefined ? b === undefined : b !== undefined && eq.equals(a, b))
})

/**
 *  @since 0.0.1
 */
export const eqPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<EqURI, Env> => ({
    _F: EqURI,
    date: config => env =>
      new EqType(
        eqApplyConfig(config)(
          eq.contramap(eqNumber, (date: Date) => date.getTime()),
          env,
          {}
        )
      ),
    boolean: config => env => new EqType(eqApplyConfig(config)(eqBoolean, env, {})),
    string: config => env => new EqType(eqApplyConfig(config)(eqString, env, {})),
    number: config => env => new EqType(eqApplyConfig(config)(eqNumber, env, {})),
    bigint: config => env => new EqType<bigint>(eqApplyConfig(config)(eqStrict, env, {})),
    stringLiteral: (k, config) => env => new EqType<typeof k>(eqApplyConfig(config)(eqString, env, {})),
    numberLiteral: (k, config) => env => new EqType<typeof k>(eqApplyConfig(config)(eqNumber, env, {})),
    oneOfLiterals: (k, config) => env => new EqType<typeof k[number]>(eqApplyConfig(config)(eqStrict, env, {})),
    tag: (k, config) => env => new EqType<typeof k>(eqApplyConfig(config)(eqString, env, {})),
    keysOf: (keys, config) => env => new EqType<keyof typeof keys>(eqApplyConfig(config)(eqStrict, env, {})),
    nullable: (getType, config) => env =>
      pipe(getType(env).eq, eq => new EqType(eqApplyConfig(config)(OgetEq(eq), env, { eq }))),
    optional: (getType, config) => env =>
      pipe(getType(env).eq, eq => new EqType(eqApplyConfig(config)(getOptionalEq(eq), env, { eq }))),
    mutable: (getType, config) => env =>
      pipe(getType(env).eq, eq => new EqType(eqApplyConfig(config)(eq, env, { eq }))),
    array: (getType, config) => env =>
      pipe(getType(env).eq, eq => new EqType(eqApplyConfig(config)(AgetEq(eq), env, { eq }))),
    nonEmptyArray: (getType, config) => env =>
      pipe(getType(env).eq, eq => new EqType(eqApplyConfig(config)(NEAgetEq(eq), env, { eq }))),
    uuid: config => env => new EqType<UUID>(eqApplyConfig(config)(eqString, env, {})),
    either: (e, a, config) => env =>
      ((left, right) => new EqType(eqApplyConfig(config)(EgetEq(left, right), env, { left, right })))(
        e(env).eq,
        a(env).eq
      ),
    option: (a, config) => env => pipe(a(env).eq, eq => new EqType(eqApplyConfig(config)(OgetEq(eq), env, { eq }))),
    unknownE: (a, config) => env => new EqType(eqApplyConfig(config)(a(env).eq, env, {}))
  })
)
