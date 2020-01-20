import { InterpreterFor } from '../common/core'
import { EqURI } from '.'
import { allModelEq } from './model-eq'
export { EqURI }

export const defineEqInterpreter = InterpreterFor(EqURI)

export const modelEqInterpreter = defineEqInterpreter(allModelEq)
