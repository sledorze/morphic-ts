import { option, array } from 'fp-ts'
import { eq, eqNumber, eqString, eqBoolean, eqStrict } from 'fp-ts/lib/Eq'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { EqType, EqURI } from '../hkt'
import { eqApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const eqPrimitiveInterpreter: ModelAlgebraPrimitive1<EqURI> = {
  _F: EqURI,
  date: () => _env => new EqType(eq.contramap(eqNumber, (date: Date) => date.getTime())),
  dateCfg: config => env =>
    new EqType(
      eqApplyConfig(config)(
        eq.contramap(eqNumber, (date: Date) => date.getTime()),
        env
      )
    ),
  boolean: () => _env => new EqType(eqBoolean),
  booleanCfg: config => env => new EqType(eqApplyConfig(config)(eqBoolean, env)),
  string: () => _env => new EqType(eqString),
  stringCfg: config => env => new EqType(eqApplyConfig(config)(eqString, env)),
  number: () => _env => new EqType(eqNumber),
  numberCfg: config => env => new EqType(eqApplyConfig(config)(eqNumber, env)),
  bigint: () => _env => new EqType<bigint>(eqStrict),
  bigintCfg: config => env => new EqType<bigint>(eqApplyConfig(config)(eqStrict, env)),
  stringLiteral: k => _env => new EqType<typeof k>(eqString),
  stringLiteralCfg: k => config => env => new EqType<typeof k>(eqApplyConfig(config)(eqString, env)),
  keysOf: keys => _env => new EqType<keyof typeof keys>(eqStrict),
  keysOfCfg: keys => config => env => new EqType<keyof typeof keys>(eqApplyConfig(config)(eqStrict, env)),
  nullable: getType => env => new EqType(option.getEq(getType(env).eq)),
  nullableCfg: getType => config => env => new EqType(eqApplyConfig(config)(option.getEq(getType(env).eq), env)),
  array: getType => env => new EqType(array.getEq(getType(env).eq)),
  arrayCfg: getType => config => env => new EqType(eqApplyConfig(config)(array.getEq(getType(env).eq), env))
}
