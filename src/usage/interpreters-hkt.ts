import { Builder } from '../interpreters/builder'

export interface Interpreter<E, A> extends Record<keyof Interpreter<any, any>, { build: Builder<A> }> {}
export type InterpreterURI = keyof Interpreter<any, any>
