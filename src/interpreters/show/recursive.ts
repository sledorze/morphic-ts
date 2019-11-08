import { ShowType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import { memo } from '../../utils'

export const showRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: a => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = new ShowType({ show: a => get().show.show(a) })
    return res
  }
}
