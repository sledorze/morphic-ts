import { ModelAlgebraCollection1 } from '../../algebras/collections'
import { JsonSchema, URI } from '.'
import { SetFromArrayTypeCtor, StrMapTypeCtor } from '../../json-schema/json-schema-ctors'

export const jsonSchemaCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: ({ schema }) => new JsonSchema(SetFromArrayTypeCtor(schema)),
  strMap: ({ schema }) => new JsonSchema(StrMapTypeCtor(schema))
}
