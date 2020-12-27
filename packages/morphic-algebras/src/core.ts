import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { UnionToIntersection } from '@morphic-ts/common/lib/core'
import type { URIS } from '@morphic-ts/common/lib/HKT'

import type { Algebra as AlgAlgebra, AlgebraURIS } from './hkt'

/**
 *  @since 0.0.1
 */
export type GetAlgebra<A extends AlgebraURIS> = A

/**
 *  @since 0.0.1
 */
export type Algebra<AllAlgebra extends AlgebraURIS, Interp extends URIS, Env extends AnyEnv> = UnionToIntersection<
  AlgAlgebra<Interp, Env>[AllAlgebra]
>
