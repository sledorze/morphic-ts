import { JsonSchemaURI } from '../hkt'
import { ModelAlgebraNewtype1 } from '@morphic-ts/model-algebras/lib/newtype'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter: ModelAlgebraNewtype1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  // TODO: add customize
  newtype: () => identity as any
}
