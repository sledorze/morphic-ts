import * as options from 'fp-ts/lib/Option'
import { URI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'

export const builderPrimitiveInterpreter: ModelAlgebraPrimitive1<URI> = {
  date: makeBuilder<Date>(),
  boolean: makeBuilder<boolean>(),
  string: makeBuilder<string>(),
  number: makeBuilder<number>(),
  stringLiteral: <T extends string>(_: T) => makeBuilder<T>(),
  keysOf: _keys => makeBuilder<keyof typeof _keys>(),
  nullable: builderType => makeBuilder<options.Option<BuilderValue<typeof builderType>>>(),
  array: builderType => makeBuilder<BuilderValue<typeof builderType>[]>()
}
