import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraTaggedUnions } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { pipe } from 'fp-ts/pipeable'
import { toArray } from 'fp-ts/Record'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { arrayTraverseStateEither } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    taggedUnion: (_tag, types, _name, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            arrayTraverseStateEither(toArray(types), ([_, v]) => v(env).schema),
            SEchainEitherK(UnionTypeCtor)
          ),
          env,
          {}
        )
      )
  })
)
