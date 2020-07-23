import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import * as L from 'monocle-ts/lib/Lens'
import * as chai from 'chai'
import { unionADT, intersectADT, makeADT, ofType } from '../src'

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

  interface Baz {
    type: 'baz'
    e: string
    f: number
  }

  it('taggedUnion', () => {
    const fooBar = makeADT('type')({
      foo: ofType<Foo>(),
      bar: ofType<Bar>()
    })

    const fooA = fooBar.of.foo({ a: 'a', b: 12 })
    const barA = fooBar.of.bar({ c: 'a', d: 12 })
    const barB = fooBar.of.bar({ c: 'b', d: 13 })

    chai.assert.deepStrictEqual({ type: 'foo', a: 'a', b: 12 }, fooA)
    chai.assert.deepStrictEqual({ type: 'bar', c: 'a', d: 12 }, barA)
    chai.assert.deepStrictEqual({ type: 'bar', c: 'b', d: 13 }, barB)
  })

  describe('Matcher', () => {
    const fooBar = makeADT('type')({
      foo: ofType<Foo>(),
      bar: ofType<Bar>()
    })

    const { fold, match, createReducer, transform, strict, matchLens, matchOptional } = fooBar
    const fooA = fooBar.of.foo({ a: 'a', b: 12 })
    const barA = fooBar.of.bar({ c: 'a', d: 12 })
    const barB = fooBar.of.bar({ c: 'b', d: 13 })

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
      const matcherDefault = match(
        {
          bar: ({ c }) => c
        },
        () => 'defaultResult'
      )
      chai.assert.deepStrictEqual(matcherDefault(barA), 'a', 'barA')
      chai.assert.deepStrictEqual(matcherDefault(fooA), 'defaultResult', 'fooA')
    })

    it('match with default - strict', () => {
      const matcherDefault = strict<number>(
        match(
          {
            bar: _ => 1
          },
          () => 2
        )
      )
      chai.assert.deepStrictEqual(matcherDefault(barA), 1, 'barA')
      chai.assert.deepStrictEqual(matcherDefault(fooA), 2, 'fooA')
    })

    it('match (widen)', () => {
      const matcherW = match({
        bar: ({ d }) => d,
        foo: ({ a }) => a
      })
      chai.assert.deepStrictEqual(matcherW(barA), 12, 'barA')
      chai.assert.deepStrictEqual(matcherW(barB), 13, 'barb')
      chai.assert.deepStrictEqual(matcherW(fooA), 'a', 'fooA')
    })
    it('match (widen) with default', () => {
      const matcherDefaultW = match(
        {
          bar: ({ c }) => c.length
        },
        () => 'defaultResult'
      )
      chai.assert.deepStrictEqual(matcherDefaultW(barA), 1, 'bar')
      chai.assert.deepStrictEqual(matcherDefaultW(fooA), 'defaultResult', 'fooA')
    })

    it('match (widen) with default expose the action', () => {
      const matcherDefaultW = match(
        {
          bar: ({ c }) => c.length
        },
        a => a
      )
      chai.assert.deepStrictEqual(matcherDefaultW(barA), 1, 'barA')
      chai.assert.deepStrictEqual(matcherDefaultW(fooA), fooA as number | Foo, 'fooA')
    })

    it('matchLens', () => {
      const matchedLens = matchLens({
        bar: pipe(L.id<Bar>(), L.prop('d')),
        foo: pipe(L.id<Foo>(), L.prop('b'))
      })
      chai.assert.deepStrictEqual(matchedLens.get(barA), 12, 'get barA')
      chai.assert.deepStrictEqual(matchedLens.get(fooA), 12, 'get fooA')
      chai.assert.deepStrictEqual(matchedLens.set(11)(barA), fooBar.of.bar({ c: 'a', d: 11 }), 'set barA')
      chai.assert.deepStrictEqual(matchedLens.set(11)(fooA), fooBar.of.foo({ a: 'a', b: 11 }), 'set fooA')
    })

    it('matchOptional', () => {
      const matchedOptional = matchOptional({
        bar: pipe(L.id<Bar>(), L.prop('d'), L.asOptional)
      })
      chai.assert.deepStrictEqual(matchedOptional.getOption(barA), O.some(12), 'getOption barA')
      chai.assert.deepStrictEqual(matchedOptional.getOption(fooA), O.none, 'getOption fooA')
      chai.assert.deepStrictEqual(matchedOptional.set(11)(barA), fooBar.of.bar({ c: 'a', d: 11 }), 'set barA')
      chai.assert.deepStrictEqual(matchedOptional.set(11)(fooA), fooBar.of.foo({ a: 'a', b: 12 }), 'set fooA')
    })

    it('reduce', () => {
      const reduce = createReducer({ x: '0' })(
        {
          foo: () => ({ x }) => ({ x: `foo(${x})` })
        },
        () => () => ({ x: `default` })
      )

      chai.assert.deepStrictEqual(reduce(undefined, fooA), { x: 'foo(0)' })
      chai.assert.deepStrictEqual(reduce({ x: '1' }, fooA), { x: 'foo(1)' })
      chai.assert.deepStrictEqual(reduce(undefined, barA), { x: 'default' })
    })

    it('reduce without default does not change state on unknown Action', () => {
      const reduce = createReducer({ x: '0' })({
        foo: () => ({ x }) => ({ x: `foo(${x})` }),
        bar: () => ({ x }) => ({ x: `bar(${x})` })
      })
      const wrongAction = { type: 'unknown' }
      chai.assert.deepStrictEqual(reduce({ x: '1' }, wrongAction as any), {
        x: '1'
      })
    })

    it('reduce with default does not change state on unknown Action', () => {
      const reduce = createReducer({ x: '0' })(
        {
          foo: () => ({ x }) => ({ x: `foo(${x})` })
        },
        () => ({ x }) => ({ x: `default(${x})` })
      )
      const wrongAction = { type: 'unknown' }
      chai.assert.deepStrictEqual(reduce({ x: '1' }, wrongAction as any), {
        x: '1'
      })
    })

    it('reduce without default returns initalState if called with an unknown Action and undefined state', () => {
      const reduce = createReducer({ x: '0' })({
        foo: () => ({ x }) => ({ x: `foo(${x})` }),
        bar: () => ({ x }) => ({ x: `bar(${x})` })
      })
      const wrongAction = { type: 'unknown' }
      chai.assert.deepStrictEqual(reduce(undefined, wrongAction as any), {
        x: '0'
      })
    })

    it('reduce return the previous state', () => {
      const reduce = createReducer({ x: '0' })(
        {
          foo: () => ({ x }) => ({ x: `foo(${x})` })
        },
        () => a => a
      )
      chai.assert.deepStrictEqual(reduce(undefined, barA), { x: '0' })
    })

    it('transform', () => {
      const matcherDefault = transform({
        bar: ({ c }) => fooBar.of.bar({ c, d: 1 })
      })
      chai.assert.deepStrictEqual(matcherDefault(barA), { type: 'bar', c: 'a', d: 1 }, 'barA')
      chai.assert.deepStrictEqual(matcherDefault(fooA), fooA, 'fooA')
    })

    it('select', () => {
      const fooBar = makeADT('type')({
        foo: ofType<Foo>(),
        bar: ofType<Bar>()
      })

      const barOnly = fooBar.select(['bar'])
      const foo = fooBar.as.foo({ a: 'a', b: 1 })
      const bar = fooBar.as.bar({ c: 'a', d: 1 })

      chai.assert.deepStrictEqual(barOnly.verified(foo as any), false, 'verified foo')
      chai.assert.deepStrictEqual(barOnly.verified(bar), true, 'verified bar')
    })

    it('exclude', () => {
      const fooBar = makeADT('type')({
        foo: ofType<Foo>(),
        bar: ofType<Bar>()
      })
      const barOnly = fooBar.exclude(['foo'])
      const foo = fooBar.as.foo({ a: 'a', b: 1 })
      const bar = fooBar.as.bar({ c: 'a', d: 1 })

      chai.assert.deepStrictEqual(barOnly.verified(foo as any), false, 'verified foo')
      chai.assert.deepStrictEqual(barOnly.verified(bar), true, 'verified bar')
    })

    it('unionADT', () => {
      const fooBar = makeADT('type')({
        foo: ofType<Foo>(),
        bar: ofType<Bar>()
      })
      const fooBaz = makeADT('type')({
        foo: ofType<Foo>(),
        baz: ofType<Baz>()
      })
      const fooBarBaz = unionADT([fooBar, fooBaz])

      const reducer = fooBarBaz.createReducer({ tag: '' })({
        foo: _ => _ => ({ tag: 'foo' }),
        bar: _ => _ => ({ tag: 'bar' }),
        baz: _ => _ => ({ tag: 'baz' })
      })

      const foo = fooBarBaz.of.foo({ a: 'a', b: 1 })
      const bar = fooBar.of.bar({ c: 'a', d: 1 })
      const baz = fooBaz.of.baz({ e: 'a', f: 1 })

      chai.assert.deepStrictEqual(fooBarBaz.verified(foo), true, 'verified foo')
      chai.assert.deepStrictEqual(fooBarBaz.verified(bar), true, 'verified bar')
      chai.assert.deepStrictEqual(fooBarBaz.verified(baz), true, 'verified baz')

      chai.assert.deepStrictEqual(reducer(undefined, foo), { tag: 'foo' }, 'foo')
      chai.assert.deepStrictEqual(reducer(undefined, bar), { tag: 'bar' }, 'bar')
      chai.assert.deepStrictEqual(reducer(undefined, baz), { tag: 'baz' }, 'baz')
    })

    it('intersectionADT', () => {
      const fooBar = makeADT('type')({
        foo: ofType<Foo>(),
        bar: ofType<Bar>()
      })
      const fooBaz = makeADT('type')({
        foo: ofType<Foo>(),
        baz: ofType<Baz>()
      })
      const fooBarBaz = intersectADT(fooBar, fooBaz)

      const reducer = fooBarBaz.createReducer({ tag: '' })({
        foo: _ => _ => ({ tag: 'foo' })
      })

      const init = { tag: 'initial' }

      const foo = fooBarBaz.of.foo({ a: 'a', b: 1 })
      const bar = fooBar.of.bar({ c: 'a', d: 1 })
      const baz = fooBaz.of.baz({ e: 'a', f: 1 })

      chai.assert.deepStrictEqual(fooBarBaz.verified(foo), true, 'verified foo')
      chai.assert.deepStrictEqual(fooBarBaz.verified(bar as any), false, 'verified bar')
      chai.assert.deepStrictEqual(fooBarBaz.verified(baz as any), false, 'verified baz')

      chai.assert.deepStrictEqual(reducer(init, foo), { tag: 'foo' }, 'foo')
      chai.assert.deepStrictEqual(reducer(init, bar as any), init, 'bar')
      chai.assert.deepStrictEqual(reducer(init, baz as any), init, 'baz')
    })
  })

  it('Predicates', () => {
    const fooBar = makeADT('type')({
      foo: ofType<Foo>(),
      bar: ofType<Bar>()
    })

    const fooA = fooBar.of.foo({ a: 'a', b: 12 })

    chai.assert.deepStrictEqual(fooBar.is.foo(fooA), true)
    chai.assert.deepStrictEqual(fooBar.isAnyOf(['foo'])(fooA), true)
    chai.assert.deepStrictEqual(fooBar.isAnyOf(['bar', 'foo'])(fooA), true)
    chai.assert.deepStrictEqual(fooBar.is.bar(fooA), false)
    chai.assert.deepStrictEqual(fooBar.isAnyOf(['bar'])(fooA), false)

    // narrows to Foo
    if (fooBar.is.foo(fooA)) {
      chai.assert.deepStrictEqual(
        fooBar.select(['foo']).lensFromProp('type').get(fooA), // ensure type narrowing
        'foo'
      )
    }
  })

  describe('Monocle', () => {
    it('modify', () => {
      const fooBarByType = makeADT('type')({
        foo: ofType<Foo>(),
        bar: ofType<Bar>()
      })
      chai.assert.deepStrictEqual(
        fooBarByType
          .select(['bar'])
          .lensFromProp('c')
          .modify(s => `(${s})`)(fooBarByType.as.bar({ c: 'c', d: 1 })),
        fooBarByType.of.bar({ c: '(c)', d: 1 })
      )

      chai.assert.deepStrictEqual(
        fooBarByType
          .select(['bar'])
          .lensFromProps(['c', 'd'])
          .modify(({ c, d }) => ({ c: `(${c})`, d: 1 + d }))(fooBarByType.as.bar({ c: 'c', d: 1 })),
        fooBarByType.of.bar({ c: '(c)', d: 2 })
      )
    })
  })
})
