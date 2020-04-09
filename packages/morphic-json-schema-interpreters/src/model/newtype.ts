import { JsonSchemaURI } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter: ModelAlgebraNewtype1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  newtype: () => getJson => getJson,
  //  TODO: add customize
  newtypeCfg: () => getJson => _config => getJson
}
