import { URIS, URIS2 } from '@morphic-ts/common/lib/HKT'
import { Algebra as AlgAlgebra, Algebra1 as AlgAlgebra1, Algebra2 as AlgAlgebra2, AlgebraURIS } from './hkt'

import { UnionToIntersection } from '@morphic-ts/common/lib/core'

/**
 *  @since 0.0.1
 */
export type GetAlgebra<A extends AlgebraURIS> = A

/**
 *  @since 0.0.1
 */
export type Algebra<AllAlgebra extends AlgebraURIS, Interp> = UnionToIntersection<AlgAlgebra<Interp>[AllAlgebra]>

/**
 *  @since 0.0.1
 */
export type Algebra1<AllAlgebra extends AlgebraURIS, Interp extends URIS> = UnionToIntersection<
  AlgAlgebra1<Interp>[AllAlgebra]
>

/**
 *  @since 0.0.1
 */
export type Algebra2<AllAlgebra extends AlgebraURIS, Interp extends URIS2> = UnionToIntersection<
  AlgAlgebra2<Interp>[AllAlgebra]
>
