import { ModelAlgebraUnions1 } from '../../algebras/unions'
import { URI, JsonSchema } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'

export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<URI> = {
  union: (types: JsonSchema<any>[]) => {
    const schemas = types.map(v => v.schema)
    return new JsonSchema(UnionTypeCtor(schemas))
  }
}
