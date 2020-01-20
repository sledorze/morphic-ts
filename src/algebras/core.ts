import { URIS, URIS2 } from '../common/HKT'
import { Algebra as AlgAlgebra, Algebra1 as AlgAlgebra1, Algebra2 as AlgAlgebra2, AlgebraURIS } from './hkt'

import { InterpreterFor, UnionToIntersection } from '../common/core'

export type GetAlgebra<A extends AlgebraURIS> = A

export type Algebra<AllAlgebra extends AlgebraURIS, Interp> = UnionToIntersection<AlgAlgebra<Interp>[AllAlgebra]>
export type Algebra1<AllAlgebra extends AlgebraURIS, Interp extends URIS> = UnionToIntersection<
  AlgAlgebra1<Interp>[AllAlgebra]
> &
  InterpreterFor<Interp>
export type Algebra2<AllAlgebra extends AlgebraURIS, Interp extends URIS2> = UnionToIntersection<
  AlgAlgebra2<Interp>[AllAlgebra]
> &
  InterpreterFor<Interp>
