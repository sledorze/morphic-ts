import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'
import { JsonSchemaURI, JsonSchema } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'
import { record, array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'

const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

export const jsonSchemaTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<JsonSchemaURI> = {
  taggedUnion: (tag, types) =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(types), ([_, v]) => v.schema),
        SE.chainEitherK(UnionTypeCtor)
      )
    )
}
