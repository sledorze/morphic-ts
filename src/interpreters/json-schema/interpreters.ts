import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { jsonSchemaPrimitiveInterpreter } from './primitives'
import { jsonSchemaIntersectionInterpreter } from './intersections'
import { jsonSchemaObjectInterpreter } from './object'
import { jsonSchemaTaggedUnionInterpreter } from './tagged-unions'
import { jsonSchemaRecursiveInterpreter } from './recursive'
import { jsonSchemaCollectionInterpreter } from './collections'
import { jsonSchemaUnionInterpreter } from './unions'
import { URI } from '.'

export const defineJsonSchemaInterpreter = InterpreterFor(URI)

export const jsonSchemaInterpreter = defineJsonSchemaInterpreter(
  merge(
    jsonSchemaPrimitiveInterpreter,
    jsonSchemaIntersectionInterpreter,
    jsonSchemaObjectInterpreter,
    jsonSchemaTaggedUnionInterpreter,
    jsonSchemaRecursiveInterpreter,
    jsonSchemaCollectionInterpreter,
    jsonSchemaUnionInterpreter
  )
)
