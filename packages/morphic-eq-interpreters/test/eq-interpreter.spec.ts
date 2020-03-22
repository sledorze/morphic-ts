import * as chai from 'chai'

import { ProgramInterpreter, Materialized } from '@morphic-ts/batteries/lib/usage/materializer'
import { makeSummoner, Summoners } from '@morphic-ts/batteries/lib/usage/summoner'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import { ProgramNoUnionURI } from '@morphic-ts/batteries/lib/program-no-union'
import { modelEqInterpreter } from '../src/interpreters'
import { Eq } from 'fp-ts/lib/Eq'
import * as eq from 'fp-ts/lib/Eq'
import { interpretable } from '@morphic-ts/batteries/lib/usage/programs-infer'
import { ProgramType } from '@morphic-ts/batteries/lib/usage/ProgramType'
import { Newtype, iso } from 'newtype-ts'
import { eqConfig } from '../src/index'

export const EqInterpreterURI = 'EqInterpreterURI' as const
export type EqInterpreterURI = typeof EqInterpreterURI

interface EqInterpreter<A> {
  eq: Eq<A>
}

declare module '@morphic-ts/batteries/lib/usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [EqInterpreterURI]: EqInterpreter<A>
  }
}
declare module '@morphic-ts/batteries/lib/usage/ProgramType' {
  interface ProgramNoUnionInterpreters {
    [EqInterpreterURI]: Summoner
  }
}

const eqInterp: ProgramInterpreter<ProgramNoUnionURI, EqInterpreterURI> = _program => {
  const program = interpretable(_program)
  return {
    eq: program(modelEqInterpreter).eq
  }
}

/** Type level override to keep Morph type name short */
export interface M<L, A> extends Materialized<L, A, ProgramNoUnionURI, EqInterpreterURI> {}
export interface UM<A> extends Materialized<unknown, A, ProgramNoUnionURI, EqInterpreterURI> {}

export interface Morph {
  <L, A>(F: ProgramType<L, A>[ProgramNoUnionURI]): M<L, A>
}

export interface Summoner extends Summoners<ProgramNoUnionURI, EqInterpreterURI>, Morph {}

const { summon } = makeSummoner<Summoner>(cacheUnaryFunction, eqInterp)

describe('Eq', () => {
  it('newtype', () => {
    interface Test extends Newtype<{ readonly Test: unique symbol }, string> {}
    const isoTest = iso<Test>()

    const { eq } = summon(F => F.newtype<Test>('Test')(F.string()))

    const testA = isoTest.wrap('a')
    const testB = isoTest.wrap('b')
    chai.assert.strictEqual(eq.equals(testA, testA), true)
    chai.assert.strictEqual(eq.equals(testA, testB), false)
  })

  it('unknown', () => {
    const { eq } = summon(F => F.unknown())
    chai.assert.strictEqual(eq.equals('a', 'a'), true)
    chai.assert.strictEqual(eq.equals('a', 'b'), false)
    const arr1 = ['a', 'b']
    const arr2 = ['a', 'b']
    chai.assert.strictEqual(eq.equals(arr1, arr1), true)
    chai.assert.strictEqual(eq.equals(arr1, arr2), true)
  })

  it('recursive compare of circular unknown', () => {
    const { eq } = summon(F => F.unknown(eqConfig({ compare: 'default-circular' })))

    const recDataA = {
      a: 'a',
      b: null as any
    }
    recDataA.b = recDataA

    const recDataB = {
      a: 'b',
      b: null as any
    }
    recDataB.b = recDataB

    chai.assert.strictEqual(eq.equals(recDataA, recDataA), true)
    chai.assert.strictEqual(eq.equals(recDataA, recDataB), false)
  })

  it('recursive compare of non-circular unknown', () => {
    let calls = 0
    const compare = eq.fromEquals((_a, _b) => {
      calls += 1
      return true
    })
    const morph = summon(F => F.unknown(eqConfig({ compare })))

    const recDataA = {
      a: 'a',
      b: null as any
    }
    recDataA.b = recDataA

    const recDataB = {
      a: 'b',
      b: null as any
    }
    recDataB.b = recDataB

    chai.assert.strictEqual(morph.eq.equals(recDataA, recDataA), true)
    chai.assert.strictEqual(morph.eq.equals(recDataA, recDataB), true)
    chai.assert.strictEqual(morph.eq.equals(recDataB, recDataA), true)
    chai.assert.strictEqual(calls, 2) // 2 because eq.fromEquals does a reference comparison automatically
  })

  it('returns false when comparing incomplete values', () => {
    const Foo = eqInterp(F =>
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
    chai.assert.strictEqual(eq.equals({ date, a: '' }, { date } as any), false)
  })

  it('eq', () => {
    const Foo = summon(F =>
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
    const Foo = summon(F =>
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
    const Foo = summon(F =>
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
    const Foo = summon<unknown, Foo>(F =>
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
    const Bar = summon<unknown, Bar>(F =>
      F.interface(
        {
          type: F.stringLiteral('bar'),
          c: F.string(),
          d: F.number()
        },
        'Bar'
      )
    )

    const FooBar = summon(F =>
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
