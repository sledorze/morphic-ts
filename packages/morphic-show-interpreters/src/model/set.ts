import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { getShow as SgetShow } from 'fp-ts/Set'

import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet1<ShowURI, Env> => ({
    _F: ShowURI,
    set: getShow => env => new ShowType(SgetShow(getShow(env).show))
  })
)
