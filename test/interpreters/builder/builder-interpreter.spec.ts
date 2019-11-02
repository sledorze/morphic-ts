import * as chai from 'chai'
import { some, none } from 'fp-ts/lib/Option'
import { builderInterpreter } from '../../../src/interpreters/builder/interpreters'
import { defineAsUnknown } from '../../utils/program'

describe('Builder', () => {
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

    const { build } = Foo(builderInterpreter)

    const date = new Date(12345)
    chai.assert.deepStrictEqual(build({ date, a: '' }), { date, a: '' })
  })

  it('keysOf', () => {
    const { build } = defineAsUnknown(F => F.keysOf({ a: null, b: null }))(builderInterpreter)
    chai.assert.deepStrictEqual(build('a'), 'a')
  })

  it('nullable', () => {
    const { build } = defineAsUnknown(F => F.nullable(F.string))(builderInterpreter)
    chai.assert.deepStrictEqual(build(some('a')), some('a'))
    chai.assert.deepStrictEqual(build(none), none)
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

    const { build } = Foo(builderInterpreter)

    const date = new Date(12345)
    chai.assert.deepStrictEqual(build({ dates: [{ date }, { date }], a: '' }), {
      dates: [{ date }, { date }],
      a: ''
    })
  })
})
