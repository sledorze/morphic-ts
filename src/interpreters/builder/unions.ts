import { BuilderType, BuilderURI, makeBuilder } from '.'
import { ModelAlgebraUnions1 } from '../../algebras/unions'

export const builderUnionInterpreter: ModelAlgebraUnions1<BuilderURI> = {
  union: <A>(_builders: BuilderType<any>[]): BuilderType<A> => makeBuilder()
}
