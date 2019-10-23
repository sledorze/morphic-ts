import { Kind, URIS, URIS2, Kind2 } from '../../src/HKT'
import { ModelAlgebraPrimitive1, ModelAlgebraPrimitive2, ModelAlgebraPrimitive } from '../../src/algebras/primitives'
import {
  ModelAlgebraIntersection1,
  ModelAlgebraIntersection2,
  ModelAlgebraIntersection
} from '../../src/algebras/intersections'
import { ModelAlgebraObject1, ModelAlgebraObject2, ModelAlgebraObject } from '../../src/algebras/object'
import { ModelAlgebraUnions1, ModelAlgebraUnions2, ModelAlgebraUnions } from '../../src/algebras/unions'
import {
  ModelAlgebraTaggedUnions1,
  ModelAlgebraTaggedUnions2,
  ModelAlgebraTaggedUnions
} from '../../src/algebras/tagged-unions'
import { ModelAlgebraRecursive1, ModelAlgebraRecursive2, ModelAlgebraRecursive } from '../../src/algebras/recursive'
import { ModelAlgebraStrMap1, ModelAlgebraStrMap, ModelAlgebraStrMap2 } from '../../src/algebras/str-map'
import { ModelAlgebraSet1, ModelAlgebraSet, ModelAlgebraSet2 } from '../../src/algebras/set'
import { InterpreterFor, cacheByKey, InterpreterFor2, M } from '../../src/core'

export interface ModelAlgebra
  extends ModelAlgebraPrimitive,
    ModelAlgebraObject,
    ModelAlgebraStrMap,
    ModelAlgebraSet,
    ModelAlgebraIntersection,
    ModelAlgebraRecursive,
    ModelAlgebraTaggedUnions,
    ModelAlgebraUnions {}

export interface ModelAlgebra1<F extends URIS>
  extends ModelAlgebraPrimitive1<F>,
    ModelAlgebraObject1<F>,
    ModelAlgebraStrMap1<F>,
    ModelAlgebraSet1<F>,
    ModelAlgebraIntersection1<F>,
    ModelAlgebraRecursive1<F>,
    ModelAlgebraTaggedUnions1<F>,
    ModelAlgebraUnions1<F>,
    InterpreterFor<F> {}

export interface ModelAlgebra2<F extends URIS2>
  extends ModelAlgebraPrimitive2<F>,
    ModelAlgebraObject2<F>,
    ModelAlgebraStrMap2<F>,
    ModelAlgebraSet2<F>,
    ModelAlgebraIntersection2<F>,
    ModelAlgebraRecursive2<F>,
    ModelAlgebraTaggedUnions2<F>,
    ModelAlgebraUnions2<F>,
    InterpreterFor2<F> {}

export interface Program<E, A> {
  <G extends URIS2>(a: ModelAlgebra2<G>): Kind2<G, E, A>
  <G extends URIS>(a: ModelAlgebra1<G>): Kind<G, A>
  <G>(a: ModelAlgebra): M<E, A>
}
export type TypeOf<P extends Program<any, any>> = P extends Program<any, infer A>
  ? A
  : 'Cannot infer TypeOf' & { error: never }

export const defineAs = <L, A>(F: (a: ModelAlgebra) => M<L, A>): Program<L, A> => cacheByKey(F as any)
export const defineAsL = <L>() => <A>(F: (a: ModelAlgebra) => M<L, A>): Program<L, A> => cacheByKey(F as any)
export const defineAsUnknown = defineAsL<unknown>()
