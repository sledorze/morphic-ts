import { merge } from '../../common/utils'
import { jsonSchemaPrimitiveInterpreter } from './primitives'
import { jsonSchemaIntersectionInterpreter } from './intersections'
import { jsonSchemaObjectInterpreter } from './object'
import { jsonSchemaTaggedUnionInterpreter } from './tagged-unions'
import { jsonSchemaRecursiveInterpreter } from './recursive'
import { jsonSchemaStrMapInterpreter } from './str-map'
import { jsonSchemaSetInterpreter } from './set'
import { jsonSchemaUnionInterpreter } from './unions'

export const allModelJsonSchema = merge(
  jsonSchemaPrimitiveInterpreter,
  jsonSchemaIntersectionInterpreter,
  jsonSchemaObjectInterpreter,
  jsonSchemaTaggedUnionInterpreter,
  jsonSchemaRecursiveInterpreter,
  jsonSchemaStrMapInterpreter,
  jsonSchemaSetInterpreter,
  jsonSchemaUnionInterpreter
)
