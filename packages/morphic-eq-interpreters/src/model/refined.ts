import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<EqURI, Env> => ({
    _F: EqURI,
    refined: (getEq, _ref, _name, config) => env => new EqType(eqApplyConfig(config)(getEq(env).eq, env, {}))
  })
)
