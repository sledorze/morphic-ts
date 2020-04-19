import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import type { Branded } from 'io-ts'
import { EqURI, EqType } from '../hkt'
import { eqApplyConfig } from '../config'

const coerce = <R, A>(x: (env: R) => EqType<A>) => (x as any) as <B>(env: R) => EqType<Branded<A, B>>

/**
 *  @since 0.0.1
 */
export const eqRefinedInterpreter: ModelAlgebraRefined1<EqURI> = {
  _F: EqURI,
  refined: coerce,
  refinedCfg: getEq => config => env => new EqType(eqApplyConfig(config)(getEq(env).eq, env))
}
