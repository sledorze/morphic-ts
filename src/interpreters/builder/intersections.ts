import { BuilderType, BuilderURI, makeBuilder } from '.'
import { ModelAlgebraIntersection1 } from '../../algebras/intersections'

export const builderIntersectionInterpreter: ModelAlgebraIntersection1<BuilderURI> = {
  intersection: <A>(_builders: BuilderType<any>[]): BuilderType<A> => makeBuilder()
}
