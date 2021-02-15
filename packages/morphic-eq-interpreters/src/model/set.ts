import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { pipe } from 'fp-ts/function'
import type { Eq } from 'fp-ts/lib/Eq'
import { getEq as SgetEq } from 'fp-ts/ReadonlySet'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/set' {
  /**
   *  @since 0.0.1
   */
  export interface SetConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const eqSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<EqURI, Env> => ({
    _F: EqURI,
    set: (getEq, _ord, config) => env =>
      pipe(getEq(env).eq, eq => new EqType(eqApplyConfig(config)(SgetEq(eq), env, { eq })))
  })
)
