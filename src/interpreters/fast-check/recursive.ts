import { FastCheckType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import { memo } from '../../utils'
import * as fc from 'fast-check'

export const fastCheckRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: f => {
    type FA = ReturnType<typeof f>
    const get = memo(() => f(res))
    const res: FA = new FastCheckType(() => fc.constant(null).chain(_ => get().arb()))
    return res
  }
}
