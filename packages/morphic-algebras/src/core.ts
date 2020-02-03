import { URIS, URIS2 } from '@sledorze/morphic-common/lib/HKT'
import { Algebra as AlgAlgebra, Algebra1 as AlgAlgebra1, Algebra2 as AlgAlgebra2, AlgebraURIS } from './hkt'

import { UnionToIntersection } from '@sledorze/morphic-common/lib/core'

export type GetAlgebra<A extends AlgebraURIS> = A

export type Algebra<AllAlgebra extends AlgebraURIS, Interp> = UnionToIntersection<AlgAlgebra<Interp>[AllAlgebra]>
export type Algebra1<AllAlgebra extends AlgebraURIS, Interp extends URIS> = UnionToIntersection<
  AlgAlgebra1<Interp>[AllAlgebra]
>
export type Algebra2<AllAlgebra extends AlgebraURIS, Interp extends URIS2> = UnionToIntersection<
  AlgAlgebra2<Interp>[AllAlgebra]
>
