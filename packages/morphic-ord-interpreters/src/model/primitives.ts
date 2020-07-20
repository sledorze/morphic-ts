import { getOrd as OgetOrd } from 'fp-ts/lib/Option'
import { ordNumber, ordString, ord, ordBoolean, fromCompare } from 'fp-ts/lib/Ord'
import type { Ord } from 'fp-ts/lib/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/lib/Array'
import type { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { OrdType, OrdURI } from '../hkt'
import { eqStrict } from 'fp-ts/lib/Eq'
import { ordApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import type { Either } from 'fp-ts/lib/Either'

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<OrdURI, Env> => ({
    _F: OrdURI,
    date: config => env =>
      new OrdType(
        ordApplyConfig(config)(
          ord.contramap(ordNumber, date => date.getTime()),
          env
        )
      ),
    boolean: config => env => new OrdType(ordApplyConfig(config)(ordBoolean, env)),
    string: config => env => new OrdType(ordApplyConfig(config)(ordString, env)),
    number: config => env => new OrdType(ordApplyConfig(config)(ordNumber, env)),
    bigint: config => env =>
      new OrdType<bigint>(
        ordApplyConfig(config)({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }, env)
      ),
    stringLiteral: (k, config) => env => new OrdType<typeof k>(ordApplyConfig(config)(ordString, env)),
    keysOf: (keys, config) => env =>
      new OrdType<keyof typeof keys>(
        ordApplyConfig(config)(
          ord.contramap(ordString, k => k as string),
          env
        )
      ),
    nullable: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(OgetOrd(getOrd(env).ord), env)),
    array: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getArrayOrd(getOrd(env).ord), env)),
    nonEmptyArray: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getArrayOrd(getOrd(env).ord), env)),
    uuid: config => env => new OrdType(ordApplyConfig(config)(ordString, env)),
    either: (e, a, config) => env => new OrdType(ordApplyConfig(config)(getEitherOrd(e(env).ord, a(env).ord), env)),
    option: (a, config) => env => new OrdType(ordApplyConfig(config)(OgetOrd(a(env).ord), env))
  })
)

ordBoolean
const getEitherOrd = <L, A>(ordL: Ord<L>, ordA: Ord<A>): Ord<Either<L, A>> =>
  fromCompare((a, b) =>
    isLeft(a) ? (isLeft(b) ? ordL.compare(a.left, b.left) : -1) : isRight(b) ? ordA.compare(a.right, b.right) : 1
  )
