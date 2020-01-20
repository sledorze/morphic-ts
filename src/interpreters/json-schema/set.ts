import { ModelAlgebraSet1 } from '../../algebras/set'
import { JsonSchema, JsonSchemaURI } from '.'
import { SetFromArrayTypeCtor } from '../../json-schema/json-schema-ctors'
import * as SE from './StateEither'
import { pipe } from 'fp-ts/lib/pipeable'

export const jsonSchemaSetInterpreter: ModelAlgebraSet1<JsonSchemaURI> = {
  set: ({ schema }) => new JsonSchema(pipe(schema, SE.chainEitherK(SetFromArrayTypeCtor)))
}
