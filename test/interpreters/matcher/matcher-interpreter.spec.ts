import * as chai from 'chai'
import { some, none } from 'fp-ts/lib/Option'
import { matcherInterpreter } from '../../../src/interpreters/matcher/interpreters'
import { right } from 'fp-ts/lib/Either'
import { defineAsUnknown } from '../../utils/program'

describe('Matcher', () => {
  it('matcher', () => {
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

    const { fold } = Foo(matcherInterpreter)
    const date = new Date(12345)
    chai.assert.deepStrictEqual(fold(d => JSON.stringify(d))({ date, a: '' }), JSON.stringify({ date, a: '' }))
  })

  it('keysOf', () => {
    const { fold } = defineAsUnknown(F => F.keysOf({ a: null, b: null }))(matcherInterpreter)
    chai.assert.deepStrictEqual(fold(x => x)('a'), 'a')
  })

  it('nullable', () => {
    const { fold } = defineAsUnknown(F => F.nullable(F.string))(matcherInterpreter)
    chai.assert.deepStrictEqual(fold(x => x)(some('a')), some('a'))
    chai.assert.deepStrictEqual(fold(x => x)(none), none)
  })

  it('taggedUnion', () => {
    interface Foo {
      type: 'foo'
      kind: 'ff'
      a: string
      b: number
    }
    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        type: F.stringLiteral('foo'),
        kind: F.stringLiteral('ff'),
        a: F.string,
        b: F.number
      })
    )

    interface Bar {
      type: 'bar'
      kind: 'cc'
      c: string
      d: number
    }
    const Bar = defineAsUnknown<Bar>(F =>
      F.interface({
        type: F.stringLiteral('bar'),
        kind: F.stringLiteral('cc'),
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

    const { fold, foldOn } = FooBar(matcherInterpreter)

    const fooA: Foo | Bar = { type: 'foo', kind: 'ff', a: 'a', b: 12 }

    const barA: Foo | Bar = { type: 'bar', kind: 'cc', c: 'a', d: 12 }
    const barB: Foo | Bar = { type: 'bar', kind: 'cc', c: 'b', d: 12 }

    chai.assert.deepStrictEqual(
      foldOn('type')({
        bar: x => `bar${JSON.stringify(x)}`,
        foo: x => `foo${JSON.stringify(x)}`
      })(fooA),
      `foo${JSON.stringify(fooA)}`
    )
    chai.assert.deepStrictEqual(
      foldOn('type')({
        bar: x => `bar${JSON.stringify(x)}`,
        foo: x => `foo${JSON.stringify(x)}`
      })(barA),
      `bar${JSON.stringify(barA)}`
    )
    chai.assert.notDeepEqual(
      foldOn('type')({
        bar: x => `bar${JSON.stringify(x)}`,
        foo: x => `foo${JSON.stringify(x)}`
      })(barA),
      `bar${JSON.stringify(barB)}`
    )
    chai.assert.deepStrictEqual(fold(x => `x${JSON.stringify(x)}`)(barA), `x${JSON.stringify(barA)}`)
  })

  it('can widens taggedUnion', () => {
    interface Foo {
      type: 'foo'
      a: string
    }
    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        type: F.stringLiteral('foo'),
        a: F.string
      })
    )

    interface Bar {
      type: 'bar'
      c: string
    }
    const Bar = defineAsUnknown<Bar>(F =>
      F.interface({
        type: F.stringLiteral('bar'),
        c: F.string
      })
    )

    const FooBar = defineAsUnknown(F =>
      F.taggedUnion('type', {
        foo: Foo(F),
        bar: Bar(F)
      })
    )

    const { foldOnWiden } = FooBar(matcherInterpreter)

    const barA: Foo | Bar = { type: 'bar', c: 'a' }

    const res = foldOnWiden('type')({
      bar: _ => right('x' as 'x'),
      foo: _ => right('y' as 'y')
    })(barA)

    chai.assert.deepStrictEqual(res, right('x'))
  })
})
