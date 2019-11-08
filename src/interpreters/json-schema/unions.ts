import { ModelAlgebraUnions1 } from '../../algebras/unions'
import { URI, JsonSchema } from '.'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'

export const jsonSchemaUnionInterpreter: ModelAlgebraUnions1<URI> = {
  union: (types: JsonSchema<any>[]) => new JsonSchema(() => UnionTypeCtor(types.map(v => v.schema())))
}
