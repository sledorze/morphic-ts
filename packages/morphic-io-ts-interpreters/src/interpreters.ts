import { merge } from '@sledorze/morphic-common/lib/utils'
import { ioTsNonStrictObjectInterpreter, ioTsStrictObjectInterpreter } from './model/object'
import { IoTsURI } from '.'
import { allModelBaseIoTs } from './model'
export { IoTsURI }

export const modelIoTsNonStrictInterpreter = merge(allModelBaseIoTs, ioTsNonStrictObjectInterpreter)

export const modelIoTsStrictInterpreter = merge(allModelBaseIoTs, ioTsStrictObjectInterpreter)
