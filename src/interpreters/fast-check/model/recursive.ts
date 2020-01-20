import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraRecursive1 } from '../../../model-algebras/recursive'
import { memo } from '../../../common/utils'
import * as fc from 'fast-check'

export const fastCheckRecursiveInterpreter: ModelAlgebraRecursive1<FastCheckURI> = {
  recursive: f => {
    type FA = ReturnType<typeof f>
    const get = memo(() => f(res))
    const res: FA = new FastCheckType(fc.constant(null).chain(_ => get().arb))
    return res
  }
}
