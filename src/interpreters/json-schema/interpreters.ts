import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { jsonSchemaPrimitiveInterpreter } from './primitives'
import { jsonSchemaIntersectionInterpreter } from './intersections'
import { jsonSchemaObjectInterpreter } from './object'
import { jsonSchemaTaggedUnionInterpreter } from './tagged-unions'
import { jsonSchemaRecursiveInterpreter } from './recursive'
import { jsonSchemaStrMapInterpreter } from './str-map'
import { jsonSchemaSetInterpreter } from './set'
import { jsonSchemaUnionInterpreter } from './unions'
import { URI } from '.'
export { URI }

export const defineJsonSchemaInterpreter = InterpreterFor(URI)

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
