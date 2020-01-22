import { InterpreterFor } from '../common/core'
import { merge } from '../common/utils'
import { ioTsNonStrictObjectInterpreter, ioTsStrictObjectInterpreter } from './model/object'
import { IoTsURI } from '.'
import { allModelBaseIoTs } from './model'
export { IoTsURI }

export const defineIoTsInterpreter = InterpreterFor(IoTsURI)

export const modelIoTsNonStrictInterpreter = defineIoTsInterpreter(
  merge(
    allModelBaseIoTs,
    ioTsNonStrictObjectInterpreter // NonStrict
  )
)

export const modelIoTsStrictInterpreter = defineIoTsInterpreter(
  merge(
    allModelBaseIoTs,
    ioTsStrictObjectInterpreter // Strict
  )
)
