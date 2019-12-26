import { BuilderURI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraSet1 } from '../../algebras/set'

export const builderSetInterpreter: ModelAlgebraSet1<BuilderURI> = {
  set: (builderType, _ord) => makeBuilder<Set<BuilderValue<typeof builderType>>>()
}
