import { URI, makeMatcher, MatcherValue } from '.'
import { ModelAlgebraCollection1 } from '../../algebras/collections'

export const matcherCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: (matcherType, _ord) => makeMatcher<Set<MatcherValue<typeof matcherType>>>(),
  strMap: codomain => makeMatcher<Record<string, MatcherValue<typeof codomain>>>()
}
