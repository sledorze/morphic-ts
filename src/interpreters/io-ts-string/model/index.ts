import { merge } from '../../../common/utils'
import { ioTsStringPrimitiveInterpreter } from './primitives'
import { ioTsStringIntersectionInterpreter } from './intersections'
import { ioTsStringUnionInterpreter } from './unions'
import { ioTsStringTaggedUnionInterpreter } from './tagged-unions'
import { ioTsStringStrMapInterpreter } from './str-map'
import { ioTsStringSetInterpreter } from './set'
import { ioTsStringRecursiveInterpreter } from './recursive'

export const allModelBaseIoTs = merge(
  ioTsStringPrimitiveInterpreter,
  ioTsStringIntersectionInterpreter,
  ioTsStringUnionInterpreter,
  ioTsStringTaggedUnionInterpreter,
  ioTsStringStrMapInterpreter,
  ioTsStringSetInterpreter,
  ioTsStringRecursiveInterpreter
)
