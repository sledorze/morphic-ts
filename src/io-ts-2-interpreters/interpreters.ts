import { InterpreterFor } from '../common/core'
import { merge } from '../common/utils'
import { ioTs2NonStrictObjectInterpreter, ioTs2StrictObjectInterpreter } from './model/object'
import { IoTs2URI } from '.'
import { allModelBaseIoTs } from './model'
export { IoTs2URI }

export const defineIoTs2Interpreter = InterpreterFor(IoTs2URI)

export const modelIoTs2NonStrictInterpreter = defineIoTs2Interpreter(
  merge(
    allModelBaseIoTs,
    ioTs2NonStrictObjectInterpreter // NonStrict
  )
)

export const modelIoTs2StrictInterpreter = defineIoTs2Interpreter(
  merge(
    allModelBaseIoTs,
    ioTs2StrictObjectInterpreter // Strict
  )
)
