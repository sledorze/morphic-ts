import { URI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'

export const builderStrMapInterpreter: ModelAlgebraStrMap1<URI> = {
  strMap: codomain => makeBuilder<Record<string, BuilderValue<typeof codomain>>>()
}
