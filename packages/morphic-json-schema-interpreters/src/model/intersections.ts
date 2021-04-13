import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import { pipe } from 'fp-ts/pipeable'
import { chain as SEchain, chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { JsonSchema, JsonSchemaURI } from '../hkt'
import { IntersectionTypeCtor } from '../json-schema/json-schema-ctors'
import { arrayTraverseStateEither, getName, registerSchema, resolveRef } from '../utils'

declare module '@morphic-ts/model-algebras/lib/intersections' {
  export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {}
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    intersection: (...types) => config => (env: Env) =>
      new JsonSchema(
        pipe(
          arrayTraverseStateEither(types, getShema => getShema(env).schema),
          SEchain(schemas => arrayTraverseStateEither(schemas, resolveRef)),
          SEchainEitherK(IntersectionTypeCtor),
          SEchain(schema =>
            pipe(
              getName(config),
              SEchain(name => registerSchema(name)(schema))
            )
          )
        )
      )
  })
)
