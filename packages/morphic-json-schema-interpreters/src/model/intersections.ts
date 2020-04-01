import { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { IntersectionTypeCtor } from '../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither, resolveRef, registerSchema } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  intersection: <A, R>(types: Array<(env: R) => JsonSchema<A>>, name: string) => (env: R) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, getShema => getShema(env).schema),
        SE.chain(schemas => arrayTraverseStateEither(schemas, resolveRef)),
        SE.chainEitherK(IntersectionTypeCtor),
        SE.chain(registerSchema(name))
      )
    )
}
