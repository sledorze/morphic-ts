import { FastCheckType, FastCheckURI } from '../hkt'
import type { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { fromFoldable } from 'fp-ts/lib/Record'
import { array } from 'fp-ts/lib/Array'
import { getFirstSemigroup } from 'fp-ts/lib/Semigroup'
import { tuple, array as FCArray, string } from 'fast-check'
import { fastCheckApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const strmapFromArray = <A>() => fromFoldable(getFirstSemigroup<A>(), array)
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
