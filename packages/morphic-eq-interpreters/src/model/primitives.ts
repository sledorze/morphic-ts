import { option, array } from 'fp-ts'
import { eq, eqNumber, eqString, eqBoolean, eqStrict } from 'fp-ts/lib/Eq'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { EqType, EqURI } from '../hkt'
import { eqApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { UUID } from 'io-ts-types/lib/UUID'
import { getEq } from 'fp-ts/lib/Either'

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
    nullable: (getType, config) => env => new EqType(eqApplyConfig(config)(option.getEq(getType(env).eq), env)),
    array: (getType, config) => env => new EqType(eqApplyConfig(config)(array.getEq(getType(env).eq), env)),
    uuid: config => env => new EqType<UUID>(eqApplyConfig(config)(eqString, env)),
    either: (e, a, config) => env => new EqType(eqApplyConfig(config)(getEq(e(env).eq, a(env).eq), env))
  })
)
