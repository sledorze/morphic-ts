import { URIS, Kind, URIS2, Kind2, HKT2 } from '../../src/HKT'
import { ModelAlgebraPrimitive1, ModelAlgebraPrimitive, ModelAlgebraPrimitive2 } from '../../src/algebras/primitives'
import {
  ModelAlgebraIntersection1,
  ModelAlgebraIntersection,
  ModelAlgebraIntersection2
} from '../../src/algebras/intersections'
import {
  ModelAlgebraTaggedUnions1,
  ModelAlgebraTaggedUnions,
  ModelAlgebraTaggedUnions2
} from '../../src/algebras/tagged-unions'
import { ModelAlgebraObject1, ModelAlgebraObject, ModelAlgebraObject2 } from '../../src/algebras/object'
import { ModelAlgebraStrMap1, ModelAlgebraStrMap, ModelAlgebraStrMap2 } from '../../src/algebras/str-map'
import { ModelAlgebraSet1, ModelAlgebraSet, ModelAlgebraSet2 } from '../../src/algebras/set'
import { ModelAlgebraRecursive1, ModelAlgebraRecursive, ModelAlgebraRecursive2 } from '../../src/algebras/recursive'
import { InterpreterFor, cacheUnaryFunction, InterpreterFor2 } from '../../src/core'

export interface ModelAlgebra<F>
  extends ModelAlgebraPrimitive<F>,
    ModelAlgebraIntersection<F>,
    ModelAlgebraTaggedUnions<F>,
    ModelAlgebraObject<F>,
    ModelAlgebraStrMap<F>,
    ModelAlgebraSet<F>,
    ModelAlgebraRecursive<F> {}

export interface ModelAlgebra1<F extends URIS>
  extends ModelAlgebraPrimitive1<F>,
    ModelAlgebraIntersection1<F>,
    ModelAlgebraTaggedUnions1<F>,
    ModelAlgebraObject1<F>,
    ModelAlgebraStrMap1<F>,
    ModelAlgebraSet1<F>,
    ModelAlgebraRecursive1<F>,
    InterpreterFor<F> {}

export interface ModelAlgebra2<F extends URIS2>
  extends ModelAlgebraPrimitive2<F>,
    ModelAlgebraIntersection2<F>,
    ModelAlgebraTaggedUnions2<F>,
    ModelAlgebraObject2<F>,
    ModelAlgebraStrMap2<F>,
    ModelAlgebraSet2<F>,
    ModelAlgebraRecursive2<F>,
    InterpreterFor2<F> {}

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
