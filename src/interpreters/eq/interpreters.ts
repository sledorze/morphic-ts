import { merge } from '../../utils'
import { InterpreterFor } from '../../core'
import { eqPrimitiveInterpreter } from './primitives'
import { eqIntersectionInterpreter } from './intersections'
import { eqObjectInterpreter } from './object'
import { eqTaggedUnionInterpreter } from './tagged-unions'
import { eqRecursiveInterpreter } from './recursive'
import { eqCollectionInterpreter } from './collections'

export const defineEqInterpreter = InterpreterFor('EqType')

export const eqInterpreter = defineEqInterpreter(
  merge(
    eqPrimitiveInterpreter,
    eqIntersectionInterpreter,
    eqObjectInterpreter,
    eqTaggedUnionInterpreter,
    eqRecursiveInterpreter,
    eqCollectionInterpreter
  )
)
