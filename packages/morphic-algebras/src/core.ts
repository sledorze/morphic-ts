import type { URIS, URIS2 } from '@morphic-ts/common/lib/HKT'
import type { Algebra as AlgAlgebra, Algebra1 as AlgAlgebra1, Algebra2 as AlgAlgebra2, AlgebraURIS } from './hkt'

import type { UnionToIntersection } from '@morphic-ts/common/lib/core'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export type GetAlgebra<A extends AlgebraURIS> = A

/**
 *  @since 0.0.1
 */
export type Algebra<AllAlgebra extends AlgebraURIS, Interp, Env> = UnionToIntersection<
  AlgAlgebra<Interp, Env>[AllAlgebra]
>

/**
 *  @since 0.0.1
 */
export type Algebra1<AllAlgebra extends AlgebraURIS, Interp extends URIS, Env extends AnyEnv> = UnionToIntersection<
  AlgAlgebra1<Interp, Env>[AllAlgebra]
>

/**
 *  @since 0.0.1
 */
export type Algebra2<AllAlgebra extends AlgebraURIS, Interp extends URIS2, Env extends AnyEnv> = UnionToIntersection<
  AlgAlgebra2<Interp, Env>[AllAlgebra]
>
