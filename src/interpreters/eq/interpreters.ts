import { merge } from '../../common/utils'
import { InterpreterFor } from '../../common/core'
import { eqPrimitiveInterpreter } from './primitives'
import { eqIntersectionInterpreter } from './intersections'
import { eqObjectInterpreter } from './object'
import { eqTaggedUnionInterpreter } from './tagged-unions'
import { eqRecursiveInterpreter } from './recursive'
import { eqStrMapInterpreter } from './str-map'
import { eqSetInterpreter } from './set'
import { EqURI } from '.'
export { EqURI }

export const defineEqInterpreter = InterpreterFor(EqURI)

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
