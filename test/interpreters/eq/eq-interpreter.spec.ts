import * as chai from 'chai'

import {
  Materialized,
  materialize,
  InhabitedTypes,
  ProgramInterpreterRaw1,
  ProgramInterpreterRaw2
} from '../../../src/usage/materializer'
import { makeSummoner } from '../../../src/usage/summoner'
import { cacheUnaryFunction } from '../../../src/core'

import {
  ProgramNoUnionURI,
  AlgebraNoUnion,
  AlgebraNoUnion1,
  AlgebraNoUnion2
} from '../../../src/utils/program-no-union'
import { ESBASTJInterpreter, ESBASTJInterpreterURI } from '../../../src/utils/interpreters-ESBAST'
import { eqInterpreter, URI } from '../../../src/interpreters/eq/interpreters'
import {
  Program,
  Program1,
  Program1URI,
  AllProgram,
  Program2,
  Program2URI,
  ProgramURI
} from '../../../src/usage/programs-hkt'
import {
  Interpreters,
  Interpreter1URI,
  Interpreter1,
  Interpreter2,
  Interpreter,
  Interpreter2URI
} from '../../../src/usage/interpreters-hkt'
import { Eq } from 'fp-ts/lib/Eq'
import { HKT2, Kind, URIS, URIS2, Kind2 } from '../../../src/HKT'
import { PrimitiveStringConfig } from '../../../src/algebras/hkt'
import { showInterpreter } from '../../../src/interpreters/show/interpreters'

// export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, ESBASTJInterpreterURI> {}

// export interface Prog<L, A> extends Program<ESBASTJInterpreterURI, L, A> {}

// interface Summons {
//   summonAs: <L, A>(F: Prog<L, A>) => M<L, A>
//   summonAsA: <A>() => <L>(F: Prog<L, A>) => M<L, A>
//   summonAsL: <L>() => <A>(F: Prog<L, A>) => M<L, A>
//   summon: <A>(F: Prog<unknown, A>) => M<unknown, A>
// }

// const { summonAs, summonAsA, summonAsL, summon } = makeSummoner(cacheUnaryFunction, ESBASTJInterpreter) as Summons

// export { summonAs, summonAsA, summonAsL, summon }

export type EqInterpreterURI = 'EqInterpreterURI'

interface EqInterpreter<A> {
  eq: Eq<A>
}

declare module '../../../src/usage/interpreters-hkt' {
  interface Interpreter<E, A> {
    EqInterpreterURI: EqInterpreter<A>
  }
  interface Interpreter1<E, A> {
    EqInterpreterURI: EqInterpreter<A>
  }
}

const makeDefines = <PURI extends ProgramURI>(prog: PURI) => {
  type Prog<E, A> = Program<E, A>[PURI]
  type Res<E, A> = AllProgram<E, A>[PURI]
  const defineAs = <E, A>(program: Prog<E, A>): Res<E, A> => program as any // White lie
  const define = <A>(program: Prog<unknown, A>): Res<unknown, A> => program as any
  return { define, defineAs }
}

const { define, defineAs } = makeDefines('ProgramNoUnion')

const eqInterp: ProgramInterpreterRaw1<ProgramNoUnionURI, EqInterpreterURI> = program => ({
  eq: program(eqInterpreter).eq
})

const ee = eqInterp(F => F.array(F.string()))
const myRes = define(F => F.array(F.string()))
const ezzz = eqInterp(myRes)

// eqInterpreter
interface TTT {
  a: string
}
const p = define<TTT>(F =>
  F.interface(
    {
      a: F.string()
    },
    'Toto'
  ))
const p1 = define<TTT>(F =>
  F.interface(
    {
      a: F.string()
    },
    'Toto'
  ))
const res = eqInterp(p)
const res1 = eqInterp(p1)

const summonAs = eqInterp // <E, A>(program: Program1<E, A>[ProgramNoUnionURI]) => program(eqInterpreter)
const summon = eqInterp // <A>(program: Program1<unknown, A>[ProgramNoUnionURI]) => program(eqInterpreter)
describe('Eq', () => {
  it('returns false when comparing incomplete values', () => {
    const Foo = eqInterp(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string({ EqType: undefined })
        },
        'Foo'
      )
    )

    const { eq } = Foo

    const date = new Date(12345)
    chai.assert.strictEqual(eq.equals({ date, a: '' }, { date } as any), false)
  })

  it('eq', () => {
    const Foo = summonAs(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string()
        },
        'Foo'
      )
    )

    const { eq } = Foo

    const date = new Date(12345)
    const date2 = new Date(12346)
    chai.assert.strictEqual(eq.equals({ date, a: '' }, { date, a: '' }), true)
    chai.assert.strictEqual(eq.equals({ date, a: '' }, { date: date2, a: '' }), false)
  })

  it('eq', () => {
    const Foo = summonAs(F =>
      F.interface(
        {
          dates: F.array(
            F.interface(
              {
                date: F.date()
              },
              'HasDate'
            )
          ),
          a: F.string()
        },
        'Foo'
      )
    )

    const { eq } = Foo

    const date = new Date(12345)
    const date2 = new Date(12346)
    chai.assert.strictEqual(
      eq.equals({ dates: [{ date }, { date }], a: '' }, { dates: [{ date }, { date }], a: '' }),
      true
    )

    chai.assert.strictEqual(
      eq.equals({ dates: [{ date: date2 }, { date }], a: '' }, { dates: [{ date }, { date: date2 }], a: '' }),
      false
    )
  })

  it('partial', () => {
    interface Foo {
      type: 'foo'
      a: string
      b: number
    }
    const Foo = summonAs(F =>
      F.partial(
        {
          type: F.stringLiteral('foo'),
          a: F.string(),
          b: F.number()
        },
        'Foo'
      )
    )

    const { eq } = Foo
    chai.assert.deepStrictEqual(eq.equals({}, {}), true)
    chai.assert.deepStrictEqual(eq.equals({ type: 'foo' }, { type: 'foo' }), true)
    chai.assert.deepStrictEqual(eq.equals({ type: 'foo' }, { type: 'foo', a: 'foo' }), false)
    chai.assert.deepStrictEqual(eq.equals({ type: 'foo', a: 'foo' }, { type: 'foo' }), false)
    chai.assert.deepStrictEqual(eq.equals({ type: 'foo' }, { a: 'foo' }), false)
    chai.assert.deepStrictEqual(eq.equals({}, { type: 'foo' }), false)
    chai.assert.deepStrictEqual(eq.equals({ type: 'foo' }, {}), false)
  })

  it('taggedUnion', () => {
    interface Foo {
      type: 'foo'
      a: string
      b: number
    }
    const Foo: EqInterpreter<Foo> = summon(F =>
      F.interface(
        {
          type: F.stringLiteral('foo'),
          a: F.string(),
          b: F.number()
        },
        'Foo'
      )
    )

    interface Bar {
      type: 'bar'
      c: string
      d: number
    }
    const Bar: EqInterpreter<Bar> = summon(F =>
      F.interface(
        {
          type: F.stringLiteral('bar'),
          c: F.string(),
          d: F.number()
        },
        'Bar'
      )
    )

    const FooBar = summonAs(F =>
      F.taggedUnion(
        'type',
        {
          foo: Foo(F),
          bar: Bar(F)
        },
        'FooBar'
      )
    )

    const eq = FooBar.eq

    const fooA: Foo | Bar = { type: 'foo', a: 'a', b: 12 }
    const fooB: Foo | Bar = { type: 'foo', a: 'b', b: 12 }
    const fooC: Foo | Bar = { type: 'foo', a: 'a', b: 12 }

    const barA: Foo | Bar = { type: 'bar', c: 'a', d: 12 }
    const barB: Foo | Bar = { type: 'bar', c: 'b', d: 12 }

    chai.assert.deepStrictEqual(eq.equals(fooA, fooA), true)
    chai.assert.deepStrictEqual(eq.equals(fooA, fooC), true)
    chai.assert.deepStrictEqual(eq.equals(fooA, fooB), false)
    chai.assert.deepStrictEqual(eq.equals(fooA, barA), false)
    chai.assert.deepStrictEqual(eq.equals(barA, barB), false)
    chai.assert.deepStrictEqual(eq.equals(barB, barB), true)
  })
})
