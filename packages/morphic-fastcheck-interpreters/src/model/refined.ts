import { FastCheckURI, FastCheckType } from '../hkt'
import type { Branded } from 'io-ts'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import { fastCheckApplyConfig } from '../config'
import { Arbitrary } from 'fast-check/*'

const coerce = <R, A>(x: (env: R) => FastCheckType<A>) => (x as any) as <B>(env: R) => FastCheckType<Branded<A, B>>
const coerceType = <A, B>(x: Arbitrary<A>) => (x as any) as Arbitrary<Branded<A, B>>

/**
 *  @since 0.0.1
 */
export const fastCheckRefinedInterpreter: ModelAlgebraRefined1<FastCheckURI> = {
  _F: FastCheckURI,
  refined: coerce,
  refinedCfg: getArb => config => env =>
    new FastCheckType(fastCheckApplyConfig(config)(coerceType(getArb(env).arb), env))
}
