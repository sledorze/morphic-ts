import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { Array } from '@morphic-ts/model-algebras/lib/types'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import { oneof } from 'fast-check'

import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    union: <A>(items: Array<(env: Env) => FastCheckType<A>>) => (_guards, _name) => (env: Env) =>
      new FastCheckType(oneof(...items.map(v => v(env).arb)))
  })
)
