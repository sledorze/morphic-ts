import { InterpreterFor } from '../../core'
import { merge } from '../../utils'
import { fastCheckPrimitiveInterpreter } from './primitives'
import { fastCheckIntersectionInterpreter } from './intersections'
import { fastCheckObjectInterpreter } from './object'
import { fastCheckUnionInterpreter } from './unions'
import { fastCheckTaggedUnionInterpreter } from './tagged-unions'
import { fastCheckRecursiveInterpreter } from './recursive'
import { fastCheckCollectionInterpreter } from './collections'

export const defineFastCheckInterpreter = InterpreterFor('FastCheckType')

export const fastCheckInterpreter = defineFastCheckInterpreter(
  merge(
    fastCheckPrimitiveInterpreter,
    fastCheckIntersectionInterpreter,
    fastCheckObjectInterpreter,
    fastCheckUnionInterpreter,
    fastCheckTaggedUnionInterpreter,
    fastCheckRecursiveInterpreter,
    fastCheckCollectionInterpreter
  )
)
