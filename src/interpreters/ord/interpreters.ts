import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { ordPrimitiveInterpreter } from './primitives'
import { ordIntersectionInterpreter } from './intersections'
import { ordTaggedUnionInterpreter } from './tagged-unions'
import { ordCollectionInterpreter } from './collections'

export const defineOrdInterpreter = InterpreterFor('OrdType')

export const ordInterpreter = defineOrdInterpreter(
  merge(ordPrimitiveInterpreter, ordIntersectionInterpreter, ordCollectionInterpreter, ordTaggedUnionInterpreter)
)
