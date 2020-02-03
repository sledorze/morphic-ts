import { ModelAlgebraIntersection1 } from '@sledorze/morphic-model-algebras/lib/intersections'
import { JsonSchema, JsonSchemaURI } from '..'
import { IntersectionTypeCtor } from '../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../StateEither'
import { arrayTraverseStateEither, resolveRef, registerSchema } from '../utils'

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
