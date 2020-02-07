import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { JsonSchema, JsonSchemaURI } from '..'
import { SetFromArrayTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from '../StateEither'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 *  @since 0.0.1
 */
export const jsonSchemaSetInterpreter: ModelAlgebraSet1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  set: ({ schema }) => new JsonSchema(pipe(schema, SE.chainEitherK(SetFromArrayTypeCtor)))
}
