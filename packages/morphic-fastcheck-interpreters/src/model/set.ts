import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import type { Arbitrary } from 'fast-check'
import { set } from 'fast-check'
import { pipe } from 'fp-ts/function'
import { fromArray } from 'fp-ts/Set'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/set' {
  /**
   *  @since 0.0.1
   */
  export interface SetConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    set: (a, ord, config) => env =>
      pipe(
        a(env).arb,
        arb => new FastCheckType(fastCheckApplyConfig(config)(set(arb).map(fromArray(ord)), env, { arb }))
      )
  })
)
