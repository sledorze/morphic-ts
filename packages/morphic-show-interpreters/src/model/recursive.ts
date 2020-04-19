import { ShowType, ShowURI } from '../hkt'
import { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showRecursiveInterpreter: ModelAlgebraRecursive1<ShowURI> = {
  _F: ShowURI,
  recursive: a => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = env => new ShowType({ show: a => get()(env).show.show(a) })
    return res
  }
}
