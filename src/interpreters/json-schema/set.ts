import { ModelAlgebraSet1 } from '../../algebras/set'
import { JsonSchema, JsonSchemaURI } from '.'
import { SetFromArrayTypeCtor } from '../../json-schema/json-schema-ctors'
import * as SE from '../../StateEither'

export const jsonSchemaSetInterpreter: ModelAlgebraSet1<JsonSchemaURI> = {
  set: ({ schema }) => new JsonSchema(SE.stateEither.chain(schema, v => SE.fromEither(SetFromArrayTypeCtor(v))))
}
