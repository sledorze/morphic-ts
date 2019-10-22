import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { JsonSchema, URI } from '.'
import { IntersectionTypeCtor } from '../../json-schema/json-schema-ctors'

export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<URI> = {
  intersection: <A>(types: Array<JsonSchema<A>>) => new JsonSchema<A>(IntersectionTypeCtor(types.map(v => v.schema)))
}
