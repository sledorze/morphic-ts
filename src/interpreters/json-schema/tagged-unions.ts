import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'
import { URI, JsonSchema } from '.'
import { record } from 'fp-ts'
import { UnionTypeCtor } from '../../json-schema/json-schema-ctors'

export const jsonSchemaTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (tag, types) => {
    const schemas = record.toArray(types).map(([k, v]) => v.schema)
    return new JsonSchema(UnionTypeCtor(schemas))
  }
}
