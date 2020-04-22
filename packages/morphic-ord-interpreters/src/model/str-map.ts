import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { OrdType, OrdURI } from '../hkt'
import { ordApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap1<OrdURI, Env> => ({
    _F: OrdURI,
    strMap: (getCodomain, config) => env =>
      new OrdType(
        ordApplyConfig(config)(
          ord.contramap(array.getOrd(getTupleOrd(ordString, getCodomain(env).ord)), record.toArray),
          env
        )
      )
  })
)
