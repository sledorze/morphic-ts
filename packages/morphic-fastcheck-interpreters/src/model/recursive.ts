import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive } from '@morphic-ts/model-algebras/lib/recursive'
import { constant } from 'fast-check'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    recursive: (f, config) => {
      type FA = ReturnType<typeof f>
      const get = memo(() => f(res))
      const res: FA = env =>
        new FastCheckType(
          fastCheckApplyConfig(config?.conf)(
            constant(null).chain(_ => get()(env).arb),
            env,
            {}
          )
        )
      return res
    }
  })
)
