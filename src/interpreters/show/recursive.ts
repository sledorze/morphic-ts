import { ShowType, ShowURI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import { memo } from '../../common/utils'

export const showRecursiveInterpreter: ModelAlgebraRecursive1<ShowURI> = {
  recursive: a => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = new ShowType({ show: a => get().show.show(a) })
    return res
  }
}
