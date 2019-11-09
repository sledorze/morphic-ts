import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'
import { URI, JsonSchema } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'
import { record, either, array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'

const arrayTraverseEither = array.array.traverse(either.either)

export const jsonSchemaTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (tag, types) =>
    new JsonSchema(
      pipe(
        arrayTraverseEither(record.toArray(types), ([k, v]) => v.schema),
        either.chain(UnionTypeCtor)
      )
    )
}
