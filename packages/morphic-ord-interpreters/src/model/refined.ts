import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { OrdURI, OrdType } from '../hkt'
import { ordApplyConfig } from '../config'
import type { Branded } from 'io-ts'

const coerce = <R, A>(x: (env: R) => OrdType<A>) => (x as any) as <B>(env: R) => OrdType<Branded<A, B>>

/**
 *  @since 0.0.1
 */
export const ordRefinedInterpreter: ModelAlgebraRefined1<OrdURI> = {
  _F: OrdURI,
  refined: coerce,
  refinedCfg: getOrd => config => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env))
}
