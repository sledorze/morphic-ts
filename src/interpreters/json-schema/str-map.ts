import { ModelAlgebraStrMap1 } from '../../algebras/str-map'
import { JsonSchema, JsonSchemaURI } from '.'
import { StrMapTypeCtor } from '../../json-schema/json-schema-ctors'
import * as SE from '../../StateEither'

export const jsonSchemaStrMapInterpreter: ModelAlgebraStrMap1<JsonSchemaURI> = {
  strMap: ({ schema }) => new JsonSchema(SE.stateEither.chain(schema, v => SE.fromEither(StrMapTypeCtor(v))))
}
