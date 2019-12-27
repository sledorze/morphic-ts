/**
 * A Program is expressed within an Algebra to materialize a Morph
 */
export interface Program<E, A> {}
export type ProgramURI = keyof Program<any, any>

export const interpretSymb = Symbol()
export const interpretable = <T extends { [interpretSymb]?: any }>(program: T): NonNullable<T[typeof interpretSymb]> =>
  program as NonNullable<T[typeof interpretSymb]>

export interface ProgramTypes {}

/***
 * Provides Program builder for the given Program type (Exposing a specific Algebra)
 */
export const makeDefines = <PURI extends ProgramURI>(prog: PURI) => {
  type Prog<E, A> = Program<E, A>[PURI]
  type Res<E, A> = NonNullable<Prog<E, A>[typeof interpretSymb]>
  const defineAs = <E, A>(program: Prog<E, A>): Res<E, A> => program as any // White lie
  const define = <A>(program: Prog<unknown, A>): Res<unknown, A> => program as any
  return { define, defineAs }
}
