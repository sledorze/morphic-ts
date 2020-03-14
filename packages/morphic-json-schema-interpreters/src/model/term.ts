import { JsonSchemaURI, JsonSchema, JsonSchemaResult } from '../hkt'
import { ModelAlgebraTerm1 } from '@morphic-ts/model-algebras/lib/term'
import { OptionalJSONSchema } from '../json-schema/json-schema-ctors'

declare module '@morphic-ts/model-algebras/lib/term' {
  /**
   *  @since 0.0.1
   */
  interface TermConstructor<A, E> {
    [JsonSchemaURI]: JsonSchemaResult<OptionalJSONSchema>
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaTermInterpreter: ModelAlgebraTerm1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  term: () => ({ [JsonSchemaURI]: a }) => new JsonSchema(a)
}
