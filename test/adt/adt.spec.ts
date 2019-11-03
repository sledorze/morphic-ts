import * as chai from 'chai'
import { adtByTag } from '../../src/adt'
import { identity } from 'fp-ts/lib/function'

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
    const fooBar = adtByTag<Foo | Bar>()('type')

    const { fold, match, matchWiden, createReducer, transform } = fooBar
    const fooA = fooBar.of('foo', { a: 'a', b: 12 })
    const barA = fooBar.of('bar', { c: 'a', d: 12 })
    const barB = fooBar.of('bar', { c: 'b', d: 13 })

    it('prelude', () => {
      chai.assert.deepStrictEqual({ type: 'foo', a: 'a', b: 12 }, fooA, 'fooA')
      chai.assert.deepStrictEqual({ type: 'bar', c: 'a', d: 12 }, barA, 'barA')
      chai.assert.deepStrictEqual({ type: 'bar', c: 'b', d: 13 }, barB, 'barB')
    })

    it('fold', () => {
      const folder = fold(v => v.type)
      chai.assert.deepStrictEqual(folder(fooA), 'foo', 'fooA')
      chai.assert.deepStrictEqual(folder(barA), 'bar', 'barA')
    })

    it('match', () => {
      const matcher = match({
        bar: ({ c }) => c,
        foo: ({ a }) => a
      })

      chai.assert.deepStrictEqual(matcher(barA), 'a', 'barA')
      chai.assert.deepStrictEqual(matcher(barB), 'b', 'barB')
      chai.assert.deepStrictEqual(matcher(fooA), 'a', 'fooA')
    })

    it('match with default', () => {
      const matcherDefault = match({
        bar: ({ c }) => c,
        default: () => 'defaultResult'
      })
      chai.assert.deepStrictEqual(matcherDefault(barA), 'a', 'barA')
      chai.assert.deepStrictEqual(matcherDefault(fooA), 'defaultResult', 'fooA')
    })

    it('matchWiden', () => {
      const matcherW = matchWiden({
        bar: ({ d }) => d,
        foo: ({ a }) => a
      })
      chai.assert.deepStrictEqual(matcherW(barA), 12, 'barA')
      chai.assert.deepStrictEqual(matcherW(barB), 13, 'barb')
      chai.assert.deepStrictEqual(matcherW(fooA), 'a', 'fooA')
    })
    it('matchWiden with default', () => {
      const matcherDefaultW = matchWiden({
        bar: ({ c }) => c.length,
        default: () => 'defaultResult'
      })
      chai.assert.deepStrictEqual(matcherDefaultW(barA), 1, 'bar')
      chai.assert.deepStrictEqual(matcherDefaultW(fooA), 'defaultResult', 'fooA')
    })

    it('matchWiden with default expose the action', () => {
      const matcherDefaultW = matchWiden({
        bar: ({ c }) => c.length,
        default: a => a
      })
      chai.assert.deepStrictEqual(matcherDefaultW(barA), 1, 'barA')
      chai.assert.deepStrictEqual(matcherDefaultW(fooA), fooA, 'fooA')
    })

    it('reduce', () => {
      const reduce = createReducer({ x: '0' })({
        foo: () => ({ x }) => ({ x: `foo(${x})` }),
        default: () => () => ({ x: `default` })
      })

      chai.assert.deepStrictEqual(reduce(undefined, fooA), { x: 'foo(0)' })
      chai.assert.deepStrictEqual(reduce({ x: '1' }, fooA), { x: 'foo(1)' })
      chai.assert.deepStrictEqual(reduce(undefined, barA), { x: 'default' })
    })

    it('reduce return the previous state', () => {
      const reduce = createReducer({ x: '0' })({
        foo: () => ({ x }) => ({ x: `foo(${x})` }),
        default: () => identity
      })
      chai.assert.deepStrictEqual(reduce(undefined, barA), { x: '0' })
    })

    it('transform', () => {
      const matcherDefault = transform({
        bar: ({ c }) => fooBar.of('bar', { c, d: 1 })
      })
      chai.assert.deepStrictEqual(matcherDefault(barA), { type: 'bar', c: 'a', d: 1 }, 'barA')
      chai.assert.deepStrictEqual(matcherDefault(fooA), fooA, 'fooA')
    })
  })

  it('Predicates', () => {
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
