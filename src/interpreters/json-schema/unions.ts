import { ModelAlgebraUnions1 } from '../../algebras/unions'
import { URI, JsonSchema } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'
import { either, array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'

const arrayTraverseEither = array.array.traverse(either.either)

export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<URI> = {
  union: (types: JsonSchema<any>[]) =>
    new JsonSchema(
      pipe(
        arrayTraverseEither(types, j => j.schema),
        either.chain(UnionTypeCtor)
      )
    )
}
