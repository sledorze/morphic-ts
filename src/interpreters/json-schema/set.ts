import { ModelAlgebraSet1 } from '../../algebras/set'
import { JsonSchema, URI } from '.'
import { SetFromArrayTypeCtor } from '../../json-schema/json-schema-ctors'

export const jsonSchemaSetInterpreter: ModelAlgebraSet1<URI> = {
  set: ({ schema }) => new JsonSchema(() => SetFromArrayTypeCtor(schema()))
}
