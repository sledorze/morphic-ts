import { InterpreterFor } from '../../common/core'
import { OrdURI } from '.'
import { allModelOrd } from './model'
export { OrdURI }

export const defineOrdInterpreter = InterpreterFor(OrdURI)

export const modelOrdInterpreter = defineOrdInterpreter(allModelOrd)
