import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { OrdURI, OrdType } from '../hkt'
import { ordApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ordRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<OrdURI, Env> => ({
    _F: OrdURI,
    refined: (getOrd, _ref, _name, config) => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env))
  })
)
