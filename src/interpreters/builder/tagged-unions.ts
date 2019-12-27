import { BuilderURI, makeBuilder } from '.'
import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'

export const builderTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<BuilderURI> = {
  taggedUnion: (_tag, _types) => makeBuilder()
}
