import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { set } from 'fast-check'
import { fromArray } from 'fp-ts/Set'

import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    set: (a, ord) => env => new FastCheckType(set(a(env).arb).map(fromArray(ord)))
  })
)
