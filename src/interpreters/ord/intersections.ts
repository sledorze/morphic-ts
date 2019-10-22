import { getSemigroup, Ord } from 'fp-ts/lib/Ord'
import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { OrdType, URI } from '.'

const equalsOrd = <T>(): Ord<T> => ({
  equals: (_a: T, _b: T) => true,
  compare: (_a: T, _b: T) => 0
})

export const ordIntersectionInterpreter: ModelAlgebraIntersection1<URI> = {
  intersection: <A>(types: OrdType<A>[]) => {
    const { concat } = getSemigroup<A>()
    const empty = equalsOrd<A>()
    return new OrdType<A>(types.map(t => t.ord).reduce(concat, empty))
  }
}
