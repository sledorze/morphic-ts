import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { ShowType, ShowURI } from '..'

/**
 *  @since 0.0.1
 */
export const showPrimitiveInterpreter: ModelAlgebraPrimitive1<ShowURI> = {
  _F: ShowURI,
  date: _ => new ShowType({ show: (date: Date) => date.toISOString() }),
  boolean: _ => new ShowType(showBoolean),
  string: _ => new ShowType(showString),
  number: _ => new ShowType(showNumber),
  bigint: _ => new ShowType({ show: a => JSON.stringify(a) }),
  stringLiteral: <T extends string>(_: T) => new ShowType<T>(showString),
  keysOf: _keys => new ShowType(showString as Show<any>),
  nullable: ({ show }) => new ShowType(getShow(show)),
  array: ({ show }) => new ShowType(getShowA(show))
}
