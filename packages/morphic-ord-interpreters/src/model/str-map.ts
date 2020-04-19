import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { OrdType, OrdURI } from '../hkt'
import { ordApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter: ModelAlgebraStrMap1<OrdURI> = {
  _F: OrdURI,
  strMap: getCodomain => env =>
    new OrdType(ord.contramap(array.getOrd(getTupleOrd(ordString, getCodomain(env).ord)), record.toArray)),
  strMapCfg: getCodomain => config => env =>
    new OrdType(
      ordApplyConfig(config)(
        ord.contramap(array.getOrd(getTupleOrd(ordString, getCodomain(env).ord)), record.toArray),
        env
      )
    )
}
