import { Builder } from '../interpreters/builder'

export interface Interpreter<E, A> extends Record<keyof Interpreter<any, any>, { build: Builder<A> }> {}
export type InterpreterURI = keyof Interpreter<any, any>

export interface Interpreter1<E, A> extends Record<keyof Interpreter1<any, any>, { build: Builder<A> }> {}
export type Interpreter1URI = keyof Interpreter1<any, any>

export interface Interpreter2<E, A> extends Record<keyof Interpreter2<any, any>, { build: Builder<A> }> {}
export type Interpreter2URI = keyof Interpreter2<any, any>
