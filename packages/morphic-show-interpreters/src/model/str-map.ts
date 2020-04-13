import { record } from 'fp-ts'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const showStrMapInterpreter: ModelAlgebraStrMap1<ShowURI> = {
  _F: ShowURI,
  strMap: codomain => env => new ShowType(record.getShow(codomain(env).show)),
  strMapCfg: codomain => config => env => new ShowType(showApplyConfig(config)(record.getShow(codomain(env).show), env))
}
