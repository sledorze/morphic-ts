import * as chai from 'chai'
import { some, none } from 'fp-ts/lib/Option'
import { builderInterpreter } from '../../../src/interpreters/builder/interpreters'
import { defineAsUnknown } from '../../utils/program'

describe('Builder', () => {
  interface Foo {
    type: 'foo'
    a: string
    b: number
  }
  const Foo = defineAsUnknown<Foo>(F =>
    F.interface({
      type: F.stringLiteral('foo'),
      a: F.string,
      b: F.number
    })
  )

  interface Bar {
    type: 'bar'
    c: string
    d: number
  }
  const Bar = defineAsUnknown<Bar>(F =>
    F.interface({
      type: F.stringLiteral('bar'),
      c: F.string,
      d: F.number
    })
  )

  const FooBar = defineAsUnknown(F =>
    F.taggedUnion('type', {
      foo: Foo(F),
      bar: Bar(F)
    })
  )

  it('builder', () => {
    interface Foo {
      date: Date
      a: string
    }

    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        date: F.date,
        a: F.string
      })
    )

    const { of } = Foo(builderInterpreter)

    const date = new Date(12345)
    chai.assert.deepStrictEqual(of({ date, a: '' }), { date, a: '' })
  })

  it('keysOf', () => {
    const { of } = defineAsUnknown(F => F.keysOf({ a: null, b: null }))(builderInterpreter)
    chai.assert.deepStrictEqual(of('a'), 'a')
  })

  it('nullable', () => {
    const { of } = defineAsUnknown(F => F.nullable(F.string))(builderInterpreter)
    chai.assert.deepStrictEqual(of(some('a')), some('a'))
    chai.assert.deepStrictEqual(of(none), none)
  })

  it('builder', () => {
    interface Nested {
      date: Date
    }
    const Nested = defineAsUnknown<Nested>(F =>
      F.interface({
        date: F.date
      })
    )

    interface Foo {
      dates: Nested[]
      a: string
    }

    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        dates: F.array(Nested(F)),
        a: F.string
      })
    )

    const { of } = Foo(builderInterpreter)

    const date = new Date(12345)
    chai.assert.deepStrictEqual(of({ dates: [{ date }, { date }], a: '' }), {
      dates: [{ date }, { date }],
      a: ''
    })
  })

  it('taggedUnion', () => {
    const { of, byTag } = FooBar(builderInterpreter)

    const fooBar = byTag('type')('bar', 'foo')

    const {
      variants: { bar, foo }
    } = fooBar

    const fooA = foo.of({ a: 'a', b: 12 })
    const barA = bar.of({ c: 'a', d: 12 })
    const barB = bar.of({ c: 'b', d: 13 })

    chai.assert.deepStrictEqual({ type: 'foo', a: 'a', b: 12 }, fooA)
    chai.assert.deepStrictEqual({ type: 'bar', c: 'a', d: 12 }, barA)
    chai.assert.deepStrictEqual({ type: 'bar', c: 'b', d: 13 }, barB)

    chai.assert.deepStrictEqual(of({ type: 'foo', a: 'a', b: 12 }), fooA)
    chai.assert.deepStrictEqual(of({ type: 'bar', c: 'a', d: 12 }), barA)
    chai.assert.deepStrictEqual(of({ type: 'bar', c: 'b', d: 13 }), barB)
  })

  describe('Matcher', () => {
    it('taggedUnion', () => {
      const { byTag } = FooBar(builderInterpreter)

      const fooBar = byTag('type')('bar', 'foo')

      const {
        variants: { bar, foo },
        fold,
        match,
        matchWiden
      } = fooBar

      const fooA = foo.of({ a: 'a', b: 12 })
      const barA = bar.of({ c: 'a', d: 12 })
      const barB = bar.of({ c: 'b', d: 13 })

      chai.assert.deepStrictEqual({ type: 'foo', a: 'a', b: 12 }, fooA)
      chai.assert.deepStrictEqual({ type: 'bar', c: 'a', d: 12 }, barA)
      chai.assert.deepStrictEqual({ type: 'bar', c: 'b', d: 13 }, barB)

      const folder = fold(v => v.type)
      chai.assert.deepStrictEqual(folder(fooA), 'foo')
      chai.assert.deepStrictEqual(folder(barA), 'bar')

      const matcher = match({
        bar: ({ c }) => c,
        foo: ({ a }) => a
      })

      chai.assert.deepStrictEqual(matcher(barA), 'a')
      chai.assert.deepStrictEqual(matcher(barB), 'b')
      chai.assert.deepStrictEqual(matcher(fooA), 'a')

      const matcherW = matchWiden({
        bar: ({ d }) => d,
        foo: ({ a }) => a
      })
      chai.assert.deepStrictEqual(matcherW(barA), 12)
      chai.assert.deepStrictEqual(matcherW(barB), 13)
      chai.assert.deepStrictEqual(matcherW(fooA), 'a')
    })
  })

  describe('Predicates', () => {
    it('taggedUnion', () => {
      const { byTag } = FooBar(builderInterpreter)

      const fooBar = byTag('type')('bar', 'foo')

      const {
        variants: { foo }
      } = fooBar

      const fooA = foo.of({ a: 'a', b: 12 })

      if (foo.isA(fooA)) {
        chai.assert.deepStrictEqual(foo.fromProp('type').get(fooA), 'foo')
      }
    })
  })

  describe('Monocle', () => {
    it('modify', () => {
      const { byTag } = FooBar(builderInterpreter)
      const fooBar = byTag('type')('bar', 'foo')

      const {
        variants: { bar }
      } = fooBar

      chai.assert.deepStrictEqual(
        bar.fromProp('c').modify(s => `(${s})`)(bar.narrowed({ c: 'c', d: 1 })),
        bar.of({ c: '(c)', d: 1 })
      )

      chai.assert.deepStrictEqual(
        bar.fromProps(['c', 'd']).modify(({ c, d }) => ({ c: `(${c})`, d: 1 + d }))(bar.narrowed({ c: 'c', d: 1 })),
        bar.of({ c: '(c)', d: 2 })
      )
    })
  })
})
