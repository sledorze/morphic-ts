import { getOrd as AgetOrd } from 'fp-ts/Array'
import { toArray as RtoArray } from 'fp-ts/Record'
import { ord, ordString, getTupleOrd } from 'fp-ts/Ord'
import type { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { OrdType, OrdURI } from '../hkt'
import { ordApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<OrdURI, Env> => ({
    _F: OrdURI,
    strMap: (getCodomain, config) => env =>
      new OrdType(
        ordApplyConfig(config)(ord.contramap(AgetOrd(getTupleOrd(ordString, getCodomain(env).ord)), RtoArray), env)
      )
  })
)
