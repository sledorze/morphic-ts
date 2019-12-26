import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'
import { ShowType, ShowURI } from '.'

export const showPrimitiveInterpreter: ModelAlgebraPrimitive1<ShowURI> = {
  date: _ => new ShowType({ show: (date: Date) => date.toISOString() }),
  boolean: _ => new ShowType(showBoolean),
  string: _ => new ShowType(showString),
  number: _ => new ShowType(showNumber),
  stringLiteral: <T extends string>(_: T) => new ShowType<T>(showString),
  keysOf: _keys => new ShowType(showString as Show<any>),
  nullable: ({ show }) => new ShowType(getShow(show)),
  array: ({ show }) => new ShowType(getShowA(show))
}
