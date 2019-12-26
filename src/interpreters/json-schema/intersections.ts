import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { JsonSchema, JsonSchemaURI } from '.'
import { IntersectionTypeCtor } from '../../json-schema/json-schema-ctors'
import { either, array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'

const arrayTraverseEither = array.array.traverse(either.either)

export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  intersection: <A>(types: Array<JsonSchema<A>>) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseEither(types, v => v.schema),
        either.chain(IntersectionTypeCtor)
      )
    )
}
