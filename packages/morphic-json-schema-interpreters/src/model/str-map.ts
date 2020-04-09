import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { StrMapTypeCtor } from '../json-schema/json-schema-ctors'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 *  @since 0.0.1
 */
export const jsonSchemaStrMapInterpreter: ModelAlgebraStrMap1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  strMap: getSchema => env => new JsonSchema(pipe(getSchema(env).schema, SE.chainEitherK(StrMapTypeCtor))),
  // TODO: add customize
  strMapCfg: getSchema => _config => env => new JsonSchema(pipe(getSchema(env).schema, SE.chainEitherK(StrMapTypeCtor)))
}
