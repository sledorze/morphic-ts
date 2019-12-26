import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { showPrimitiveInterpreter } from './primitives'
import { showIntersectionInterpreter } from './intersections'
import { showObjectInterpreter } from './object'
import { showTaggedUnionInterpreter } from './tagged-unions'
import { showRecursiveInterpreter } from './recursive'
import { showStrMapInterpreter } from './str-map'
import { showSetInterpreter } from './set'
import { ShowURI } from '.'
export { ShowURI as URI }

export const defineShowInterpreter = InterpreterFor(ShowURI)

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
