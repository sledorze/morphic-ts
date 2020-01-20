import { InterpreterFor } from '../common/core'
import { merge } from '../common/utils'
import { ioTsStringNonStrictObjectInterpreter } from './model/object'
import { IoTsStringURI } from '.'
import { allModelBaseIoTs } from './model'
export { IoTsStringURI }

export const defineIoTsStringInterpreter = InterpreterFor(IoTsStringURI)

export const modelIoTsStringNonStrictInterpreter = defineIoTsStringInterpreter(
  merge(
    allModelBaseIoTs,
    ioTsStringNonStrictObjectInterpreter // NonStrict
  )
)
