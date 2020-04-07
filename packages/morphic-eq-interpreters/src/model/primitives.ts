import { option, array } from 'fp-ts'
import { eq, eqNumber, eqString, eqBoolean, eqStrict } from 'fp-ts/lib/Eq'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqPrimitiveInterpreter: ModelAlgebraPrimitive1<EqURI> = {
  _F: EqURI,
  date: _ => _env => new EqType(eq.contramap(eqNumber, (date: Date) => date.getTime())),
  boolean: _ => _env => new EqType(eqBoolean),
  string: _ => _env => new EqType(eqString),
  number: _ => _env => new EqType(eqNumber),
  bigint: _ => _env => new EqType<bigint>(eqStrict),
  stringLiteral: k => _env => new EqType<typeof k>(eqString),
  keysOf: _keys => _env => new EqType<keyof typeof _keys>(eqStrict),
  nullable: getType => env => new EqType(option.getEq(getType(env).eq)),
  array: getType => env => new EqType(array.getEq(getType(env).eq))
}
