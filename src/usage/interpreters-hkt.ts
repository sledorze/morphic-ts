import { Builder } from '../interpreters/builder'

export interface Interpreter<E, A> extends Record<string, { build: Builder<A> }> {}
export type InterpreterURI = Interpreter1URI & Interpreter2URI // keyof Interpreter<any, any>

export interface Interpreter1<E, A> {}
export type Interpreter1URI = keyof Interpreter1<any, any>

export interface Interpreter2<E, A> {}
export type Interpreter2URI = keyof Interpreter2<any, any>

// export type Interpreters<E, A> = Interpreter<E, A> & Interpreter1<E, A> & Interpreter2<E, A>
// export type InterpretersURI = keyof Interpreters<any, any>
