import * as chai from 'chai'
import { ordString, ord, Ord } from 'fp-ts/lib/Ord'
import { fromArray } from 'fp-ts/lib/Set'
import { right, isLeft } from 'fp-ts/lib/Either'

import { ModelAlgebraPrimitive1 } from '../../../src/algebras/primitives'
import { ModelAlgebraObject1 } from '../../../src/algebras/object'
import { Kind, URIS } from '../../../src/HKT'
import { some, none } from 'fp-ts/lib/Option'
import { merge } from '../../../src/utils'
import { ioTsStrict, ioTsNonStrictObjectInterpreter } from '../../../src/interpreters/io-ts/interpreters'
import { ioTsPrimitiveInterpreter } from '../../../src/interpreters/io-ts/primitives'
import { GTree, Tree } from '../../utils/tree'
import { either } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { Errors } from 'io-ts'
import { summon, summonAs, summonAsA, M } from '../../../src/utils/summoner'

describe('IO-TS Alt Schema', () => {
  it('string', () => {
    // Definition
    const codec = summon(F => F.string).type
    chai.assert.deepStrictEqual(codec.decode('b'), right('b'))
  })

  it('stringLiteral', () => {
    // Definition
    const codec = summonAs(F => F.stringLiteral('x')).type

    chai.assert.deepStrictEqual(codec.decode('x'), right('x'))
  })

  it('keysOf', () => {
    // Definition
    const codec = summonAs(F => F.keysOf({ a: null, b: null })).type

    chai.assert.deepStrictEqual(codec.decode('a'), right('a'))
    chai.assert.deepStrictEqual(codec.decode('b'), right('b'))
    chai.assert.deepStrictEqual(isLeft(codec.decode('c')), true)
  })

  it('nullable', () => {
    const codec = summonAs(F => F.nullable(F.string)).type

    chai.assert.deepStrictEqual(codec.decode('a'), right(some('a')))
    chai.assert.deepStrictEqual(codec.decode(null), right(none))
    chai.assert.deepStrictEqual(isLeft(codec.decode(6)), true)
  })

  it('array', () => {
    const codec = summonAs(F => F.array(F.string))
    chai.assert.deepStrictEqual(codec.type.decode(['a', 'b']), right(['a', 'b']))
  })

  it('partial', () => {
    // Definition

    const codec = summonAs(F =>
      F.partial({
        a: F.string,
        b: F.number
      })
    )

    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a', b: 1 }), right({ a: 'a', b: 1 }))
    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a', b: 1 }), right({ a: 'a', b: 1 }))
    chai.assert.deepStrictEqual(codec.type.decode({ b: 1 }), right({ b: 1 }))
    chai.assert.deepStrictEqual(codec.type.decode({ a: 'a' }), right({ a: 'a' }))
  })

  it('compose', () => {
    // type Foo
    const Foo = summonAs(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    // type Bar
    const Bar = summonAsA<Bar>()(F =>
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

    const eee = Bar.strictType
    either.either.map(eee.decode(1 as unknown), x => x.a)
    const fff = Foo.strictType
    either.either.map(fff.decode(1 as unknown), x => {
      const res = x.a.concat('a')
      return res
    })

    const codec = Bar
    // const codec2 = Foo

    chai.assert.deepStrictEqual(
      codec.type.decode({ a: { a: 'z', b: 12 }, b: 12 }),
      right({ a: { a: 'z', b: 12 }, b: 12 })
    )
  })

  it('date', () => {
    // type Foo
    const Foo = summonAsA<Foo>()(F =>
      F.interface({
        date: F.date,
        a: F.string
      })
    )

    interface Foo {
      date: Date
      a: string
    }

    const codec = Foo

    const date = new Date()
    chai.assert.deepStrictEqual(codec.type.decode({ date: date.toISOString(), a: 'z' }), right({ date, a: 'z' }))
  })

  it('intersection', () => {
    // type Foo
    const Foo = summonAs(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    const Bar = summonAs(F =>
      F.interface({
        c: F.string,
        d: F.number
      })
    )

    const FooBar = summonAs(F => F.intersection([Foo(F), Bar(F)]))

    const codec = FooBar

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
    const Foo = summonAs(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    interface Bar {
      c: string
      d: number
    }
    const Bar = summonAs(F =>
      F.interface({
        c: F.string,
        d: F.number
      })
    )

    const FooBar = summonAs(F => F.union([Foo(F), Bar(F)]))

    const codec = FooBar

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
    const Foo = summonAsA<Foo>()(F =>
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
    const Bar = summonAsA<Bar>()(F =>
      F.interface({
        type: F.stringLiteral('bar1'),
        c: F.string,
        d: F.number
      })
    )

    const FooBar = summonAs(F =>
      F.taggedUnion('type', {
        foo1: Foo(F),
        bar1: Bar(F)
      })
    )

    const codec = FooBar

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
    const Foo = summonAs(F =>
      F.interface({
        type: F.stringLiteral('foo2'),
        a: F.string
      })
    )

    const Baz = summonAs(F =>
      F.interface({
        type: F.stringLiteral('baz2'),
        b: F.number
      })
    )

    const FooBar = summonAs(F =>
      F.taggedUnion('type', {
        foo2: Foo(F),
        baz2: Baz(F)
      })
    )

    const decoder = FooBar.type

    chai.assert.deepStrictEqual(decoder.decode({ type: 'foo2', a: 'a' }), right({ type: 'foo2' as 'foo2', a: 'a' }))
    chai.assert(isLeft(decoder.decode({ type: 'foo2', b: 3 })))
    chai.assert.deepStrictEqual(decoder.decode({ type: 'baz2', b: 1 }), right({ type: 'baz2' as 'baz2', b: 1 }))
    chai.assert(isLeft(decoder.decode({ type: 'baz2', a: 'a' })))
    chai.assert(isLeft(decoder.decode({})))
  })

  it('set from array', () => {
    const InterfA = summonAs(F =>
      F.interface({
        a: F.string
      })
    )

    summonAs(F =>
      F.interface({
        a: F.string,
        b: F.array(
          F.interface({
            x: F.nullable(F.string)
          })
        )
      })
    )

    type AType = ReturnType<typeof InterfA.build>

    const ordA: Ord<AType> = ord.contramap(ordString, x => x.a)

    const SetInterfA = summonAs(F => F.set(InterfA(F), ordA))

    const SetInterfAType = SetInterfA

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
      chai.assert.deepStrictEqual(codec.type().decode(valueWithExtras), right(valueWithoutExtras))
    })
    it('partial does not keep extra values', () => {
      const codec = partialModel<'IOTSType'>(strictInterpreter)
      chai.assert.deepStrictEqual(codec.type().decode(valueWithExtras), right(valueWithoutExtras))
    })
  })

  describe('ioTsNonStrictObjectInterpreter', () => {
    const nonStrictInterpreter = merge(ioTsNonStrictObjectInterpreter, ioTsPrimitiveInterpreter)

    it('interface keeps extra values', () => {
      const codec = model<'IOTSType'>(nonStrictInterpreter)
      chai.assert.deepStrictEqual(codec.type().decode(valueWithExtras), right(valueWithExtras))
    })
    it('partial keeps extra values', () => {
      const codec = partialModel<'IOTSType'>(nonStrictInterpreter)
      chai.assert.deepStrictEqual(codec.type().decode(valueWithExtras), right(valueWithExtras))
    })
  })

  describe('ioTsStrictRecursiveInterpreter', () => {
    it('handles recursive types', () => {
      let nbEvals = 0
      let nbRecEvals = 0

      const Tree: M<unknown, Tree> = summonAs(F => {
        nbEvals += 1
        return F.recursive(Tree => {
          nbRecEvals += 1
          return F.taggedUnion('type', {
            node: F.interface({ type: F.stringLiteral('node'), a: Tree, b: Tree }),
            leaf: F.interface({ type: F.stringLiteral('leaf'), v: F.string })
          })
        })
      })

      const { type } = Tree
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

      const getTree = <A>(LeafValue: M<unknown, A>): M<unknown, GTree<A>> => {
        const GTree: M<unknown, GTree<A>> = summonAs(F => {
          nbEvals += 1
          return F.recursive(GTree => {
            nbRecEvals += 1
            return F.taggedUnion('type', {
              node: F.interface({ type: F.stringLiteral('node'), a: GTree, b: GTree }),
              leaf: F.interface({ type: F.stringLiteral('leaf'), v: LeafValue(F) })
            })
          })
        })
        return GTree
      }

      const numberValue = summonAs(F => F.number)

      const { type } = getTree(numberValue)
      chai.assert.deepStrictEqual(type.is({ type: 'leaf', v: 0 }), true)
      chai.assert.deepStrictEqual(type.is({ type: 'node', a: { type: 'leaf', v: 1 }, b: { type: 'leaf', v: 2 } }), true)
      chai.assert.deepStrictEqual(nbEvals, 1)
      chai.assert.deepStrictEqual(nbRecEvals, 1)
    })
  })
})
