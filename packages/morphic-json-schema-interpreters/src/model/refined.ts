import { JsonSchemaURI, JsonSchema } from '../hkt'
import type { ModelAlgebraRefined1 } from '@morphic-ts/model-algebras/lib/refined'
import type { Branded } from 'io-ts'
import { jsonSchemaApplyConfig } from '../config'

const coerce = <R, A>(x: (env: R) => JsonSchema<A>) => (x as any) as <B>(env: R) => JsonSchema<Branded<A, B>>

/**
 *  @since 0.0.1
 */
export const jsonSchemaRefinedInterpreter: ModelAlgebraRefined1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  refined: coerce,
  refinedCfg: getJsonSchema => config => env =>
    new JsonSchema(jsonSchemaApplyConfig(config)(getJsonSchema(env).schema, env))
}
