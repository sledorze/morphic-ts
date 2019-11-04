import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { eqPrimitiveInterpreter } from './primitives'
import { eqIntersectionInterpreter } from './intersections'
import { eqObjectInterpreter } from './object'
import { eqTaggedUnionInterpreter } from './tagged-unions'
import { eqRecursiveInterpreter } from './recursive'
import { eqStrMapInterpreter } from './str-map'
import { eqSetInterpreter } from './set'
import { URI } from '.'
export { URI }

export const defineEqInterpreter = InterpreterFor(URI)

export const eqInterpreter = defineEqInterpreter(
  merge(
    eqPrimitiveInterpreter,
    eqIntersectionInterpreter,
    eqObjectInterpreter,
    eqTaggedUnionInterpreter,
    eqRecursiveInterpreter,
    eqStrMapInterpreter,
    eqSetInterpreter
  )
)
