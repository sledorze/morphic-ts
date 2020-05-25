import { EqType, EqURI } from '../hkt'
import type { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export const eqRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive1<EqURI, Env> => ({
    _F: EqURI,
    recursive: a => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = env => new EqType({ equals: (a, b) => get()(env).eq.equals(a, b) })
      return res
    }
  })
)
