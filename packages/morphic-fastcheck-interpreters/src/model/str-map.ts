import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { array, record, semigroup } from 'fp-ts'
import { tuple, array as FCArray, string } from 'fast-check'
import { fastCheckApplyConfig } from '../config'

const strmapFromArray = <A>() => record.fromFoldable(semigroup.getFirstSemigroup<A>(), array.array)
/**
 *  @since 0.0.1
 */
export const fastCheckStrMapInterpreter: ModelAlgebraStrMap1<FastCheckURI> = {
  _F: FastCheckURI,
  strMap: codomain => env => new FastCheckType(FCArray(tuple(string(), codomain(env).arb)).map(strmapFromArray())),
  strMapCfg: codomain => config => env =>
    new FastCheckType(
      fastCheckApplyConfig(config)(FCArray(tuple(string(), codomain(env).arb)).map(strmapFromArray()), env)
    )
}
