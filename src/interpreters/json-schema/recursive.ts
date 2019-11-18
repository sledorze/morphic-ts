import { JsonSchema, URI, JsonSchemaError } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import { left } from 'fp-ts/lib/Either'

// FIXME: Create a reference JsonSchema => "$ref": "#/definitions/MySchemaRef" <- Track down how to do that!
export const jsonSchemaRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: <A>(a: (x: JsonSchema<A>) => JsonSchema<A>) => {
    return a(new JsonSchema(left([JsonSchemaError('Recursivity not yet supported (W.I.P.)')]))) // right(StringTypeCtor())))
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
