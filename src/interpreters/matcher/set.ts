import { URI, makeMatcher, MatcherValue } from '.'
import { ModelAlgebraSet1 } from '../../algebras/set'

export const matcherSetInterpreter: ModelAlgebraSet1<URI> = {
  set: (matcherType, _ord) => makeMatcher<Set<MatcherValue<typeof matcherType>>>()
}
