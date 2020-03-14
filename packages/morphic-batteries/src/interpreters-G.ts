import { modelGraphqlInterpreter } from '@morphic-ts/graphql-interpreters/lib/interpreters'
import { ProgramGURI } from './program-G'
import { identity } from 'fp-ts/lib/function'
import { ProgramInterpreter, Materialized } from './usage/materializer'
import { interpretable } from './usage/programs-infer'
import { ProgramType } from './usage/ProgramType'
import { Summoners } from './usage/summoner'
import { GraphQLOutputType, GraphQLNonNull } from 'graphql'

interface GInterpreter<E, A> {
  _tag: 'GInterpreter'
  build: (a: A) => A
  schema: GraphQLOutputType
}

/**
 *  @since 0.0.1
 */
export const GInterpreterURI = 'GInterpreterURI' as const
/**
 *  @since 0.0.1
 */
export type GInterpreterURI = typeof GInterpreterURI

/**
 *  @since 0.0.1
 */
export const GInterpreter: ProgramInterpreter<ProgramGURI, GInterpreterURI> = _program => {
  const program = interpretable(_program)
  const t = program(modelGraphqlInterpreter).graphql
  return {
    _tag: 'GInterpreter',
    build: identity,
    schema: t.nullable ? t.type : new GraphQLNonNull(t.type)
  }
}

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [GInterpreterURI]: GInterpreter<E, A>
  }
}
declare module './usage/ProgramType' {
  interface ProgramGInterpreters {
    [GInterpreterURI]: Summoner
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<L, A> extends Materialized<L, A, ProgramGURI, GInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<A> extends Materialized<unknown, A, ProgramGURI, GInterpreterURI> {}

/**
 *  @since 0.0.1
 */
export const AsOpaque = <E, A>(x: M<E, A>): M<E, A> => x
/**
 *  @since 0.0.1
 */
export const AsUOpaque = <A>(x: UM<A>): UM<A> => x

/**
 *  @since 0.0.1
 */
export interface MorphAs {
  <L, A>(F: ProgramType<L, A>[ProgramGURI]): M<L, A>
}
/**
 *  @since 0.0.1
 */
export interface MorphAsA {
  <A>(): <L>(F: ProgramType<L, A>[ProgramGURI]) => M<L, A>
}
/**
 *  @since 0.0.1
 */
export interface MorphAsL {
  <L>(): <A>(F: ProgramType<L, A>[ProgramGURI]) => M<L, A>
}
/**
 *  @since 0.0.1
 */
export interface Morph {
  <A>(F: ProgramType<unknown, A>[ProgramGURI]): UM<A>
}

/**
 *  @since 0.0.1
 */
export interface Summoner extends Summoners<ProgramGURI, GInterpreterURI> {
  summonAs: MorphAs
  summonAsA: MorphAsA
  summonAsL: MorphAsL
  summon: Morph
}
