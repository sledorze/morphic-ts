import { ModelAlgebraStrMap1 } from '@sledorze/morphic-model-algebras/lib/str-map'
import { JsonSchema, JsonSchemaURI } from '..'
import { StrMapTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from '../StateEither'
import { pipe } from 'fp-ts/lib/pipeable'

export const jsonSchemaStrMapInterpreter: ModelAlgebraStrMap1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  strMap: ({ schema }) => new JsonSchema(pipe(schema, SE.chainEitherK(StrMapTypeCtor)))
}
