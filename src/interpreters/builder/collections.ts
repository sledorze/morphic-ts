import { URI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraCollection1 } from '../../algebras/collections'

export const builderCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: (builderType, _ord) => makeBuilder<Set<BuilderValue<typeof builderType>>>(),
  strMap: codomain => makeBuilder<Record<string, BuilderValue<typeof codomain>>>()
}
