import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { monoidAll, fold } from 'fp-ts/lib/Monoid'
import { EqType, URI } from '.'

export const eqIntersectionInterpreter: ModelAlgebraIntersection1<URI> = {
  intersection: <A>(types: EqType<A>[]) => {
    const equals = types.map(({ eq }) => eq.equals)
    return new EqType<A>({
      equals: (a: A, b: A) => fold(monoidAll)(equals.map(eq => eq(a, b)))
    })
  }
}
