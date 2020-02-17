import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { JsonSchema, JsonSchemaURI } from '..'
import { StrMapTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 *  @since 0.0.1
 */
export const jsonSchemaStrMapInterpreter: ModelAlgebraStrMap1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  strMap: ({ schema }) => new JsonSchema(pipe(schema, SE.chainEitherK(StrMapTypeCtor)))
}
