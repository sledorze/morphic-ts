import { MatcherType, URI, makeMatcher } from '.'
import { ModelAlgebraUnions1 } from '../../algebras/unions'

export const matcherUnionInterpreter: ModelAlgebraUnions1<URI> = {
  union: <A>(_builders: MatcherType<any>[]): MatcherType<A> => makeMatcher()
}
