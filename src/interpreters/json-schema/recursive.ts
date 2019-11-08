import { JsonSchema, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import { StringTypeCtor } from '../../json-schema/json-schema-ctors'

// FIXME: Create a reference JsonSchema => "$ref": "#/definitions/MySchemaRef" <- Track down how to do that!
export const jsonSchemaRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: <A>(a: (x: JsonSchema<A>) => JsonSchema<A>) => {
    return a(new JsonSchema(StringTypeCtor()))
    // let cache: null | OptionalJSONSchema = null
    // return new JsonSchema(() => {
    //   if (cache === null) {
    //     cache = StringTypeCtor()
    //     return a().schema()
    //   }
    //   return cache
    // })
  }
}
