import * as chai from 'chai'
import { adtByTag } from '../../src/adt'

describe('Builder', () => {
  interface Foo {
    type: 'foo'
    a: string
    b: number
  }

  interface Bar {
    type: 'bar'
    c: string
    d: number
  }

  it('taggedUnion', () => {
    const fooBar = adtByTag<Foo | Bar>()('type')

    const fooA = fooBar.of('foo', { a: 'a', b: 12 })
    const barA = fooBar.of('bar', { c: 'a', d: 12 })
    const barB = fooBar.of('bar', { c: 'b', d: 13 })

    chai.assert.deepStrictEqual({ type: 'foo', a: 'a', b: 12 }, fooA)
    chai.assert.deepStrictEqual({ type: 'bar', c: 'a', d: 12 }, barA)
    chai.assert.deepStrictEqual({ type: 'bar', c: 'b', d: 13 }, barB)
  })

  describe('Matcher', () => {
    it('taggedUnion', () => {
      const fooBar = adtByTag<Foo | Bar>()('type')

      const { fold, match, matchWiden } = fooBar

      const fooA = fooBar.of('foo', { a: 'a', b: 12 })
      const barA = fooBar.of('bar', { c: 'a', d: 12 })
      const barB = fooBar.of('bar', { c: 'b', d: 13 })

      chai.assert.deepStrictEqual({ type: 'foo', a: 'a', b: 12 }, fooA)
      chai.assert.deepStrictEqual({ type: 'bar', c: 'a', d: 12 }, barA)
      chai.assert.deepStrictEqual({ type: 'bar', c: 'b', d: 13 }, barB)

      const folder = fold(v => v.type)
      chai.assert.deepStrictEqual(folder(fooA), 'foo')
      chai.assert.deepStrictEqual(folder(barA), 'bar')

      const matcher = match({
        bar: ({ c }) => c,
        foo: ({ a }) => '2'
      })

      chai.assert.deepStrictEqual(matcher(barA), 'a')
      chai.assert.deepStrictEqual(matcher(barB), 'b')
      chai.assert.deepStrictEqual(matcher(fooA), 'a')

      const matcherDefault = match({
        bar: ({ c }) => c,
        default: () => 'defaultResult'
      })
      chai.assert.deepStrictEqual(matcherDefault(barA), 'a')
      chai.assert.deepStrictEqual(matcherDefault(fooA), 'defaultResult')

      const matcherW = matchWiden({
        bar: ({ d }) => d,
        foo: ({ a }) => a
      })
      chai.assert.deepStrictEqual(matcherW(barA), 12)
      chai.assert.deepStrictEqual(matcherW(barB), 13)
      chai.assert.deepStrictEqual(matcherW(fooA), 'a')

      const matcherDefaultW = matchWiden({
        bar: ({ c }) => 1,
        default: () => 'defaultResult'
      })
      chai.assert.deepStrictEqual(matcherDefaultW(barA), 1)
      chai.assert.deepStrictEqual(matcherDefaultW(fooA), 'defaultResult')
    })
  })

  describe('Predicates', () => {
    it('taggedUnion', () => {
      const fooBar = adtByTag<Foo | Bar>()('type')

      const fooA = fooBar.of('foo', { a: 'a', b: 12 })

      chai.assert.deepStrictEqual(fooBar.is('foo')(fooA), true)
      chai.assert.deepStrictEqual(fooBar.isAnyOf('foo')(fooA), true)
      chai.assert.deepStrictEqual(fooBar.isAnyOf('bar', 'foo')(fooA), true)
      chai.assert.deepStrictEqual(fooBar.is('bar')(fooA), false)
      chai.assert.deepStrictEqual(fooBar.isAnyOf('bar')(fooA), false)

      if (fooBar.is('foo')(fooA)) {
        chai.assert.deepStrictEqual(
          fooBar('foo')
            .lenseFromProp('type')
            .get(fooA), // ensure type narrowing
          'foo'
        )
      }
    })
  })

  describe('Monocle', () => {
    it('modify', () => {
      const fooBarByType = adtByTag<Foo | Bar>()('type')

      chai.assert.deepStrictEqual(
        fooBarByType('bar')
          .lenseFromProp('c')
          .modify(s => `(${s})`)(fooBarByType.as('bar', { c: 'c', d: 1 })),
        fooBarByType.of('bar', { c: '(c)', d: 1 })
      )

      chai.assert.deepStrictEqual(
        fooBarByType('bar')
          .lenseFromProps(['c', 'd'])
          .modify(({ c, d }) => ({ c: `(${c})`, d: 1 + d }))(fooBarByType.as('bar', { c: 'c', d: 1 })),
        fooBarByType.of('bar', { c: '(c)', d: 2 })
      )
    })
  })
})
