import { ModelAlgebraIntersection1 } from 'morphic-model-algebras/lib/intersections'
import { JsonSchema, JsonSchemaURI } from '..'
import { IntersectionTypeCtor } from '../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../StateEither'
import { arrayTraverseStateEither, resolveRef, registerSchema } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  intersection: <A>(types: Array<JsonSchema<A>>, name: string) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, ({ schema }) => schema),
        SE.chain(schemas => arrayTraverseStateEither(schemas, resolveRef)),
        SE.chainEitherK(IntersectionTypeCtor),
        SE.chain(registerSchema(name))
      )
    )
}
