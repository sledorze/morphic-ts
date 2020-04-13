import { option, array } from 'fp-ts'
import { eq, eqNumber, eqString, eqBoolean, eqStrict } from 'fp-ts/lib/Eq'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqPrimitiveInterpreter: ModelAlgebraPrimitive1<EqURI> = {
  _F: EqURI,
  date: () => _env => new EqType(eq.contramap(eqNumber, (date: Date) => date.getTime())),
  dateCfg: _ => _env => new EqType(eq.contramap(eqNumber, (date: Date) => date.getTime())), // TODO: add customize
  boolean: () => _env => new EqType(eqBoolean),
  booleanCfg: _ => _env => new EqType(eqBoolean), // TODO: add customize
  string: () => _env => new EqType(eqString),
  stringCfg: _ => _env => new EqType(eqString), // TODO: add customize
  number: () => _env => new EqType(eqNumber),
  numberCfg: _ => _env => new EqType(eqNumber), // TODO: add customize
  bigint: () => _env => new EqType<bigint>(eqStrict),
  bigintCfg: _ => _env => new EqType<bigint>(eqStrict), // TODO: add customize
  stringLiteral: k => _env => new EqType<typeof k>(eqString),
  stringLiteralCfg: k => _config => _env => new EqType<typeof k>(eqString), // TODO: add customize
  keysOf: keys => _env => new EqType<keyof typeof keys>(eqStrict),
  keysOfCfg: keys => _config => _env => new EqType<keyof typeof keys>(eqStrict), // TODO: add customize
  nullable: getType => env => new EqType(option.getEq(getType(env).eq)),
  nullableCfg: getType => _config => env => new EqType(option.getEq(getType(env).eq)), // TODO: add customize
  array: getType => env => new EqType(array.getEq(getType(env).eq)),
  arrayCfg: getType => _config => env => new EqType(array.getEq(getType(env).eq)) // TODO: add customize
}
