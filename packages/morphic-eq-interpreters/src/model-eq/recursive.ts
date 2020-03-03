import { EqType, EqURI } from '../hkt'
import { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqRecursiveInterpreter: ModelAlgebraRecursive1<EqURI> = {
  _F: EqURI,
  recursive: a => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = new EqType({ equals: (a, b) => get().eq.equals(a, b) })
    return res
  }
}
