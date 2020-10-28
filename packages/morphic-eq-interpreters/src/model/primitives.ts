import { getEq as OgetEq } from 'fp-ts/Option'
import { getEq as AgetEq } from 'fp-ts/Array'
import { getEq as NEAgetEq } from 'fp-ts/NonEmptyArray'
import { getEq as EgetEq } from 'fp-ts/Either'
import { eq, eqNumber, eqString, eqBoolean, eqStrict } from 'fp-ts/Eq'
import type { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { EqType, EqURI } from '../hkt'
import { eqApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { UUID } from 'io-ts-types/lib/UUID'

/**
 *  @since 0.0.1
 */
export const eqPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<EqURI, Env> => ({
    _F: EqURI,
    date: config => env =>
      new EqType(
        eqApplyConfig(config)(
          eq.contramap(eqNumber, (date: Date) => date.getTime()),
          env
        )
      ),
    boolean: config => env => new EqType(eqApplyConfig(config)(eqBoolean, env)),
    string: config => env => new EqType(eqApplyConfig(config)(eqString, env)),
    number: config => env => new EqType(eqApplyConfig(config)(eqNumber, env)),
    bigint: config => env => new EqType<bigint>(eqApplyConfig(config)(eqStrict, env)),
    stringLiteral: (k, config) => env => new EqType<typeof k>(eqApplyConfig(config)(eqString, env)),
    keysOf: (keys, config) => env => new EqType<keyof typeof keys>(eqApplyConfig(config)(eqStrict, env)),
    nullable: (getType, config) => env => new EqType(eqApplyConfig(config)(OgetEq(getType(env).eq), env)),
    array: (getType, config) => env => new EqType(eqApplyConfig(config)(AgetEq(getType(env).eq), env)),
    nonEmptyArray: (getType, config) => env => new EqType(eqApplyConfig(config)(NEAgetEq(getType(env).eq), env)),
    uuid: config => env => new EqType<UUID>(eqApplyConfig(config)(eqString, env)),
    either: (e, a, config) => env => new EqType(eqApplyConfig(config)(EgetEq(e(env).eq, a(env).eq), env)),
    option: (a, config) => env => new EqType(eqApplyConfig(config)(OgetEq(a(env).eq), env))
  })
)
