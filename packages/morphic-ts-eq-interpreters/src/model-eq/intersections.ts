import { ModelAlgebraIntersection1 } from '@sledorze/morphic-ts-model-algebras/lib/intersections'
import { monoidAll, fold } from 'fp-ts/lib/Monoid'
import { EqType, EqURI } from '..'

export const eqIntersectionInterpreter: ModelAlgebraIntersection1<EqURI> = {
  _F: EqURI,
  intersection: <A>(types: EqType<A>[]) => {
    const equals = types.map(({ eq }) => eq.equals)
    return new EqType<A>({
      equals: (a: A, b: A) => fold(monoidAll)(equals.map(eq => eq(a, b))) // TODO: optimize
    })
  }
}
