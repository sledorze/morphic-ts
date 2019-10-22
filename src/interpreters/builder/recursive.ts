import { URI, makeBuilder, BuilderValue } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const builderRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: a => makeBuilder<BuilderValue<ReturnType<typeof a>>>()
}
