import { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { IntersectionTypeCtor } from '../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither, resolveRef, registerSchema } from '../utils'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    intersection: <A>(types: Array<(env: Env) => JsonSchema<A>>, name: string) => (env: Env) =>
      new JsonSchema<A>(
        pipe(
          arrayTraverseStateEither(types, getShema => getShema(env).schema),
          SE.chain(schemas => arrayTraverseStateEither(schemas, resolveRef)),
          SE.chainEitherK(IntersectionTypeCtor),
          SE.chain(registerSchema(name))
        )
      )
  })
)
