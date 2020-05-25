import { FastCheckType, FastCheckURI } from '../hkt'
import type { ModelAlgebraUnions1 } from '@morphic-ts/model-algebras/lib/unions'
import { oneof } from 'fast-check'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const fastCheckUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    union: <A>(items: ((env: Env) => FastCheckType<A>)[]) => (env: Env) =>
      new FastCheckType(oneof(...items.map(v => v(env).arb)))
  })
)
