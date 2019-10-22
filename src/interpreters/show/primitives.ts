import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { ShowType, URI } from '.'

export const showPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: new ShowType({ show: (date: Date) => date.toISOString() }),
  boolean: new ShowType(showBoolean),
  string: new ShowType(showString),
  number: new ShowType(showNumber),
  stringLiteral: <T extends string>(_: T) => new ShowType<T>(showString),
  keysOf: _keys => new ShowType(showString as Show<any>),
  nullable: ({ show }) => new ShowType(getShow(show)),
  array: ({ show }) => new ShowType(getShowA(show))
}
