import { URI, makeMatcher } from '.'
import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'

export const matcherTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (_tag, _types) => makeMatcher()
}
