import { option, array } from 'fp-ts'
import { eq, eqNumber, eqString, strictEqual, eqBoolean } from 'fp-ts/lib/Eq'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { EqType, URI } from '.'

export const eqPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new EqType(eq.contramap(eqNumber, (date: Date) => date.getTime())),
  boolean: new EqType(eqBoolean),
  string: new EqType(eqString),
  number: new EqType(eqNumber),
  stringLiteral: <T extends string>(_: T) => new EqType<T>(eqString),
  keysOf: _keys => new EqType({ equals: strictEqual }),
  nullable: ({ eq }) => new EqType(option.getEq(eq)),
  array: ({ eq }) => new EqType(array.getEq(eq))
}
