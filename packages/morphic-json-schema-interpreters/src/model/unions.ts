import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions1 } from '@morphic-ts/model-algebras/lib/unions'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { JsonSchema, JsonSchemaURI } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { arrayTraverseStateEither } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    union: <A>(types: ((env: Env) => JsonSchema<A>)[]) => (env: Env) =>
      new JsonSchema<A>(
        pipe(
          arrayTraverseStateEither(types, j => j(env).schema),
          SEchainEitherK(UnionTypeCtor)
        )
      )
  })
)
