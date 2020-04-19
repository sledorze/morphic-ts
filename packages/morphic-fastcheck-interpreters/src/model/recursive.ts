import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'
import { constant } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const fastCheckRecursiveInterpreter: ModelAlgebraRecursive1<FastCheckURI> = {
  _F: FastCheckURI,
  recursive: f => {
    type FA = ReturnType<typeof f>
    const get = memo(() => f(res))
    const res: FA = env => new FastCheckType(constant(null).chain(_ => get()(env).arb))
    return res
  }
}
