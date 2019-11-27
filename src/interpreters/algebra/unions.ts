import { BuilderType, URI, makeBuilder } from '.'
import { ModelAlgebraUnions1 } from '../../algebras/unions'

export const builderUnionInterpreter: ModelAlgebraUnions1<URI> = {
  union: <A>(_builders: BuilderType<any>[]): BuilderType<A> => makeBuilder()
}
