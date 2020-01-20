import { merge } from '../../common/utils'
import { InterpreterFor } from '../../common/core'
import { jsonSchemaPrimitiveInterpreter } from './primitives'
import { jsonSchemaIntersectionInterpreter } from './intersections'
import { jsonSchemaObjectInterpreter } from './object'
import { jsonSchemaTaggedUnionInterpreter } from './tagged-unions'
import { jsonSchemaRecursiveInterpreter } from './recursive'
import { jsonSchemaStrMapInterpreter } from './str-map'
import { jsonSchemaSetInterpreter } from './set'
import { jsonSchemaUnionInterpreter } from './unions'
import { JsonSchemaURI } from '.'
export { JsonSchemaURI }

export const defineJsonSchemaInterpreter = InterpreterFor(JsonSchemaURI)

export const jsonSchemaInterpreter = defineJsonSchemaInterpreter(
  merge(
    jsonSchemaPrimitiveInterpreter,
    jsonSchemaIntersectionInterpreter,
    jsonSchemaObjectInterpreter,
    jsonSchemaTaggedUnionInterpreter,
    jsonSchemaRecursiveInterpreter,
    jsonSchemaStrMapInterpreter,
    jsonSchemaSetInterpreter,
    jsonSchemaUnionInterpreter
  )
)
