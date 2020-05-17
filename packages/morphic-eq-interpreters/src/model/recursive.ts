import { EqType, EqURI } from '../hkt'
import { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'
import { AnyEnv } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export const eqRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive1<EqURI, Env> => ({
    _F: EqURI,
    recursive: a => {
      const getA = memo(() => a(res))
      const res: ReturnType<typeof a> = env => {
        const get = memo(() => getA()(env))
        return new EqType({ equals: (a, b) => get().eq.equals(a, b) })
      }
      return res
    }
  })
)
