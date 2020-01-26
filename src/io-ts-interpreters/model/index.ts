import { merge } from '../../common/utils'
import { ioTsPrimitiveInterpreter } from './primitives'
import { ioTsIntersectionInterpreter } from './intersections'
import { ioTsUnionInterpreter } from './unions'
import { ioTsTaggedUnionInterpreter } from './tagged-unions'
import { ioTsStrMapInterpreter } from './str-map'
import { ioTsSetInterpreter } from './set'
import { ioTsRecursiveInterpreter } from './recursive'
import { ioTsUnknownInterpreter } from './unknown'
import { ioTsNewtypeInterpreter } from './newtype'

export const allModelBaseIoTs = merge(
  ioTsNewtypeInterpreter,
  ioTsUnknownInterpreter,
  ioTsPrimitiveInterpreter,
  ioTsIntersectionInterpreter,
  ioTsUnionInterpreter,
  ioTsTaggedUnionInterpreter,
  ioTsStrMapInterpreter,
  ioTsSetInterpreter,
  ioTsRecursiveInterpreter
)
