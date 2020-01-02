import { ProgramType, ProgramURI } from './programs-hkt'
import { InterpreterResult, InterpreterURI } from './interpreters-hkt'
import { assignFunction, TagsOf } from '../common'
import { ADT, KeysDefinition, makeADT } from '../adt'
import { MonocleFor } from '../adt/monocle'

export interface ProgramInterpreter<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <E, A>(program: ProgramType<E, A>[ProgURI]): InterpreterResult<E, A>[InterpURI]
}
export type InterpreterURIOfProgramInterpreter<X extends ProgramInterpreter<any, any>> = X extends ProgramInterpreter<
  any,
  infer R
>
  ? R
  : never

type Morph<E, A, InterpURI extends InterpreterURI, ProgURI extends ProgramURI> = InterpreterResult<E, A>[InterpURI] &
  ProgramType<E, A>[ProgURI]

const assignCallable = <C, F extends Function & C, D>(F: F, d: D): F & C & D =>
  assignFunction(F, Object.assign({}, F, d))

const wrapFun = <A, B, X>(g: ((a: A) => B) & X): typeof g => ((x: any) => g(x)) as any

function interpreteWithProgram<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Morph<E, A, InterpURI, ProgURI> & InhabitedTypes<E, A> {
  return inhabitTypes(assignFunction(wrapFun(program), programInterpreter(program)))
}

/**
 * Fake inhabitation of types
 */
const inhabitTypes = <E, A, T>(t: T): T & InhabitedTypes<E, A> => t as any

export type MorphADT<
  E,
  A,
  Tag extends TagsOf<A> & string,
  ProgURI extends ProgramURI,
  InterpURI extends InterpreterURI
> = ADT<A, Tag> & Morph<E, A, InterpURI, ProgURI>

export interface TaggableAsADT<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  tagged: <Tag extends TagsOf<A> & string>(
    tag: Tag
  ) => (keys: KeysDefinition<A, Tag>) => MorphADT<E, A, Tag, ProgURI, InterpURI>
}

export type Materialized<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI> = Morph<
  E,
  A,
  InterpURI,
  ProgURI
> &
  MonocleFor<A> &
  TaggableAsADT<E, A, ProgURI, InterpURI> &
  InhabitedTypes<E, A>

export interface InhabitedTypes<E, A> {
  // tslint:disable-next-line: no-unused-expression
  _E: E
  // tslint:disable-next-line: no-unused-expression
  _A: A
}
export type AType<X extends InhabitedTypes<any, any>> = X['_A']
export type EType<X extends InhabitedTypes<any, any>> = X['_E']

export function materialize<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  program: ProgramType<E, A>[ProgURI],
  programInterpreter: ProgramInterpreter<ProgURI, InterpURI>
): Materialized<E, A, ProgURI, InterpURI> {
  return withTaggableAndMonocle(interpreteWithProgram(program, programInterpreter))
}

/**
 * Expose tagged functions in addition to the type derived facilities
 */
function asADT<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  m: Morph<E, A, InterpURI, ProgURI>
): <Tag extends TagsOf<A> & string>(tag: Tag, keys: KeysDefinition<A, Tag>) => MorphADT<E, A, Tag, ProgURI, InterpURI> {
  return (tag, keys) =>
    assignCallable(wrapFun(m), {
      ...m,
      ...makeADT(tag)(keys)
    })
}

function withTaggableAndMonocle<E, A, ProgURI extends ProgramURI, InterpURI extends InterpreterURI>(
  morphes: Morph<E, A, InterpURI, ProgURI> & InhabitedTypes<E, A>
): Materialized<E, A, ProgURI, InterpURI> {
  const tagged = <Tag extends TagsOf<A> & string>(tag: Tag) => (keys: KeysDefinition<A, Tag>) =>
    asADT(res as Morph<E, A, InterpURI, ProgURI>)(tag, keys)
  const res: Materialized<E, A, ProgURI, InterpURI> = assignCallable(morphes, {
    tagged,
    ...MonocleFor<A>()
  })
  return res
}
