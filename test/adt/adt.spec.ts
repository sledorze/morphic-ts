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
    const fooBar = adtByTag<Foo | Bar>()('type')

    const { fold, match, matchWiden, createReducer } = fooBar
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
      chai.assert.deepStrictEqual(folder(fooA), 'foo', 'folder fooA')
      chai.assert.deepStrictEqual(folder(barA), 'bar', 'folder barA')
    })

    it('match', () => {
      const matcher = match({
        bar: ({ c }) => c,
        foo: ({ a }) => a
      })

      chai.assert.deepStrictEqual(matcher(barA), 'a', 'matcher barA')
      chai.assert.deepStrictEqual(matcher(barB), 'b', 'matcher barB')
      chai.assert.deepStrictEqual(matcher(fooA), 'a', 'matcher fooA')
    })

    it('match with default', () => {
      const matcherDefault = match({
        bar: ({ c }) => c,
        default: () => 'defaultResult'
      })
      chai.assert.deepStrictEqual(matcherDefault(barA), 'a', 'matcherDefault barA')
      chai.assert.deepStrictEqual(matcherDefault(fooA), 'defaultResult', 'matcherDefault fooA')
    })

    it('matchWiden', () => {
      const matcherW = matchWiden({
        bar: ({ d }) => d,
        foo: ({ a }) => a
      })
      chai.assert.deepStrictEqual(matcherW(barA), 12, 'matcherW barA')
      chai.assert.deepStrictEqual(matcherW(barB), 13, 'matcherW barb')
      chai.assert.deepStrictEqual(matcherW(fooA), 'a', 'matcherW fooA')
    })
    it('matchWiden with default', () => {
      const matcherDefaultW = matchWiden({
        bar: ({ c }) => c.length,
        default: () => 'defaultResult'
      })
      chai.assert.deepStrictEqual(matcherDefaultW(barA), 1, 'matcherDefaultW fooA')
      chai.assert.deepStrictEqual(matcherDefaultW(fooA), 'defaultResult', 'matcherDefaultW barA')
    })
    it('reduce', () => {
      const reduce = createReducer({ x: '0' })({
        foo: () => ({ x }) => ({ x: `foo(${x})` }),
        default: () => () => ({ x: `default` })
      })

      chai.assert.deepStrictEqual(reduce(fooA)(undefined), { x: 'foo(0)' })
      chai.assert.deepStrictEqual(reduce(fooA)({ x: '1' }), { x: 'foo(1)' })
      chai.assert.deepStrictEqual(reduce(barA)(undefined), { x: 'default' })
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
