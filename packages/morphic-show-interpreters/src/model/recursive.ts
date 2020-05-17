import { ShowType, ShowURI } from '../hkt'
import { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'
import { AnyEnv } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export const showRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive1<ShowURI, Env> => ({
    _F: ShowURI,
    recursive: a => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = env => {
        const getShow = memo(() => get()(env).show.show)
        return new ShowType({ show: a => getShow()(a) })
      }
      return res
    }
  })
)
