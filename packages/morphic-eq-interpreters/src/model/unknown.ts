import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import { circularDeepEqual } from 'fast-equals'
import type { Eq } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/unknown' {
  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig {
    [EqURI]: {
      eq: Eq<unknown>
    }
  }
}
/**
 *  @since 0.0.1
 */
export interface CustomizeUnknown<RC> {
  compare: 'default-circular' | 'default-non-circular' | ((env: RC) => Eq<unknown>)
}

/**
 *  @since 0.0.1
 */
export const eqUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<EqURI, Env> => ({
    _F: EqURI,
    unknown: cfg => env => {
      const config = eqApplyConfig(cfg)
      return pipe(
        { equals: circularDeepEqual },
        eq => new EqType(config === undefined ? { equals: circularDeepEqual } : config(eq, env, { eq }))
      )
    }
  })
)
