import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { RecycleURI, RecycleType } from '../hkt'
import { recycleApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const recycleRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<RecycleURI, Env> => ({
    _F: RecycleURI,
    refined: (getRecycle, _ref, _name, config) => env =>
      new RecycleType(recycleApplyConfig(config)(getRecycle(env).recycle as any, env))
  })
)
