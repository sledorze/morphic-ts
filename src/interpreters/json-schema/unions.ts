import { ModelAlgebraUnions1 } from '../../algebras/unions'
import { JsonSchemaURI, JsonSchema, arrayTraverseStateEither } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from './StateEither'

export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<JsonSchemaURI> = {
  union: (types: JsonSchema<any>[]) =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(types, j => j.schema),
        SE.chainEitherK(UnionTypeCtor)
      )
    )
}
