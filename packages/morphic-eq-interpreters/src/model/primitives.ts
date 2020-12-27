import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import { getEq as EgetEq } from 'fp-ts/Either'
import { eq, eqBoolean, eqNumber, eqStrict, eqString } from 'fp-ts/Eq'
import { getEq as OgetEq } from 'fp-ts/Option'
import { getEq as AgetEq } from 'fp-ts/ReadonlyArray'
import { getEq as NEAgetEq } from 'fp-ts/ReadonlyNonEmptyArray'
import type { UUID } from 'io-ts-types/lib/UUID'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

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
          env
        )
      ),
    boolean: config => env => new EqType(eqApplyConfig(config)(eqBoolean, env)),
    string: config => env => new EqType(eqApplyConfig(config)(eqString, env)),
    number: config => env => new EqType(eqApplyConfig(config)(eqNumber, env)),
    bigint: config => env => new EqType<bigint>(eqApplyConfig(config)(eqStrict, env)),
    stringLiteral: (k, config) => env => new EqType<typeof k>(eqApplyConfig(config)(eqString, env)),
    tag: (k, config) => env => new EqType<typeof k>(eqApplyConfig(config)(eqString, env)),
    keysOf: (keys, config) => env => new EqType<keyof typeof keys>(eqApplyConfig(config)(eqStrict, env)),
    nullable: (getType, config) => env => new EqType(eqApplyConfig(config)(OgetEq(getType(env).eq), env)),
    mutable: (getType, config) => env => new EqType(eqApplyConfig(config)(getType(env).eq, env)),
    array: (getType, config) => env => new EqType(eqApplyConfig(config)(AgetEq(getType(env).eq), env)),
    nonEmptyArray: (getType, config) => env => new EqType(eqApplyConfig(config)(NEAgetEq(getType(env).eq), env)),
    uuid: config => env => new EqType<UUID>(eqApplyConfig(config)(eqString, env)),
    either: (e, a, config) => env => new EqType(eqApplyConfig(config)(EgetEq(e(env).eq, a(env).eq), env)),
    option: (a, config) => env => new EqType(eqApplyConfig(config)(OgetEq(a(env).eq), env))
  })
)
