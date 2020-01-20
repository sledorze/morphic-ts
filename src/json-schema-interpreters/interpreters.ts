import { InterpreterFor } from '../common/core'
import { JsonSchemaURI } from '.'
import { allModelJsonSchema } from './model'
export { JsonSchemaURI }

export const defineJsonSchemaInterpreter = InterpreterFor(JsonSchemaURI)

export const modelJsonSchemaInterpreter = defineJsonSchemaInterpreter(allModelJsonSchema)
