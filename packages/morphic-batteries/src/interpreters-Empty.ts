/**
 *  @since 0.0.1
 */
export const EmptyInterpreterURI = 'EmptyInterpreterURI' as const
/**
 *  @since 0.0.1
 */
export type EmptyInterpreterURI = typeof EmptyInterpreterURI

interface EmptyInterpreter<_E, A> {
  build: (a: A) => A
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [EmptyInterpreterURI]: EmptyInterpreter<E, A>
  }
}
