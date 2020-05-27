import { FastCheckURI, FastCheckType } from '../hkt'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { fastCheckApplyConfig } from '../config'
import type { Arbitrary } from 'fast-check/*'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const coerceType = <A, B>(x: Arbitrary<A>) => (x as any) as Arbitrary<B>

/**
 *  @since 0.0.1
 */
export const fastCheckRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    refined: (getArb, _ref, _name, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(coerceType(getArb(env).arb), env))
  })
)
