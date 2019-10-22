import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { showPrimitiveInterpreter } from './primitives'
import { showIntersectionInterpreter } from './intersections'
import { showObjectInterpreter } from './object'
import { showTaggedUnionInterpreter } from './tagged-unions'
import { showRecursiveInterpreter } from './recursive'
import { showCollectionInterpreter } from './collections'

export const defineShowInterpreter = InterpreterFor('ShowType')

export const showInterpreter = defineShowInterpreter(
  merge(
    showPrimitiveInterpreter,
    showIntersectionInterpreter,
    showObjectInterpreter,
    showTaggedUnionInterpreter,
    showRecursiveInterpreter,
    showCollectionInterpreter
  )
)
