import * as chai from 'chai'
import { some, none } from 'fp-ts/lib/Option'
import { summon } from '../../../src/utils/summoner'

describe('Builder', () => {
  it('builder', () => {
    interface Foo {
      date: Date
      a: string
    }

    const Foo = summon<Foo>(F =>
      F.interface({
        date: F.date(),
        a: F.string()
      })
    )

    const date = new Date(12345)
    chai.assert.deepStrictEqual(Foo.build({ date, a: '' }), { date, a: '' })
  })

  it('keysOf', () => {
    const { build } = summon(F => F.keysOf({ a: null, b: null }))
    chai.assert.deepStrictEqual(build('a'), 'a')
  })

  it('nullable', () => {
    const { build } = summon(F => F.nullable(F.string()))
    chai.assert.deepStrictEqual(build(some('a')), some('a'))
    chai.assert.deepStrictEqual(build(none), none)
  })

  it('builder', () => {
    interface Nested {
      date: Date
    }
    const Nested = summon<Nested>(F =>
      F.interface({
        date: F.date()
      })
    )

    interface Foo {
      dates: Nested[]
      a: string
    }

    const Foo = summon(F =>
      F.interface({
        dates: F.array(Nested(F)),
        a: F.string()
      })
    )

    const { build } = Foo

    const date = new Date(12345)
    chai.assert.deepStrictEqual(build({ dates: [{ date }, { date }], a: '' }), {
      dates: [{ date }, { date }],
      a: ''
    })
  })
})
