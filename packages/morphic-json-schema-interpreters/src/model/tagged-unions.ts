import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { JsonSchemaURI, JsonSchema } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { record } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither } from '../utils'
import { jsonSchemaApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    taggedUnion: (_tag, types) => env =>
      new JsonSchema(
        pipe(
          arrayTraverseStateEither(record.toArray(types), ([_, v]) => v(env).schema),
          SE.chainEitherK(UnionTypeCtor)
        )
      ),
    taggedUnionCfg: (_tag, types) => config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            arrayTraverseStateEither(record.toArray(types), ([_, v]) => v(env).schema),
            SE.chainEitherK(UnionTypeCtor)
          ),
          env
        )
      )
  })
)
