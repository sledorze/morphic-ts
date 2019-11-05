import { Kind, URIS, URIS2, Kind2, HKT2 } from '../../src/HKT'
import { cacheUnaryFunction, GetAlgebra, Algebra, Algebra1, Algebra2 } from '../../src/core'

type AllAlgebra = GetAlgebra<
  'Primitive' | 'Intersection' | 'Object' | 'Recursive' | 'Set' | 'StrMap' | 'TaggedUnions' | 'Unions'
>

export interface ModelAlgebra<F> extends Algebra<AllAlgebra, F> {}
export interface ModelAlgebra1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface ModelAlgebra2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export interface Program<E, A> {
  <G extends URIS2>(a: ModelAlgebra2<G>): Kind2<G, E, A>
  <G extends URIS>(a: ModelAlgebra1<G>): Kind<G, A>
  <G>(a: ModelAlgebra<G>): HKT2<G, E, A>
}
export type TypeOf<P extends Program<any, any>> = P extends Program<any, infer A>
  ? A
  : 'Cannot infer TypeOf' & { error: never }

export const defineAs = <L, A>(F: <F>(a: ModelAlgebra<F>) => HKT2<F, L, A>): Program<L, A> => cacheUnaryFunction(F)
export const defineAsL = <L>() => <A>(F: <F>(a: ModelAlgebra<F>) => HKT2<F, L, A>): Program<L, A> =>
  cacheUnaryFunction(F)
export const defineAsUnknown = defineAsL<unknown>()
