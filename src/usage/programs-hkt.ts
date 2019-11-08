export interface Program<E, A> {}
export interface Program1<E, A> {}
export interface Program2<E, A> {}

export type Programs<E, A> = Program<E, A> & Program1<E, A> & Program2<E, A>
export type ProgramsURI = keyof Programs<any, any>

export type ProgramOf<P extends ProgramsURI, E, A> = Program<E, A>[P]
