import { set } from 'fp-ts'
import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { EqType, EqURI } from '../hkt'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet1<EqURI, Env> => ({
    _F: EqURI,
    set: getEq => env => new EqType(set.getEq(getEq(env).eq))
  })
)
