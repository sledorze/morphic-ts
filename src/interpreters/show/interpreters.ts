import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { showPrimitiveInterpreter } from './primitives'
import { showIntersectionInterpreter } from './intersections'
import { showObjectInterpreter } from './object'
import { showTaggedUnionInterpreter } from './tagged-unions'
import { showRecursiveInterpreter } from './recursive'
import { showStrMapInterpreter } from './str-map'
import { showSetInterpreter } from './set'

export const defineShowInterpreter = InterpreterFor('ShowType')

export const showInterpreter = defineShowInterpreter(
  merge(
    showPrimitiveInterpreter,
    showIntersectionInterpreter,
    showObjectInterpreter,
    showTaggedUnionInterpreter,
    showRecursiveInterpreter,
    showSetInterpreter,
    showStrMapInterpreter
  )
)
