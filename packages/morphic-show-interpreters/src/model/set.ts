import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { getShow as SgetShow } from 'fp-ts/Set'

import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from './../config'

/**
 *  @since 0.0.1
 */
export const showSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<ShowURI, Env> => ({
    _F: ShowURI,
    set: (getShow, _ord, config) => env => new ShowType(showApplyConfig(config)(SgetShow(getShow(env).show), env, {}))
  })
)
