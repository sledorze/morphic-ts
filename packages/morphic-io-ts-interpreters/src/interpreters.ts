import { merge } from '@sledorze/morphic-common/lib/utils'
import { ioTsNonStrictObjectInterpreter, ioTsStrictObjectInterpreter } from './model/object'
import { allModelBaseIoTs } from './model'

/**
 *  @since 0.0.1
 */
export const modelIoTsNonStrictInterpreter = merge(allModelBaseIoTs, ioTsNonStrictObjectInterpreter)

/**
 *  @since 0.0.1
 */
export const modelIoTsStrictInterpreter = merge(allModelBaseIoTs, ioTsStrictObjectInterpreter)
