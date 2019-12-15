export interface Program<E, A> {}
export type ProgramURI = keyof Program<any, any>

export interface Program1<E, A> {}
export type Program1URI = keyof Program1<any, any>

export interface Program2<E, A> {}
export type Program2URI = keyof Program2<any, any>

// export type Programs<E, A> = Program<E, A> & Program1<E, A> & Program2<E, A>
// export type ProgramsURI = keyof Programs<any, any>

// export type ProgramOf<P extends ProgramsURI, E, A> = Program<E, A>[P]
