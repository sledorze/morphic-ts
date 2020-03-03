import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { JsonSchemaURI, JsonSchema } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { record } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  taggedUnion: (_tag, types) =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(types), ([_, v]) => v.schema),
        SE.chainEitherK(UnionTypeCtor)
      )
    )
}
