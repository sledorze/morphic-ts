import { JsonSchemaURI } from '..'
import { ModelAlgebraNewtype1 } from '../../model-algebras/newtype'
import { identity } from 'fp-ts/lib/function'

export const jsonSchemaNewtypeInterpreter: ModelAlgebraNewtype1<JsonSchemaURI> = {
  newtype: () => identity as any
}
