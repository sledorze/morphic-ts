import { InterpreterFor } from '../../common/core'
import { ShowURI } from '.'
import { allModelShow } from './model'
export { ShowURI }

export const defineShowInterpreter = InterpreterFor(ShowURI)

export const modelShowInterpreter = defineShowInterpreter(allModelShow)
