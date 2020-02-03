import { ShowType, ShowURI } from '..'
import { ModelAlgebraRecursive1 } from '@sledorze/morphic-model-algebras/lib/recursive'
import { memo } from '@sledorze/morphic-common/lib/utils'

export const showRecursiveInterpreter: ModelAlgebraRecursive1<ShowURI> = {
  _F: ShowURI,
  recursive: a => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = new ShowType({ show: a => get().show.show(a) })
    return res
  }
}
