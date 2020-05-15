import { Create } from './create'

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
  create: Create<A>
}

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [EmptyInterpreterURI]: EmptyInterpreter<E, A>
  }
}
