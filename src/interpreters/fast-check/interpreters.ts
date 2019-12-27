import { InterpreterFor } from '../../core'
import { merge } from '../../utils'
import { fastCheckPrimitiveInterpreter } from './primitives'
import { fastCheckIntersectionInterpreter } from './intersections'
import { fastCheckObjectInterpreter } from './object'
import { fastCheckUnionInterpreter } from './unions'
import { fastCheckTaggedUnionInterpreter } from './tagged-unions'
import { fastCheckRecursiveInterpreter } from './recursive'
import { fastCheckStrMapInterpreter } from './str-map'
import { fastCheckSetInterpreter } from './set'
import { FastCheckURI } from './index'
export { FastCheckURI }

export const defineFastCheckInterpreter = InterpreterFor(FastCheckURI)

export const fastCheckInterpreter = defineFastCheckInterpreter(
  merge(
    fastCheckPrimitiveInterpreter,
    fastCheckIntersectionInterpreter,
    fastCheckObjectInterpreter,
    fastCheckUnionInterpreter,
    fastCheckTaggedUnionInterpreter,
    fastCheckRecursiveInterpreter,
    fastCheckStrMapInterpreter,
    fastCheckSetInterpreter
  )
)
