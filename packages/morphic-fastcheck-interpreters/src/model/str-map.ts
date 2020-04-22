import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { array, record, semigroup } from 'fp-ts'
import { tuple, array as FCArray, string } from 'fast-check'
import { fastCheckApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const strmapFromArray = <A>() => record.fromFoldable(semigroup.getFirstSemigroup<A>(), array.array)
/**
 *  @since 0.0.1
 */
export const fastCheckStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    strMap: (codomain, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(FCArray(tuple(string(), codomain(env).arb)).map(strmapFromArray()), env)
      )
  })
)
