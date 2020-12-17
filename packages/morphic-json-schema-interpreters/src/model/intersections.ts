import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import { pipe } from 'fp-ts/pipeable'
import { chain as SEchain, chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { JsonSchema, JsonSchemaURI } from '../hkt'
import { IntersectionTypeCtor } from '../json-schema/json-schema-ctors'
import { arrayTraverseStateEither, registerSchema, resolveRef } from '../utils'

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
          SEchain(schemas => arrayTraverseStateEither(schemas, resolveRef)),
          SEchainEitherK(IntersectionTypeCtor),
          SEchain(registerSchema(name))
        )
      )
  })
)
