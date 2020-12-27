import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive } from '@morphic-ts/model-algebras/lib/recursive'

import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive<EqURI, Env> => ({
    _F: EqURI,
    recursive: a => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = env => new EqType({ equals: (a, b) => get()(env).eq.equals(a, b) })
      return res
    }
  })
)
