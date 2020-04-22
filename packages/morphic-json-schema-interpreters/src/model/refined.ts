import { JsonSchemaURI, JsonSchema } from '../hkt'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import type { Branded } from 'io-ts'
import { jsonSchemaApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const coerce = <R, A>(x: (env: R) => JsonSchema<A>) => (x as any) as <B>(env: R) => JsonSchema<Branded<A, B>>

/**
 *  @since 0.0.1
 */
export const jsonSchemaRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    refined: coerce,
    refinedCfg: getJsonSchema => config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(getJsonSchema(env).schema, env))
  })
)
