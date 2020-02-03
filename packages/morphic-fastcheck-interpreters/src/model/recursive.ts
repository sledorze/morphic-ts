import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraRecursive1 } from '@sledorze/morphic-model-algebras/lib/recursive'
import { memo } from '@sledorze/morphic-common/lib/utils'
import { constant } from 'fast-check'

export const fastCheckRecursiveInterpreter: ModelAlgebraRecursive1<FastCheckURI> = {
  _F: FastCheckURI,
  recursive: f => {
    type FA = ReturnType<typeof f>
    const get = memo(() => f(res))
    const res: FA = new FastCheckType(constant(null).chain(_ => get().arb))
    return res
  }
}
