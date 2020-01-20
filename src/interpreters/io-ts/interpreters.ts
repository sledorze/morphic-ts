import { InterpreterFor } from '../../common/core'
import { IoTsURI } from '.'
import { merge } from '../../common/utils'
import { ioTsStrictObjectInterpreter, ioTsNonStrictObjectInterpreter } from './model/object'
import { allModelBaseIoTs } from './model'

export const defineIoTsInterpreter = InterpreterFor(IoTsURI)

export const modelIoTsStrictInterpreter = defineIoTsInterpreter(
  merge(
    allModelBaseIoTs,
    ioTsStrictObjectInterpreter // Strict
  )
)

export const modelIoTsNonStrictInterpreter = defineIoTsInterpreter(
  merge(
    allModelBaseIoTs,
    ioTsNonStrictObjectInterpreter // NonStrict
  )
)
