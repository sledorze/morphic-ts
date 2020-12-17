import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { array as FCArray, string, tuple } from 'fast-check'
import { array } from 'fp-ts/Array'
import { fromFoldable } from 'fp-ts/Record'
import { getFirstSemigroup } from 'fp-ts/Semigroup'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

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
      ),
    record: (domain, codomain, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(FCArray(tuple(domain(env).arb, codomain(env).arb)).map(strmapFromArray()), env)
      )
  })
)
