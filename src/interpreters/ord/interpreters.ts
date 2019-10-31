import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { ordPrimitiveInterpreter } from './primitives'
import { ordIntersectionInterpreter } from './intersections'
import { ordTaggedUnionInterpreter } from './tagged-unions'
import { ordStrMapInterpreter } from './str-map'
import { ordSetInterpreter } from './set'
import { URI } from '.'

export const defineOrdInterpreter = InterpreterFor(URI)

export const ordInterpreter = defineOrdInterpreter(
  merge(
    ordPrimitiveInterpreter,
    ordIntersectionInterpreter,
    ordSetInterpreter,
    ordStrMapInterpreter,
    ordTaggedUnionInterpreter
  )
)
