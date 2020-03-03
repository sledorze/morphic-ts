import { ModelAlgebraUnions1 } from '@morphic-ts/model-algebras/lib/unions'
import { JsonSchemaURI, JsonSchema } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  union: <A>(types: JsonSchema<A>[]) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, j => j.schema),
        SE.chainEitherK(UnionTypeCtor)
      )
    )
}
