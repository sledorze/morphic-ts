export interface InterpreterResult<E, A> extends Record<keyof InterpreterResult<any, any>, { build: (x: A) => A }> {}
export type InterpreterURI = keyof InterpreterResult<any, any>

export type InterpreterOf<E, A, Interp extends InterpreterURI> = InterpreterResult<E, A>[Interp]
