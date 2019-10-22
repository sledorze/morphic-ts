import * as t from 'io-ts'
import { InterpreterFor2 } from '../../core'
import { merge } from '../../utils'
import { ioTsStringPrimitiveInterpreter } from './primitives'
import { ioTsStringIntersectionInterpreter } from './intersections'
import { ioTsStringUnionInterpreter } from './unions'
import { ioTsStringTaggedUnionInterpreter } from './tagged-unions'
import { ioTsStringSetInterpreter } from './collections'
import { ioTsStringRecursiveInterpreter } from './recursive'
import { ioTsStringNonStrictObjectInterpreter } from './object'

export type IOTypes<Props> = { [k in keyof Props]: t.Type<Props[k], unknown> }

const base = merge(
  ioTsStringPrimitiveInterpreter,
  ioTsStringIntersectionInterpreter,
  ioTsStringUnionInterpreter,
  ioTsStringTaggedUnionInterpreter,
  ioTsStringSetInterpreter,
  ioTsStringRecursiveInterpreter
)

export const defineIoTsStringInterpreter = InterpreterFor2('IOTSStringType')

export const ioTsStringNonStrict = defineIoTsStringInterpreter(
  merge(
    base,
    ioTsStringNonStrictObjectInterpreter // NonStrict
  )
)
