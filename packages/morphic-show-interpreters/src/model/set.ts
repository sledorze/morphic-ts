import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { ShowType, ShowURI } from '../hkt'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet1<ShowURI, Env> => ({
    _F: ShowURI,
    set: getShow => env => new ShowType(set.getShow(getShow(env).show))
  })
)
