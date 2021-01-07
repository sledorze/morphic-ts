import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    refined: (getArb, ref, _name, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(getArb(env).arb.filter(ref), env, {}))
  })
)
