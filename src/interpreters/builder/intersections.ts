import { BuilderType, URI, makeBuilder } from '.'
import { ModelAlgebraIntersection1 } from '../../algebras/intersections'

export const builderIntersectionInterpreter: ModelAlgebraIntersection1<URI> = {
  intersection: <A>(_builders: BuilderType<any>[]): BuilderType<A> => makeBuilder()
}
