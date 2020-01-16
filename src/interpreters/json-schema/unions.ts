import { ModelAlgebraUnions1 } from '../../algebras/unions'
import { JsonSchemaURI, JsonSchema } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'
import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'

const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<JsonSchemaURI> = {
  union: (types: JsonSchema<any>[]) =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(types, j => j.schema),
        SE.chain(v => SE.fromEither(UnionTypeCtor(v)))
      )
    )
}
