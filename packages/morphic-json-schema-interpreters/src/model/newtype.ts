import { JsonSchemaURI } from '..'
import { ModelAlgebraNewtype1 } from '@sledorze/morphic-model-algebras/lib/newtype'
import { identity } from 'fp-ts/lib/function'

export const jsonSchemaNewtypeInterpreter: ModelAlgebraNewtype1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  newtype: () => identity as any
}
