import { option, array } from 'fp-ts'
import { eq, eqNumber, eqString, strictEqual, eqBoolean } from 'fp-ts/lib/Eq'
import { ModelAlgebraPrimitive1 } from '@sledorze/morphic-model-algebras/lib/primitives'
import { EqType, EqURI } from '..'

/**
 *  @since 0.0.1
 */
export const eqPrimitiveInterpreter: ModelAlgebraPrimitive1<EqURI> = {
  _F: EqURI,
  date: _ => new EqType(eq.contramap(eqNumber, (date: Date) => date.getTime())),
  boolean: _ => new EqType(eqBoolean),
  string: _ => new EqType(eqString),
  number: _ => new EqType(eqNumber),
  bigint: _ => new EqType({ equals: strictEqual }),
  stringLiteral: <T extends string>(_: T) => new EqType<T>(eqString),
  keysOf: _keys => new EqType({ equals: strictEqual }),
  nullable: ({ eq }) => new EqType(option.getEq(eq)),
  array: ({ eq }) => new EqType(array.getEq(eq))
}
