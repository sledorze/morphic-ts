/**
 * A Program is expressed within an Algebra to materialize a Morph
 */
export interface Program<E, A> {}
export type ProgramURI = keyof Program<any, any>

export interface Program1<E, A> {}
export type Program1URI = keyof Program1<any, any>

export interface Program2<E, A> {}
export type Program2URI = keyof Program2<any, any>

export interface ProgramTypes {}

/***
 * Provides Program builder for the given Program type (Exposing a specific Algebra)
 */
export const makeDefines = <PURI extends ProgramURI>(prog: PURI) => {
  type Prog<E, A> = Program<E, A>[PURI]
  type Res<E, A> = AllProgram<E, A>[PURI]
  const defineAs = <E, A>(program: Prog<E, A>): Res<E, A> => program as any // White lie
  const define = <A>(program: Prog<unknown, A>): Res<unknown, A> => program as any
  return { define, defineAs }
}
