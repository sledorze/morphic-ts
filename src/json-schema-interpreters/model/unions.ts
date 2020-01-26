import { ModelAlgebraUnions1 } from '../../model-algebras/unions'
import { JsonSchemaURI, JsonSchema } from '..'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../StateEither'
import { arrayTraverseStateEither } from '../utils'

export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<JsonSchemaURI> = {
  union: <A>(types: JsonSchema<A>[]) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, j => j.schema),
        SE.chainEitherK(UnionTypeCtor)
      )
    )
}
