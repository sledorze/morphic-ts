import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive } from '@morphic-ts/model-algebras/lib/recursive'
import { constant } from 'fast-check'

import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    recursive: f => {
      type FA = ReturnType<typeof f>
      const get = memo(() => f(res))
      const res: FA = env => new FastCheckType(constant(null).chain(_ => get()(env).arb))
      return res
    }
  })
)
