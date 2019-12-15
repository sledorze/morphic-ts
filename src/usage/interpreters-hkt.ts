export interface Interpreter<E, A> {}
export type InterpreterURI = keyof Interpreter<any, any>

export interface Interpreter1<E, A> {}
export type Interpreter1URI = keyof Interpreter1<any, any>

export interface Interpreter2<E, A> {}
export type Interpreter2URI = keyof Interpreter2<any, any>

// export type Interpreters<E, A> = Interpreter<E, A> & Interpreter1<E, A> & Interpreter2<E, A>
// export type InterpretersURI = keyof Interpreters<any, any>
