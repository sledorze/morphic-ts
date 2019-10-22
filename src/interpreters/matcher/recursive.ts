import { URI, makeMatcher, MatcherValue } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const matcherRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: a => makeMatcher<MatcherValue<ReturnType<typeof a>>>()
}
