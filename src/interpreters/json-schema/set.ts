import { ModelAlgebraSet1 } from '../../algebras/set'
import { JsonSchema, JsonSchemaURI } from '.'
import { SetFromArrayTypeCtor } from '../../json-schema/json-schema-ctors'
import { either } from 'fp-ts/lib/Either'

export const jsonSchemaSetInterpreter: ModelAlgebraSet1<JsonSchemaURI> = {
  set: ({ schema }) => new JsonSchema(either.chain(schema, SetFromArrayTypeCtor))
}
