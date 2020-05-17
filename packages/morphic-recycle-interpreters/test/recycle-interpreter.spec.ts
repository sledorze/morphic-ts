import * as chai from 'chai'

import { Materialized } from '@morphic-ts/batteries/lib/usage/materializer'
import { makeSummoner, Summoners, AnyConfigEnv, ExtractEnv } from '@morphic-ts/batteries/lib/usage/summoner'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'

import { ProgramNoUnionURI } from '@morphic-ts/batteries/lib/program-no-union'
import { modelRecycleInterpreter } from '../src/interpreters'
import { ProgramType } from '@morphic-ts/batteries/lib/usage/ProgramType'
import { Newtype, iso } from 'newtype-ts'
import { RecycleURI } from '../src/index'
import { left, right, Either, isRight, isLeft } from 'fp-ts/lib/Either'
import { option as O } from 'fp-ts'
import { Recycle, fromRecycle } from '../src/recycle'

export const RecycleInterpreterURI = 'RecycleInterpreterURI' as const
export type RecycleInterpreterURI = typeof RecycleInterpreterURI

interface RecycleInterpreter<A> {
  build: (a: A) => A
  recycle: Recycle<A>
}

declare module '@morphic-ts/batteries/lib/usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [RecycleInterpreterURI]: RecycleInterpreter<A>
  }
}

/** Type level override to keep Morph type name short */
export interface M<R, L, A> extends Materialized<R, L, A, ProgramNoUnionURI, RecycleInterpreterURI> {}
export interface UM<R, A> extends Materialized<R, {}, A, ProgramNoUnionURI, RecycleInterpreterURI> {}

interface Summoner<R> extends Summoners<ProgramNoUnionURI, RecycleInterpreterURI, R> {
  <L, A>(F: ProgramType<R, L, A>[ProgramNoUnionURI]): M<R, L, A>
}

export const summonFor = <R extends AnyConfigEnv = {}>(env: ExtractEnv<R, RecycleURI>) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ({
    build: a => a,
    recycle: program(modelRecycleInterpreter<NonNullable<R>>())(env).recycle
  }))

const { summon } = summonFor<{}>({})

const mustRecycle = <A>({ recycle }: Recycle<A>) => (a: A, b: A) => chai.assert.strictEqual(recycle(a, b), a)
const mustNotRecycle = <A>({ recycle }: Recycle<A>) => (a: A, b: A) => chai.assert.strictEqual(recycle(a, b), b)

const makeRecycler = <A>(recycle: Recycle<A>) => ({
  recycle,
  mustRecycle: mustRecycle(recycle),
  mustNotRecycle: mustNotRecycle(recycle)
})

describe('Recycle', () => {
  it('bigInt', () => {
    const { recycle } = summon(F => F.bigint())
    const a = BigInt(10)
    const aBis = BigInt(10)
    const b = BigInt(11)
    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)
    mustRecycle(a, aBis)
    mustNotRecycle(a, b)
  })

  it('newtype', () => {
    interface Test extends Newtype<{ readonly Test: unique symbol }, string> {}
    const isoTest = iso<Test>()

    const { recycle } = summon(F => F.newtype<Test>('Test')(F.string()))

    const testA = isoTest.wrap('a')
    const testABis = isoTest.wrap('a')
    const testB = isoTest.wrap('b')

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle(testA, testABis)
    mustNotRecycle(testA, testB)
  })

  it('unknown', () => {
    const { recycle } = summon(F => F.unknown())
    const a = { x: 12 }
    const abis = { x: 12 }
    const b = { y: '12' }

    const { mustNotRecycle } = makeRecycler(recycle)

    mustNotRecycle(a, b)
    // TODO: this is the default; we may add a generic unknown based compare thing..
    mustNotRecycle(a, abis)
  })

  it('recursive compare of circular unknown', () => {
    const { recycle } = summon(F => F.unknown({ RecycleURI: recycle => recycle }))

    const recDataA = {
      a: 'a',
      b: null as any
    }
    recDataA.b = recDataA

    const recDataABis = {
      a: 'a',
      b: null as any
    }
    recDataABis.b = recDataABis

    const recDataB = {
      a: 'b',
      b: null as any
    }
    recDataB.b = recDataB

    const { mustNotRecycle } = makeRecycler(recycle)

    // TODO: this is the default; we may add a generic unknown based compare thing..
    mustNotRecycle(recDataA, recDataABis)
    mustNotRecycle(recDataA, recDataB)
  })

  it('recursive compare of non-circular unknown', () => {
    let calls = 0

    const recycleF = fromRecycle((_prev, next) => {
      calls += 1
      return next
    })

    const { recycle } = summon(F => F.unknown({ RecycleURI: _ => recycleF }))

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

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle(recDataA, recDataA)
    mustNotRecycle(recDataA, recDataB)
    mustNotRecycle(recDataB, recDataA)
    chai.assert.strictEqual(calls, 2) // 2 because recycle should do a reference comparison automatically
  })

  it('returns next when comparing incomplete values', () => {
    const Foo = summon(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string()
        },
        'Foo'
      )
    )

    const { recycle } = Foo

    const date = new Date(12345)

    const { mustNotRecycle } = makeRecycler(recycle)
    mustNotRecycle({ date, a: '' }, { date } as any)
  })

  it('recycle', () => {
    const Foo = summon(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string()
        },
        'Foo'
      )
    )

    const { recycle } = Foo

    const date = new Date(12345)
    const date2 = new Date(12346)
    const a = { date, a: '' }
    const aBis = { date, a: '' }
    const b = { date: date2, a: '' }

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle(a, aBis)
    mustNotRecycle(a, b)
  })

  it('recycle', () => {
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

    const { recycle } = Foo

    const date = new Date(12345)
    const date2 = new Date(12346)

    const a = { dates: [{ date }, { date }], a: '' }
    const aBis = { dates: [{ date }, { date }], a: '' }
    const b = { dates: [{ date }, { date: date2 }], a: '' }

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle(a, aBis)
    mustNotRecycle(a, b)
  })

  it('interface', () => {
    interface Foo {
      a: O.Option<string>
      b: O.Option<number>
    }
    const Foo = summon(F =>
      F.interface(
        {
          a: F.nullable(F.string()),
          b: F.nullable(F.number())
        },
        'Foo'
      )
    )

    const { recycle } = Foo

    const a = O.some('a')
    const aBis = O.some('a')
    const b = O.some('b')
    const one = O.some(1)
    const two = O.some(2)

    const fooA1 = Foo.build({ a, b: one })
    const fooA1Bis = Foo.build({ a: aBis, b: one })

    // recycle member from previous, all values structurally equals
    const r1 = recycle.recycle(fooA1, fooA1Bis)
    chai.assert.notStrictEqual(r1, fooA1Bis)
    chai.assert.strictEqual(r1.a, a)
    chai.assert.strictEqual(r1.b, one)

    const fooA2 = Foo.build({ a: aBis, b: two })
    // recycle member from previous, all values not structurally equals
    const r2 = recycle.recycle(fooA1, fooA2)
    chai.assert.notStrictEqual(r2, fooA2)
    chai.assert.strictEqual(r2.a, a)
    chai.assert.strictEqual(r2.b, two)

    // Nominal case (different)
    const fooB = Foo.build({ a: b, b: one })
    const r3 = recycle.recycle(fooA2, fooB)
    chai.assert.strictEqual(r3, fooB)
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

    const { recycle } = Foo

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle({}, {})
    mustRecycle({ type: 'foo' }, { type: 'foo' })
    mustNotRecycle({ type: 'foo' }, { type: 'foo', a: 'foo' })
    mustNotRecycle({ type: 'foo', a: 'foo' }, { type: 'foo' })
    mustNotRecycle({ type: 'foo' }, { a: 'foo' })
    mustNotRecycle({}, { type: 'foo' })
    mustNotRecycle({ type: 'foo' }, {})
  })

  it('partial deep', () => {
    interface Foo {
      a: O.Option<string>
      b: O.Option<number>
    }
    const Foo = summon(F =>
      F.partial(
        {
          a: F.nullable(F.string()),
          b: F.nullable(F.number()),
          c: F.string()
        },
        'Foo'
      )
    )

    const { recycle } = Foo

    const a = O.some('a')
    const aBis = O.some('a')
    const b = O.some('b')
    const one = O.some(1)
    const two = O.some(2)

    const fooA1 = Foo.build({ a, b: one, c: 'c' })
    const fooA1Bis = Foo.build({ a: aBis, b: one, c: 'c' })

    // recycle member from previous, all values structurally equals
    const r1 = recycle.recycle(fooA1, fooA1Bis)
    chai.assert.notStrictEqual(r1, fooA1Bis)
    chai.assert.strictEqual(r1.a, a)
    chai.assert.strictEqual(r1.b, one)
    chai.assert.strictEqual(r1.c, 'c')

    const fooA2 = Foo.build({ a: aBis, b: two })
    // recycle member from previous, all values not structurally equals AND optional prop
    const r2 = recycle.recycle(fooA1, fooA2)
    chai.assert.notStrictEqual(r2, fooA2)
    chai.assert.strictEqual(r2.a, a)
    chai.assert.strictEqual(r2.b, two)
    chai.assert.notProperty(r2, 'c')

    // Nominal case (different)
    const fooB = Foo.build({ a: b, b: one })
    const r3 = recycle.recycle(fooA2, fooB)
    chai.assert.strictEqual(r3, fooB)
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

    const recycle = FooBar.recycle

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    const fooA: Foo | Bar = { type: 'foo', a: 'a', b: 12 }
    const fooABis: Foo | Bar = { type: 'foo', a: 'a', b: 12 }
    const fooB: Foo | Bar = { type: 'foo', a: 'b', b: 12 }

    const barA: Foo | Bar = { type: 'bar', c: 'a', d: 12 }
    const barB: Foo | Bar = { type: 'bar', c: 'b', d: 12 }

    mustRecycle(fooA, fooA)
    mustRecycle(fooA, fooABis)
    mustNotRecycle(fooA, fooB)
    mustNotRecycle(fooA, barA)
    mustNotRecycle(barA, barB)
  })

  it('either', () => {
    const { recycle } = summon(F => F.either(F.string(), F.number()))
    const la: Either<string, number> = left('a')
    const labis: Either<string, number> = left('a')
    const r1: Either<string, number> = right(1)
    const lb: Either<string, number> = left('b')
    const r2: Either<string, number> = right(2)
    const r2bis: Either<string, number> = right(2)

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle(la, la)
    mustRecycle(la, labis)
    mustRecycle(r1, r1)
    mustRecycle(r2, r2bis)

    mustNotRecycle(la, lb)
    mustNotRecycle(la, r1)
    mustNotRecycle(r2, r1)
  })

  it('either deep', () => {
    const Inner = summon(F => F.interface({ a: F.interface({ c: F.string() }, 'C'), b: F.number() }, 'AB'))

    const { build, recycle } = summon(F => F.either(Inner(F), Inner(F)))

    const laC = { c: 'c' }
    const la1 = build(left({ a: laC, b: 1 }))
    const la2 = build(left({ a: laC, b: 2 }))
    const la3 = build(left({ a: { c: 'c' }, b: 1 }))
    const la4 = build(left({ a: { c: 'c' }, b: 2 }))

    const ra1 = build(right({ a: laC, b: 1 }))
    const ra2 = build(right({ a: laC, b: 2 }))
    const ra3 = build(right({ a: { c: 'c' }, b: 1 }))

    const resL = recycle.recycle(la1, la2)
    if (isLeft(resL)) {
      chai.assert.strictEqual(resL, la2)
    }

    const resL2 = recycle.recycle(la1, la3)
    if (isLeft(resL2)) {
      chai.assert.strictEqual(resL2, la1)
    }

    const resL3 = recycle.recycle(la1, la4)
    if (isLeft(resL3)) {
      chai.assert.notStrictEqual(resL3, la1)
      chai.assert.notStrictEqual(resL3, la4)
      chai.assert.strictEqual(resL3.left.a, laC)
    }

    const resR = recycle.recycle(ra1, ra2)
    if (isRight(resR)) {
      chai.assert.notStrictEqual(resR, ra1)
      chai.assert.strictEqual(resR, ra2)
      chai.assert.strictEqual(resR.right.a, laC)
    }

    const resR2 = recycle.recycle(ra1, ra2)
    if (isRight(resR2)) {
      chai.assert.notStrictEqual(resR2, ra1)
      chai.assert.notStrictEqual(resR2, ra3)
      chai.assert.strictEqual(resR2.right.a, laC)
    }
  })

  it('option', () => {
    const { recycle } = summon(F => F.option(F.string()))
    const a1 = O.some('a')
    const a2 = O.some('a')
    const b = O.some('b')
    const n = O.none

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    mustRecycle(a1, a1)
    mustRecycle(a1, a2)
    mustRecycle(n, n)

    mustNotRecycle(a1, b)
    mustNotRecycle(a1, n)
  })

  it('intersection', () => {
    const { recycle, build } = summon(F =>
      F.intersection(
        [
          F.interface(
            {
              a: F.nullable(F.string()),
              a2: F.nullable(F.string())
            },
            'A'
          ),
          F.interface(
            {
              b: F.nullable(F.string())
            },
            'B'
          )
        ],
        'AB'
      )
    )

    const { mustRecycle, mustNotRecycle } = makeRecycler(recycle)

    const AaBb = build({ a: O.some('a'), a2: O.some('a'), b: O.some('b') })
    const AaBbBis = build({ a: O.some('a'), a2: O.some('a'), b: O.some('b') })
    mustRecycle(AaBb, AaBbBis)

    const AcBd = build({ a: O.some('c'), a2: O.some('x'), b: O.some('d') })
    mustNotRecycle(AaBb, AcBd)

    const AaBc = build({ a: O.some('a'), a2: O.some('b'), b: O.some('c') })
    const res = recycle.recycle(AaBb, AaBc)
    chai.assert.notStrictEqual(res, AaBc)
    chai.assert.strictEqual(res.a, AaBb.a)
    chai.assert.strictEqual(res.b, AaBc.b)
  })
})
