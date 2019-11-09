import { ModelAlgebraSet1 } from '../../algebras/set'
import { JsonSchema, URI } from '.'
import { SetFromArrayTypeCtor } from '../../json-schema/json-schema-ctors'
import { either } from 'fp-ts/lib/Either'

export const jsonSchemaSetInterpreter: ModelAlgebraSet1<URI> = {
  set: ({ schema }) => new JsonSchema(either.chain(schema, SetFromArrayTypeCtor))
}
