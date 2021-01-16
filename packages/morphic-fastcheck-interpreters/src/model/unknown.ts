import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import type { Arbitrary } from 'fast-check'
import { anything } from 'fast-check'
import { pipe } from 'fp-ts/function'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/unknown' {
  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig {
    [FastCheckURI]: {
      arb: Arbitrary<unknown>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    unknown: configs => env =>
      pipe(anything(), arb => new FastCheckType(fastCheckApplyConfig(configs)(arb, env, { arb })))
  })
)
