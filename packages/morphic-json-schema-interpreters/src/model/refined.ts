import { JsonSchemaURI } from '../hkt'
import { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'

/**
 *  @since 0.0.1
 */
export const jsonSchemaRefinedInterpreter: ModelAlgebraRefined1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  refined: (a, _ref, _name) => a,
  // TODO: add customize
  refinedCfg: (a, _ref, _name) => _config => a
}
