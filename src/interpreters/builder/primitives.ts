import { BuilderURI, makeBuilder } from '.'
import { ModelAlgebraPrimitive1 } from '../../algebras/primitives'

export const builderPrimitiveInterpreter: ModelAlgebraPrimitive1<BuilderURI> = {
  date: _ => makeBuilder(),
  boolean: _ => makeBuilder(),
  string: _ => makeBuilder(),
  number: _ => makeBuilder(),
  stringLiteral: <T extends string>(_: T) => makeBuilder<T>(),
  keysOf: _keys => makeBuilder(),
  nullable: _builderType => makeBuilder(),
  array: _builderType => makeBuilder()
}
