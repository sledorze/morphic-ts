import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { OrdURI, OrdType } from '../hkt'
import { ordApplyConfig } from '../config'
import type { Branded } from 'io-ts'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const coerce = <R, A>(x: (env: R) => OrdType<A>) => (x as any) as <B>(env: R) => OrdType<Branded<A, B>>

/**
 *  @since 0.0.1
 */
export const ordRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<OrdURI, Env> => ({
    _F: OrdURI,
    refined: coerce,
    refinedCfg: getOrd => config => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env))
  })
)
