import * as chai from 'chai'
import { ordString, ord, Ord } from 'fp-ts/lib/Ord'
import { fromArray } from 'fp-ts/lib/Set'
import { right, isLeft } from 'fp-ts/lib/Either'

import { Program, TypeOf, defineAs, defineAsUnknown } from '../../utils/program'
import { ModelAlgebraPrimitive1 } from '../../../src/algebras/primitives'
import { ModelAlgebraObject1 } from '../../../src/algebras/object'
import { Kind, URIS } from '../../../src/HKT'
import { some, none } from 'fp-ts/lib/Option'
import { merge } from '../../../src/utils'
import { GTree, Tree } from '../../utils/tree'
import { either } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { Errors } from 'io-ts'
import { ioTsStringNonStrict } from '../../../src/interpreters/io-ts-string/interpreters'
import { ioTsStrict } from '../../../src/interpreters/io-ts/interpreters'
import { ioTsPrimitiveInterpreter } from '../../../src/interpreters/io-ts/primitives'
import { ioTsNonStrictObjectInterpreter } from '../../../src/interpreters/io-ts/object'

describe('IO-TS-String Alt Schema', () => {
  it('string', () => {
    // Definition
    const codec = defineAs(F => F.string)(ioTsStringNonStrict).type
    chai.assert.deepStrictEqual(codec.decode('b'), right('b'))
  })

  it('stringLiteral', () => {
    // Definition
    const codec = defineAs(F => F.stringLiteral('x'))(ioTsStringNonStrict).type

    chai.assert.deepStrictEqual(codec.decode('x'), right('x'))
  })

  it('keysOf', () => {
    // Definition
    const codec = defineAs(F => F.keysOf({ a: null, b: null }))(ioTsStringNonStrict).type

    chai.assert.deepStrictEqual(codec.decode('a'), right('a'))
    chai.assert.deepStrictEqual(codec.decode('b'), right('b'))
    chai.assert.deepStrictEqual(isLeft(codec.decode('c')), true)
  })

  it('nullable', () => {
    const codec = defineAs(F => F.nullable(F.string))(ioTsStringNonStrict).type

    chai.assert.deepStrictEqual(codec.decode('a'), right(some('a')))
    chai.assert.deepStrictEqual(codec.decode(null), right(none))
    chai.assert.deepStrictEqual(isLeft(codec.decode(6)), true)
  })

  it('array', () => {
    const codec = defineAs(F => F.array(F.string))(ioTsStringNonStrict)
    chai.assert.deepStrictEqual(codec.type.decode(['a', 'b']), right(['a', 'b']))
  })

  it('partial', () => {
    // Definition

    const codec = defineAs(F =>
      F.partial({
        a: F.string,
        b: F.number
      })
    )(ioTsStringNonStrict)

    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a', b: 1 }), right({ a: 'a', b: 1 }))
    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a', b: 1 }), right({ a: 'a', b: 1 }))
    chai.assert.deepStrictEqual(codec.type.decode({ b: 1 }), right({ b: 1 }))
    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a' }), right({ a: 'a' }))
  })

  it('compose', () => {
    // type Foo
    const Foo = defineAs(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    // type Bar
    const Bar = defineAs<Bar, Bar>(F =>
      F.interface({
        a: Foo(F),
        b: F.number
      })
    )

    interface Bar {
      a: {
        a: string
        b: number
      }
      b: number
    }

    const eee = Bar(ioTsStrict)
    either.either.map(eee.type.decode(1 as unknown), x => x.a)
    const fff = Foo(ioTsStrict)
    either.either.map(fff.type.decode(1 as unknown), x => {
      const res = x.a.concat('a')
      return res
    })

    const codec = Bar(ioTsStringNonStrict)
    // const codec2 = Foo(ioTsStringNonStrict)

    chai.assert.deepStrictEqual(
      codec.type.decode({ a: { a: 'z', b: 12 }, b: 12 }),
      right({ a: { a: 'z', b: 12 }, b: 12 })
    )
  })

  it('date', () => {
    // type Foo
    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        date: F.date,
        a: F.string
      })
    )

    interface Foo {
      date: Date
      a: string
    }

    const codec = Foo(ioTsStringNonStrict)

    const date = new Date()
    chai.assert.deepStrictEqual(codec.type.decode({ date: date.toISOString(), a: 'z' }), right({ date, a: 'z' }))
  })

  it('intersection', () => {
    // type Foo
    const Foo = defineAs(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    const Bar = defineAs(F =>
      F.interface({
        c: F.string,
        d: F.number
      })
    )

    const FooBar = defineAs(F => F.intersection([Foo(F), Bar(F)]))

    const codec = FooBar(ioTsStringNonStrict)

    chai.assert.deepStrictEqual(
      codec.type.decode({ a: 'a', b: 12, c: 'a', d: 12 }),
      right({ a: 'a', b: 12, c: 'a', d: 12 })
    )
  })

  it('union', () => {
    // type Foo
    interface Foo {
      a: string
      b: number
    }
    const Foo = defineAs(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    interface Bar {
      c: string
      d: number
    }
    const Bar = defineAs(F =>
      F.interface({
        c: F.string,
        d: F.number
      })
    )

    const FooBar = defineAs(F => F.union([Foo(F), Bar(F)]))

    const codec = FooBar(ioTsStringNonStrict)

    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a', b: 12 }), right({ a: 'a', b: 12 }))
    chai.assert.deepStrictEqual(codec.type.decode({ c: 'a', d: 12 }), right({ c: 'a', d: 12 }))
    chai.assert.deepStrictEqual(isLeft(codec.type.decode({ a: 'a', d: 12 })), true)
  })

  it('taggedUnion', () => {
    // type Foo
    interface Foo {
      type: 'foo1'
      a: string
      b: number
    }
    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        type: F.stringLiteral('foo1'),
        a: F.string,
        b: F.number
      })
    )

    interface Bar {
      type: 'bar1'
      c: string
      d: number
    }
    const Bar = defineAsUnknown<Bar>(F =>
      F.interface({
        type: F.stringLiteral('bar1'),
        c: F.string,
        d: F.number
      })
    )

    const FooBar = defineAs(F =>
      F.taggedUnion('type', {
        foo1: Foo(F),
        bar1: Bar(F)
      })
    )

    const codec = FooBar(ioTsStringNonStrict)

    chai.assert.deepStrictEqual(
      codec.type.decode({ type: 'foo1', a: 'a', b: 12 }),
      right({ type: 'foo1' as 'foo1', a: 'a', b: 12 })
    )
    chai.assert.deepStrictEqual(
      codec.type.decode({ type: 'bar1', c: 'a', d: 12 }),
      right({ type: 'bar1' as 'bar1', c: 'a', d: 12 })
    )
    chai.assert.deepStrictEqual(isLeft(codec.type.decode({ a: 'a', d: 12 })), true)
  })

  it('taggedUnion', () => {
    const Foo = defineAs(F =>
      F.interface({
        type: F.stringLiteral('foo2'),
        a: F.string
      })
    )

    const Baz = defineAs(F =>
      F.interface({
        type: F.stringLiteral('baz2'),
        b: F.number
      })
    )

    const FooBar = defineAs(F =>
      F.taggedUnion('type', {
        foo2: Foo(F),
        baz2: Baz(F)
      })
    )

    const decoder = FooBar(ioTsStringNonStrict).type

    chai.assert.deepStrictEqual(decoder.decode({ type: 'foo2', a: 'a' }), right({ type: 'foo2' as 'foo2', a: 'a' }))
    chai.assert(isLeft(decoder.decode({ type: 'foo2', b: 3 })))
    chai.assert.deepStrictEqual(decoder.decode({ type: 'baz2', b: 1 }), right({ type: 'baz2' as 'baz2', b: 1 }))
    chai.assert(isLeft(decoder.decode({ type: 'baz2', a: 'a' })))
    chai.assert(isLeft(decoder.decode({})))
  })

  it('set from array', () => {
    const InterfA = defineAs(F =>
      F.interface({
        a: F.string
      })
    )

    defineAs(F =>
      F.interface({
        a: F.string,
        b: F.array(
          F.interface({
            x: F.nullable(F.string)
          })
        )
      })
    )

    type AType = TypeOf<typeof InterfA>

    const ordA: Ord<AType> = ord.contramap(ordString, x => x.a)

    const SetInterfA = defineAs(F => F.set(InterfA(F), ordA))

    const SetInterfAType = SetInterfA(ioTsStringNonStrict)

    const datas = [{ a: 'zz' }, { a: 'vv' }]
    const decoded = SetInterfAType.type.decode([{ a: 'zz' }, { a: 'vv' }])
    chai.assert.deepStrictEqual(decoded, right(fromArray(ordA)(datas)))

    chai.assert.deepStrictEqual(
      SetInterfAType.type.encode(
        pipe(
          decoded,
          either.getOrElse<Errors, Set<{ a: string }>>(() => {
            throw new Error('bad')
          })
        )
      ),
      [{ a: 'vv' }, { a: 'zz' }]
    )
  })
})

describe('iotsObjectInterpreter', () => {
  const define2 = <A>(
    program: <F extends URIS = never>(F: ModelAlgebraPrimitive1<F> & ModelAlgebraObject1<F>) => Kind<F, A>
  ): typeof program => program as any

  const model = define2(F =>
    F.interface({
      a: F.string,
      b: F.number
    })
  )
  const partialModel = define2(F =>
    F.partial({
      a: F.string,
      b: F.number
    })
  )

  const valueWithExtras = { a: 'a', b: 12, c: 33 }
  const valueWithoutExtras = { a: 'a', b: 12 }

  describe('ioTsStrictObjectInterpreter', () => {
    const strictInterpreter = merge(ioTsStrict, ioTsPrimitiveInterpreter)

    it('interface does not keep extra values', () => {
      const codec = model<'IOTSType'>(strictInterpreter)
      chai.assert.deepStrictEqual(codec.type.decode(valueWithExtras), right(valueWithoutExtras))
    })
    it('partial does not keep extra values', () => {
      const codec = partialModel<'IOTSType'>(strictInterpreter)
      chai.assert.deepStrictEqual(codec.type.decode(valueWithExtras), right(valueWithoutExtras))
    })
  })

  describe('ioTsNonStrictObjectInterpreter', () => {
    const nonStrictInterpreter = merge(ioTsNonStrictObjectInterpreter, ioTsPrimitiveInterpreter)

    it('interface keeps extra values', () => {
      const codec = model<'IOTSType'>(nonStrictInterpreter)
      chai.assert.deepStrictEqual(codec.type.decode(valueWithExtras), right(valueWithExtras))
    })
    it('partial keeps extra values', () => {
      const codec = partialModel<'IOTSType'>(nonStrictInterpreter)
      chai.assert.deepStrictEqual(codec.type.decode(valueWithExtras), right(valueWithExtras))
    })
  })

  describe('ioTsStrictRecursiveInterpreter', () => {
    it('handles recursive types', () => {
      let nbEvals = 0
      let nbRecEvals = 0

      const Tree: Program<unknown, Tree> = defineAs(F => {
        nbEvals += 1
        return F.recursive(() => {
          nbRecEvals += 1
          return F.taggedUnion('type', {
            node: F.interface({ type: F.stringLiteral('node'), a: Tree(F), b: Tree(F) }),
            leaf: F.interface({ type: F.stringLiteral('leaf'), v: F.string })
          })
        })
      })

      const { type } = Tree(ioTsStringNonStrict)
      chai.assert.deepStrictEqual(type.is({ type: 'leaf', v: 'X' }), true)
      chai.assert.deepStrictEqual(
        type.is({ type: 'node', a: { type: 'leaf', v: 'AX' }, b: { type: 'leaf', v: 'BX' } }),
        true
      )
      chai.assert.deepStrictEqual(nbEvals, 1)
      chai.assert.deepStrictEqual(nbRecEvals, 1)
    })

    it('handles generic recursive types', () => {
      let nbEvals = 0
      let nbRecEvals = 0

      const getTree = <A>(LeafValue: Program<unknown, A>): Program<unknown, GTree<A>> => {
        const GTree: Program<unknown, GTree<A>> = defineAs(F => {
          nbEvals += 1
          return F.recursive(() => {
            nbRecEvals += 1
            return F.taggedUnion('type', {
              node: F.interface({ type: F.stringLiteral('node'), a: GTree(F), b: GTree(F) }),
              leaf: F.interface({ type: F.stringLiteral('leaf'), v: LeafValue(F) })
            })
          })
        })
        return GTree
      }

      const numberValue = defineAs(F => F.number)

      const { type } = getTree(numberValue)(ioTsStringNonStrict)
      chai.assert.deepStrictEqual(type.is({ type: 'leaf', v: 0 }), true)
      chai.assert.deepStrictEqual(type.is({ type: 'node', a: { type: 'leaf', v: 1 }, b: { type: 'leaf', v: 2 } }), true)
      chai.assert.deepStrictEqual(nbEvals, 1)
      chai.assert.deepStrictEqual(nbRecEvals, 1)
    })
  })
})
