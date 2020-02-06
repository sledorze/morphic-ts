import { JsonSchemaURI } from '..'
import { ModelAlgebraNewtype1 } from 'morphic-model-algebras/lib/newtype'
import { identity } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const jsonSchemaNewtypeInterpreter: ModelAlgebraNewtype1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  newtype: () => identity as any
}
