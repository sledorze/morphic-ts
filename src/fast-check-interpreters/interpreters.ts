import { InterpreterFor } from '../common/core'
import { FastCheckURI } from './index'
import { allModelFastCheck } from './model'
export { FastCheckURI }

export const defineFastCheckInterpreter = InterpreterFor(FastCheckURI)

export const modelFastCheckInterpreter = defineFastCheckInterpreter(allModelFastCheck)
