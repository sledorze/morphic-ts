import { URIS, Kind, URIS2, Kind2 } from '../../src/HKT'
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
import {
  ModelAlgebraCollection1,
  ModelAlgebraCollection,
  ModelAlgebraCollection2
} from '../../src/algebras/collections'
import { ModelAlgebraRecursive1, ModelAlgebraRecursive, ModelAlgebraRecursive2 } from '../../src/algebras/recursive'
import { InterpreterFor, cacheByKey, InterpreterFor2, M } from '../../src/core'

export interface ModelAlgebra
  extends ModelAlgebraPrimitive,
    ModelAlgebraIntersection,
    ModelAlgebraTaggedUnions,
    ModelAlgebraObject,
    ModelAlgebraCollection,
    ModelAlgebraRecursive {}

export interface ModelAlgebra1<F extends URIS>
  extends ModelAlgebraPrimitive1<F>,
    ModelAlgebraIntersection1<F>,
    ModelAlgebraTaggedUnions1<F>,
    ModelAlgebraObject1<F>,
    ModelAlgebraCollection1<F>,
    ModelAlgebraRecursive1<F>,
    InterpreterFor<F> {}

export interface ModelAlgebra2<F extends URIS2>
  extends ModelAlgebraPrimitive2<F>,
    ModelAlgebraIntersection2<F>,
    ModelAlgebraTaggedUnions2<F>,
    ModelAlgebraObject2<F>,
    ModelAlgebraCollection2<F>,
    ModelAlgebraRecursive2<F>,
    InterpreterFor2<F> {}

export interface Program<E, A> {
  <G extends URIS2>(a: ModelAlgebra2<G>): Kind2<G, E, A>
  <G extends URIS>(a: ModelAlgebra1<G>): Kind<G, A>
  <G>(a: ModelAlgebra): M<E, A>
}
export type TypeOfE<P extends Program<any, any>> = P extends Program<infer E, any>
  ? E
  : 'Cannot infer TypeOf' & { error: never }
export type TypeOf<P extends Program<any, any>> = P extends Program<any, infer A>
  ? A
  : 'Cannot infer TypeOf' & { error: never }

export const defineAs = <L, A>(F: (a: ModelAlgebra) => M<L, A>): Program<L, A> => cacheByKey(F as any)
export const defineAsL = <L>() => <A>(F: (a: ModelAlgebra) => M<L, A>): Program<L, A> => cacheByKey(F as any)
export const defineAsUnknown = defineAsL<unknown>()

// import { URIS, Kind } from '../../src/HKT'
// import { ModelAlgebraPrimitive1 } from '../../src/algebras/primitives'
// import { ModelAlgebraIntersection1 } from '../../src/algebras/intersections'
// import { ModelAlgebraTaggedUnions1 } from '../../src/algebras/tagged-unions'
// import { ModelAlgebraObject1 } from '../../src/algebras/object'
// import { ModelAlgebraCollection1 } from '../../src/algebras/collections'
// import { ModelAlgebraRecursive1 } from '../../src/algebras/recursive'
// import { InterpreterFor, cacheByKey } from '../../src/core'

// export interface ModelAlgebra<F extends URIS>
//   extends ModelAlgebraPrimitive1<F>,
//     ModelAlgebraIntersection1<F>,
//     ModelAlgebraTaggedUnions1<F>,
//     ModelAlgebraObject1<F>,
//     ModelAlgebraCollection1<F>,
//     ModelAlgebraRecursive1<F>,
//     InterpreterFor<F> {}

// export type Program<A> = <F extends URIS>(F: ModelAlgebra<F>) => Kind<F, A>
// export const defineAs = <A>(program: Program<A>): typeof program => cacheByKey(program)
