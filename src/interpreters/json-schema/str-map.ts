import { ModelAlgebraStrMap1 } from '../../algebras/str-map'
import { JsonSchema, JsonSchemaURI } from '.'
import { StrMapTypeCtor } from '../../json-schema/json-schema-ctors'
import { either } from 'fp-ts/lib/Either'

export const jsonSchemaStrMapInterpreter: ModelAlgebraStrMap1<JsonSchemaURI> = {
  strMap: ({ schema }) => new JsonSchema(either.chain(schema, StrMapTypeCtor))
}
