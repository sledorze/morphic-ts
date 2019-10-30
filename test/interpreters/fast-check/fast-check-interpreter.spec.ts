import * as fc from 'fast-check'
import { ordString, ord } from 'fp-ts/lib/Ord'

import { Kind, URIS } from '../../../src/HKT'
import { ioTsStrict } from '../../../src/interpreters/io-ts/interpreters'
import { fastCheckInterpreter } from '../../../src/interpreters/fast-check/interpreters'
import { ModelAlgebra1, defineAsUnknown, TypeOf, Program } from '../../utils/program'

const build = <A>(program: <F extends URIS>(F: ModelAlgebra1<F>) => Kind<F, A>) => ({
  codec: program(ioTsStrict).type,
  arb: program(fastCheckInterpreter).arb
})

const testProgram = <A>(prog: <F extends URIS>(F: ModelAlgebra1<F>) => Kind<F, A>) => {
  const { arb, codec } = build(prog)
  fc.assert(fc.property(arb, codec.is))
}

describe('FastCheck interpreter', () => {
  it('string', () => {
    testProgram(defineAsUnknown(F => F.string))
  })

  it('stringLiteral', () => {
    testProgram(defineAsUnknown(F => F.stringLiteral('x')))
  })

  it('keysOf', () => {
    testProgram(defineAsUnknown(F => F.keysOf({ a: null, b: null })))
  })

  it('array', () => {
    testProgram(defineAsUnknown(F => F.array(F.string)))
  })

  it('interface', () => {
    testProgram(
      defineAsUnknown(F =>
        F.interface({
          a: F.string,
          b: F.number
        })
      )
    )
  })

  it('partial', () => {
    testProgram(
      defineAsUnknown(F =>
        F.partial({
          a: F.string,
          b: F.number
        })
      )
    )
  })

  it('compose', () => {
    // type Foo
    const Foo = defineAsUnknown(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    // type Bar
    const Bar = defineAsUnknown<BarType>(F =>
      F.interface({
        a: Foo(F),
        b: F.number
      })
    )
    interface BarType {
      a: {
        a: string
        b: number
      }
      b: number
    }

    testProgram(Bar)
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

    testProgram(Foo)
  })

  it('intersection', () => {
    // type Foo
    const Foo = defineAsUnknown(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    const Bar = defineAsUnknown(F =>
      F.interface({
        c: F.string,
        d: F.number
      })
    )

    const FooBar = defineAsUnknown(F => F.intersection([Foo(F), Bar(F)]))

    testProgram(FooBar)
  })

  it('union', () => {
    // type Foo
    interface Foo {
      a: string
      b: number
    }
    const Foo = defineAsUnknown(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    interface Bar {
      c: string
      d: number
    }
    const Bar = defineAsUnknown(F =>
      F.interface({
        c: F.string,
        d: F.number
      })
    )
    const Bara = defineAsUnknown(F =>
      F.interface({
        ca: F.string,
        d: F.number
      })
    )
    const Barb = defineAsUnknown(F =>
      F.interface({
        cb: F.string,
        d: F.number
      })
    )

    const FooBar = defineAsUnknown(F => F.union([Foo(F), Bar(F), Bara(F), Barb(F)]))

    testProgram(FooBar)
  })

  it('taggedUnion', () => {
    // type Foo
    interface Foo {
      type: 'foo'
      a: string
      b: number
    }
    const Foo = defineAsUnknown<Foo>(F =>
      F.interface({
        type: F.stringLiteral('foo'),
        a: F.string,
        b: F.number
      })
    )

    interface Bar {
      type: 'bar'
      c: string
      d: number
    }
    const Bar = defineAsUnknown<Bar>(F =>
      F.interface({
        type: F.stringLiteral('bar'),
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

    testProgram(FooBar)
  })

  it('set from array', () => {
    const InterfA = defineAsUnknown(F =>
      F.interface({
        a: F.string
      })
    )

    type AType = TypeOf<typeof InterfA>

    const ordA = ord.contramap(ordString, (x: AType) => x.a)

    const SetInterfA = defineAsUnknown(F => F.set(InterfA(F), ordA))

    testProgram(SetInterfA)
  })

  it('recursive', () => {
    type List = Cons | Leaf
    interface Cons {
      type: 'cons'
      a: List
    }
    interface Leaf {
      type: 'leaf'
      v: string
    }

    const List: Program<unknown, List> = defineAsUnknown<List>(F =>
      F.recursive<unknown, List>(() =>
        F.taggedUnion('type', {
          cons: F.interface({ type: F.stringLiteral('cons'), a: List(F) }),
          leaf: F.interface({ type: F.stringLiteral('leaf'), v: F.string })
        })
      )
    )

    testProgram(List)
  })
})
