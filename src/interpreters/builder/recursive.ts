import { BuilderURI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const builderRecursiveInterpreter: ModelAlgebraRecursive1<BuilderURI> = {
  recursive: a => makeBuilder<BuilderValue<ReturnType<typeof a>>>()
}
