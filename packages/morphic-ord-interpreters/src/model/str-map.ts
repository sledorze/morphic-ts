import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { getOrd as AgetOrd } from 'fp-ts/Array'
import { getTupleOrd, ord, ordString } from 'fp-ts/Ord'
import { toArray as RtoArray } from 'fp-ts/Record'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<OrdURI, Env> => ({
    _F: OrdURI,
    strMap: (getCodomain, config) => env =>
      new OrdType(
        ordApplyConfig(config)(ord.contramap(AgetOrd(getTupleOrd(ordString, getCodomain(env).ord)), RtoArray), env)
      ),
    record: (getDomain, getCodomain, config) => env =>
      new OrdType(
        ordApplyConfig(config)(
          ord.contramap(AgetOrd(getTupleOrd(getDomain(env).ord, getCodomain(env).ord)), RtoArray),
          env
        )
      )
  })
)
