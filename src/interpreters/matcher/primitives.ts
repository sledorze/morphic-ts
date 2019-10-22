import * as options from 'fp-ts/lib/Option'
import { URI, makeMatcher, MatcherValue } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'

export const matcherPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: makeMatcher<Date>(),
  boolean: makeMatcher<boolean>(),
  string: makeMatcher<string>(),
  number: makeMatcher<number>(),
  stringLiteral: <T extends string>(_: T) => makeMatcher<T>(),
  keysOf: _keys => makeMatcher<keyof typeof _keys>(),
  nullable: matcherType => makeMatcher<options.Option<MatcherValue<typeof matcherType>>>(),
  array: matcherType => makeMatcher<MatcherValue<typeof matcherType>[]>()
}
