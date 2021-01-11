import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { Array } from '@morphic-ts/model-algebras/lib/types'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { JsonSchema, JsonSchemaURI } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { arrayTraverseStateEither } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    union: <A>(types: Array<(env: Env) => JsonSchema<A>>) => (_guards, _name) => (env: Env) =>
      new JsonSchema<A>(
        pipe(
          arrayTraverseStateEither(types, j => j(env).schema),
          SEchainEitherK(UnionTypeCtor)
        )
      )
  })
)
