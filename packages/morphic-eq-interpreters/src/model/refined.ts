import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { EqURI, EqType } from '../hkt'
import { eqApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<EqURI, Env> => ({
    _F: EqURI,
    refined: (getEq, _ref, _name, config) => env => new EqType(eqApplyConfig(config)(getEq(env).eq, env))
  })
)
