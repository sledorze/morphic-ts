import { ModelAlgebraUnions1 } from '@morphic-ts/model-algebras/lib/unions'
import { JsonSchemaURI, JsonSchema } from '../hkt'
import { UnionTypeCtor } from '../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { arrayTraverseStateEither } from '../utils'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

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
          SE.chainEitherK(UnionTypeCtor)
        )
      )
  })
)
