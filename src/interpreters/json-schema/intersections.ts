import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { JsonSchema, JsonSchemaURI } from '.'
import { IntersectionTypeCtor } from '../../json-schema/json-schema-ctors'
import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'

const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  intersection: <A>(types: Array<JsonSchema<A>>) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, v => v.schema),
        SE.chain(v => SE.fromEither(IntersectionTypeCtor(v)))
      )
    )
}
