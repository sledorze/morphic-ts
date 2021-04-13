import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import type { Either } from 'fp-ts/Either'
import { isLeft, isRight } from 'fp-ts/Either'
import { eqStrict } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/lib/function'
import { getOrd as OgetOrd } from 'fp-ts/Option'
import type { Ord } from 'fp-ts/Ord'
import { fromCompare, ord, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/ReadonlyArray'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */

  interface NonEmptyArrayConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface NullableConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface MutableConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionalConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface EitherConfig<EE, EA, AE, AA> {
    [OrdURI]: {
      left: Ord<EA>
      right: Ord<AA>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
}

const ordNumberOrString: Ord<number | string> = fromCompare((a, b) =>
  typeof a === 'number'
    ? typeof b === 'number'
      ? ordNumber.compare(a, b)
      : -1
    : typeof b === 'number'
    ? 1
    : ordString.compare(a, b)
)
const ordUndefinedOf = <A>(o: Ord<A>): Ord<A | undefined> =>
  fromCompare((a, b) => (a === undefined ? (b === undefined ? 0 : -1) : b === undefined ? 1 : o.compare(a, b)))

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<OrdURI, Env> => ({
    _F: OrdURI,
    date: config => env =>
      new OrdType(
        ordApplyConfig(config?.conf)(
          ord.contramap(ordNumber, date => date.getTime()),
          env,
          {}
        )
      ),
    boolean: config => env => new OrdType(ordApplyConfig(config?.conf)(ordBoolean, env, {})),
    string: config => env => new OrdType(ordApplyConfig(config?.conf)(ordString, env, {})),
    number: config => env => new OrdType(ordApplyConfig(config?.conf)(ordNumber, env, {})),
    bigint: config => env =>
      new OrdType<bigint>(
        ordApplyConfig(config?.conf)(
          { equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) },
          env,
          {}
        )
      ),
    stringLiteral: (k, config) => env => new OrdType<typeof k>(ordApplyConfig(config?.conf)(ordString, env, {})),
    numberLiteral: (k, config) => env => new OrdType<typeof k>(ordApplyConfig(config?.conf)(ordNumber, env, {})),
    oneOfLiterals: (k, config) => env =>
      new OrdType<typeof k[number]>(ordApplyConfig(config?.conf)(ordNumberOrString, env, {})),
    tag: (k, config) => env => new OrdType<typeof k>(ordApplyConfig(config?.conf)(ordString, env, {})),
    keysOf: (keys, config) => env =>
      new OrdType<keyof typeof keys>(
        ordApplyConfig(config?.conf)(
          ord.contramap(ordString, k => k as string),
          env,
          {}
        )
      ),
    nullable: (getOrd, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(OgetOrd(ord), env, { ord }))),
    optional: (getOrd, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(ordUndefinedOf(ord), env, { ord }))),
    mutable: (getOrd, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(ord, env, { ord }))),
    array: (getOrd, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(getArrayOrd(ord), env, { ord }))),
    nonEmptyArray: (getOrd, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(getArrayOrd(ord), env, { ord }))),
    uuid: config => env => new OrdType(ordApplyConfig(config?.conf)(ordString, env, {})),
    either: (e, a, config) => env =>
      ((left, right) => new OrdType(ordApplyConfig(config?.conf)(getEitherOrd(left, right), env, { left, right })))(
        e(env).ord,
        a(env).ord
      ),
    option: (a, config) => env =>
      pipe(a(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(OgetOrd(ord), env, { ord }))),
    unknownE: (a, config) => env => new OrdType(ordApplyConfig(config?.conf)(a(env).ord, env, {}))
  })
)

ordBoolean
const getEitherOrd = <L, A>(ordL: Ord<L>, ordA: Ord<A>): Ord<Either<L, A>> =>
  fromCompare((a, b) =>
    isLeft(a) ? (isLeft(b) ? ordL.compare(a.left, b.left) : -1) : isRight(b) ? ordA.compare(a.right, b.right) : 1
  )
