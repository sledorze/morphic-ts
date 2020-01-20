import * as chai from 'chai'

import { summonAs, summon } from '../../../src/batteries/summoner-no-union'

describe('Show', () => {
  it('returns false when comparing incomplete values', () => {
    const Foo = summonAs(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string()
        },
        'Foo'
      )
    )

    const { show } = Foo

    const date = new Date(12345)
    chai.assert.strictEqual(show.show({ date, a: '' }), '{ date: 1970-01-01T00:00:12.345Z, a: "" }')
  })

  it('show', () => {
    const Foo = summonAs(F =>
      F.interface(
        {
          date: F.date(),
          a: F.string()
        },
        'Foo'
      )
    )

    const { show } = Foo

    const date = new Date(12345)
    chai.assert.strictEqual(show.show({ date, a: '' }), '{ date: 1970-01-01T00:00:12.345Z, a: "" }')
  })

  it('show', () => {
    const Foo = summonAs(F =>
      F.interface(
        {
          dates: F.array(
            F.interface(
              {
                date: F.date()
              },
              'Dates'
            ),
            {}
          ),
          a: F.string()
        },
        'Foo@'
      )
    )

    const { show } = Foo

    const date = new Date(12345)
    const date2 = new Date(12346)
    chai.assert.strictEqual(
      show.show({ dates: [{ date }, { date }], a: '' }),
      '{ dates: [{ date: 1970-01-01T00:00:12.345Z }, { date: 1970-01-01T00:00:12.345Z }], a: "" }'
    )

    chai.assert.strictEqual(
      show.show({ dates: [{ date: date2 }, { date }], a: '' }),
      '{ dates: [{ date: 1970-01-01T00:00:12.346Z }, { date: 1970-01-01T00:00:12.345Z }], a: "" }'
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

    const { show } = Foo
    chai.assert.deepStrictEqual(show.show({}), '{ type: undefined, a: undefined, b: undefined }')
    chai.assert.deepStrictEqual(show.show({ type: 'foo' }), `{ type: "foo", a: undefined, b: undefined }`)
    chai.assert.deepStrictEqual(show.show({ type: 'foo', a: 'foo' }), `{ type: "foo", a: "foo", b: undefined }`)
    chai.assert.deepStrictEqual(show.show({ a: 'foo' }), `{ type: undefined, a: "foo", b: undefined }`)
  })

  it('taggedUnion', () => {
    interface Foo {
      type: 'foo'
      a: string
      b: number
    }
    interface FooRaw {
      type: string
      a: string
      b: number
    }
    const Foo = summonAs<FooRaw, Foo>(F =>
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
    const Bar = summon<Bar>(F =>
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

    const { show } = FooBar

    const fooA: Foo | Bar = { type: 'foo', a: 'a', b: 12 }
    const fooB: Foo | Bar = { type: 'foo', a: 'b', b: 12 }
    const fooC: Foo | Bar = { type: 'foo', a: 'c', b: 12 }

    const barA: Foo | Bar = { type: 'bar', c: 'a', d: 12 }
    const barB: Foo | Bar = { type: 'bar', c: 'b', d: 12 }

    chai.assert.deepStrictEqual(show.show(fooA), '{ type: "foo", a: "a", b: 12 }')
    chai.assert.deepStrictEqual(show.show(fooB), '{ type: "foo", a: "b", b: 12 }')
    chai.assert.deepStrictEqual(show.show(fooC), '{ type: "foo", a: "c", b: 12 }')
    chai.assert.deepStrictEqual(show.show(barA), '{ type: "bar", c: "a", d: 12 }')
    chai.assert.deepStrictEqual(show.show(barB), '{ type: "bar", c: "b", d: 12 }')
  })
})
