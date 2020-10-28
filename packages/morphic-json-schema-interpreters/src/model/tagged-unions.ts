import type { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { JsonSchemaURI, JsonSchema } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { toArray } from 'fp-ts/Record'
import { pipe } from 'fp-ts/pipeable'
import { chainEitherK as SEchainEitherK } from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither } from '../utils'
import { jsonSchemaApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    taggedUnion: (_tag, types, _name, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            arrayTraverseStateEither(toArray(types), ([_, v]) => v(env).schema),
            SEchainEitherK(UnionTypeCtor)
          ),
          env
        )
      )
  })
)
