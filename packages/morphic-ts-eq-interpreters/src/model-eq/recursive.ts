import { EqType, EqURI } from '..'
import { ModelAlgebraRecursive1 } from '@sledorze/morphic-ts-model-algebras/lib/recursive'
import { memo } from '@sledorze/morphic-ts-common/lib/utils'

export const eqRecursiveInterpreter: ModelAlgebraRecursive1<EqURI> = {
  _F: EqURI,
  recursive: a => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = new EqType({ equals: (a, b) => get().eq.equals(a, b) })
    return res
  }
}
