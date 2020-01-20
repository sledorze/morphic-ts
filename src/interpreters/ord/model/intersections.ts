import { getSemigroup, Ord } from 'fp-ts/lib/Ord'
import { ModelAlgebraIntersection1 } from '../../../model-algebras/intersections'
import { OrdType, OrdURI } from '..'

const equalsOrd = <T>(): Ord<T> => ({
  equals: (_a: T, _b: T) => true,
  compare: (_a: T, _b: T) => 0
})

export const ordIntersectionInterpreter: ModelAlgebraIntersection1<OrdURI> = {
  intersection: <A>(types: OrdType<A>[]) => {
    const { concat } = getSemigroup<A>()
    const empty = equalsOrd<A>()
    return new OrdType<A>(types.map(t => t.ord).reduce(concat, empty))
  }
}
