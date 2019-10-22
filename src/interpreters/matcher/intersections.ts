import { MatcherType, URI, makeMatcher } from '.'
import { ModelAlgebraIntersection1 } from '../../algebras/intersections'

export const matcherIntersectionInterpreter: ModelAlgebraIntersection1<URI> = {
  intersection: <A>(_builders: MatcherType<any>[]): MatcherType<A> => makeMatcher()
}
