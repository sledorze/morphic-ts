import * as fc from 'fast-check'
import { ordString, ord } from 'fp-ts/lib/Ord'

import { ProgramUnion } from '../../../src/utils/program'
import { summon, M } from '../../../src/utils/summoner'

const testProgram = <A>(prog: ProgramUnion<unknown, A>) => {
  const { arb, type } = summon(prog)
  fc.assert(fc.property(arb, type.is))
}

describe('FastCheck interpreter', () => {
  it('string', () => {
    testProgram(summon(F => F.string()))
  })

  it('string can be customized for FastCheck', () => {
    testProgram(
      summon(F =>
        F.string({
          FastCheckType: A => A.noShrink()
        })
      )
    )
  })

  it('string can be customized via a specific generator', () => {
    testProgram(
      summon(F =>
        F.string({
          FastCheckType: _ => fc.constantFrom('scala', 'haskell', 'purescript', 'typescript', 'haxe')
        })
      )
    )
  })

  it('stringLiteral', () => {
    testProgram(summon(F => F.stringLiteral('x')))
  })

  it('keysOf', () => {
    testProgram(summon(F => F.keysOf({ a: null, b: null })))
  })

  it('array', () => {
    testProgram(summon(F => F.array(F.string(), {})))
  })

  it('array is bounded by config', () => {
    fc.check(
      fc.property(
        summon(F => F.array(F.string(), { FastCheckType: { minLength: 2, maxLength: 4 } })).arb,
        arr => arr.length >= 2 && arr.length <= 4
      )
    )
  })

  it('interface', () => {
    testProgram(
      summon(F =>
        F.interface({
          a: F.string(),
          b: F.number()
        })
      )
    )
  })

  it('partial', () => {
    testProgram(
      summon(F =>
        F.partial({
          a: F.string(),
          b: F.number()
        })
      )
    )
  })

  it('compose', () => {
    // type Foo
    const Foo = summon(F =>
      F.interface({
        a: F.string(),
        b: F.number()
      })
    )

    // type Bar
    const Bar = summon<BarType>(F =>
      F.interface({
        a: Foo(F),
        b: F.number()
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
    const Foo = summon<Foo>(F =>
      F.interface({
        date: F.date(),
        a: F.string()
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
    const Foo = summon(F =>
      F.interface({
        a: F.string(),
        b: F.number()
      })
    )

    const Bar = summon(F =>
      F.interface({
        c: F.string(),
        d: F.number()
      })
    )

    const FooBar = summon(F => F.intersection([Foo(F), Bar(F)]))

    testProgram(FooBar)
  })

  it('union', () => {
    // type Foo
    interface Foo {
      a: string
      b: number
    }
    const Foo = summon(F =>
      F.interface({
        a: F.string(),
        b: F.number()
      })
    )

    interface Bar {
      c: string
      d: number
    }
    const Bar = summon(F =>
      F.interface({
        c: F.string(),
        d: F.number()
      })
    )
    const Bara = summon(F =>
      F.interface({
        ca: F.string(),
        d: F.number()
      })
    )
    const Barb = summon(F =>
      F.interface({
        cb: F.string(),
        d: F.number()
      })
    )

    const FooBar = summon(F => F.union([Foo(F), Bar(F), Bara(F), Barb(F)]))

    testProgram(FooBar)
  })

  it('taggedUnion', () => {
    // type Foo
    interface Foo {
      type: 'foo'
      a: string
      b: number
    }
    const Foo = summon<Foo>(F =>
      F.interface({
        type: F.stringLiteral('foo'),
        a: F.string(),
        b: F.number()
      })
    )

    interface Bar {
      type: 'bar'
      c: string
      d: number
    }
    const Bar = summon<Bar>(F =>
      F.interface({
        type: F.stringLiteral('bar'),
        c: F.string(),
        d: F.number()
      })
    )

    const FooBar = summon(F =>
      F.taggedUnion('type', {
        foo: Foo(F),
        bar: Bar(F)
      })
    )

    testProgram(FooBar)
  })

  it('set from array', () => {
    const InterfA = summon(F =>
      F.interface({
        a: F.string()
      })
    )

    type AType = ReturnType<typeof InterfA.build>

    const ordA = ord.contramap(ordString, (x: AType) => x.a)

    const SetInterfA = summon(F => F.set(InterfA(F), ordA))

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

    const List: M<unknown, List> = summon<List>(F =>
      F.recursive<unknown, List>(Self =>
        F.taggedUnion('type', {
          cons: F.interface({ type: F.stringLiteral('cons'), a: Self }),
          leaf: F.interface({ type: F.stringLiteral('leaf'), v: F.string() })
        })
      )
    )

    testProgram(List)
  })
})
