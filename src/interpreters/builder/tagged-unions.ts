import { URI, makeBuilder } from '.'
import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'

export const builderTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (_tag, _types) => makeBuilder()
}
