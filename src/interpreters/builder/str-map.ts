import { BuilderURI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'

export const builderStrMapInterpreter: ModelAlgebraStrMap1<BuilderURI> = {
  strMap: codomain => makeBuilder<Record<string, BuilderValue<typeof codomain>>>()
}
