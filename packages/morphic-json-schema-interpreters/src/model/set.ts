import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { SetFromArrayTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { pipe } from 'fp-ts/lib/pipeable'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    set: getSchema => env => new JsonSchema(pipe(getSchema(env).schema, SE.chainEitherK(SetFromArrayTypeCtor)))
  })
)
