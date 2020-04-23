import { set } from 'fast-check'
import { FastCheckType, FastCheckURI } from '../hkt'
import { fromArray } from 'fp-ts/lib/Set'
import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const fastCheckSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    set: (a, ord) => env => new FastCheckType(set(a(env).arb).map(fromArray(ord)))
  })
)
