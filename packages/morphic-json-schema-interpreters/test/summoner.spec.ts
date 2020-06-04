import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import type * as U from '@morphic-ts/summoners'
import type { ExtractEnv, SummonerOps } from '@morphic-ts/summoners'
import { makeSummoner } from '@morphic-ts/summoners'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

import type { InferredAlgebra, InferredProgram } from '@morphic-ts/summoners'
import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'

import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { UnionsURI } from '@morphic-ts/model-algebras/lib/unions'
import type { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { AnyConfigEnv } from '@morphic-ts/summoners'
import { Either, chain } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { JsonSchemaError } from '../src/json-schema/json-schema-ctors'
import { JSONSchema } from '../src/json-schema/json-schema'
import { NamedSchemas, JsonSchemaURI } from '../src/hkt'
import { resolveSchema } from '../src/utils'
import { modelJsonSchemaInterpreter } from '../src'
import { pipe } from 'fp-ts/lib/pipeable'
/**
 *  @since 0.0.1
 */
export const ProgramUnionURI = 'ProgramUnionURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramUnionURI = typeof ProgramUnionURI

/**
 *  @since 0.0.1
 */
export interface AlgebraUnion<F, Env> extends InferredAlgebra<F, ProgramUnionURI, Env> {}
/**
 *  @since 0.0.1
 */
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramUnionURI> {}

declare module '@morphic-ts/summoners/lib/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramUnionURI]: GetAlgebra<
      | PrimitiveURI
      | IntersectionURI
      | ObjectURI
      | RecursiveURI
      | SetURI
      | StrMapURI
      | TaggedUnionsURI
      | UnionsURI
      | UnknownURI
      | NewtypeURI
      | RefinedURI
    >
  }
  interface ProgramAlgebra<F, Env> {
    [ProgramUnionURI]: AlgebraUnion<F, Env>
  }
  interface ProgramType<R extends AnyConfigEnv, E, A> {
    [ProgramUnionURI]: P<R, E, A>
  }
  interface ProgramUnionInterpreters {}
}

/**
 *  @since 0.0.1
 */
export const JsonSchemaTestURI = 'JsonSchemaTestURI' as const
/**
 *  @since 0.0.1
 */
export type JsonSchemaTestURI = typeof JsonSchemaTestURI

interface JsonSchemaTestInterpreter<_E, A> {
  build: (a: A) => A
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, [JSONSchema, NamedSchemas]>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [JsonSchemaTestURI]: JsonSchemaTestInterpreter<E, A>
  }
}

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, JsonSchemaTestURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<R, A> extends M<R, {}, A> {}

/**
 *  @since 0.0.1
 */
export const AsOpaque = <E, A>() => <X extends M<any, E, A>>(x: X): M<X['_R'], E, A> => x
/**
 *  @since 0.0.1
 */
export const AsUOpaque = <A>() => <X extends UM<any, A>>(x: X): UM<X['_R'], A> => x

/**
 *  @since 0.0.1
 */
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramUnionURI, JsonSchemaTestURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(env: ExtractEnv<R, JsonSchemaURI>) => SummonerOps<Summoner<R>> = <
  R extends AnyConfigEnv = {}
>(
  env: ExtractEnv<R, JsonSchemaURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: a => a,
    jsonSchema: pipe(program(modelJsonSchemaInterpreter<NonNullable<R>>())(env).schema({}), chain(resolveSchema))
  }))

describe('Test summoner', () => {
  it('exists', () => {
    1 === 1
  })
})
