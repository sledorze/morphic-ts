import { URI, makeMatcher, MatcherValue } from '.'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'

export const matcherStrMapInterpreter: ModelAlgebraStrMap1<URI> = {
  strMap: codomain => makeMatcher<Record<string, MatcherValue<typeof codomain>>>()
}
