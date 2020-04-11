import { ModelAlgebraTaggedUnions } from '../../src/tagged-unions'
import { ModelAlgebraPrimitive } from '../../src/primitives'
import { ModelAlgebraObject } from '../../src/object'
const dummy = 42 // $ExpectType 42

const foo = <F, R>(f: (x: ModelAlgebraTaggedUnions<F> & ModelAlgebraPrimitive<F> & ModelAlgebraObject<F>) => R): R =>
  f as any
const summon = <F, R>(f: (x: ModelAlgebraTaggedUnions<F> & ModelAlgebraPrimitive<F> & ModelAlgebraObject<F>) => R) => f

// $ExpectType HKT2<unknown, unknown, { type: string; }, { type: "a"; }>
foo(F => F.taggedUnion('type', { a: F.interface({ type: F.stringLiteral('a') }, 'A') }, 'X'))

// $ExpectType HKT2<unknown, unknown, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    { a: F.interface({ type: F.stringLiteral('a') }, 'A'), b: F.interface({ type: F.stringLiteral('b') }, 'B') },
    'X'
  )
)

interface Deps {
  dep: string
}
interface Deps2 {
  dep2: string
}

// $ExpectType HKT2<unknown, Deps, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface({ type: F.stringLiteralCfg<'a', Deps>('a', 1 as any) }, 'A'),
      b: F.interface({ type: F.stringLiteralCfg<'b', Deps>('b', 1 as any) }, 'B')
    },
    'X'
  )
)

// $ExpectType HKT2<unknown, Deps & Deps2, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface({ type: F.stringLiteralCfg<'a', Deps>('a', 1 as any) }, 'A'),
      b: F.interface({ type: F.stringLiteralCfg<'b', Deps2>('b', 1 as any) }, 'B')
    },
    'X'
  )
)

type Only<A> = A & { [k in keyof any]: never }

// $ExpectType HKT2<unknown, Deps & { [x: string]: never; } & Deps2, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface({ type: F.stringLiteralCfg<'a', Only<Deps>>('a', 1 as any) }, 'A'),
      b: F.interface({ type: F.stringLiteralCfg<'b', Only<Deps2>>('b', 1 as any) }, 'B')
    },
    'X'
  )
)

const A = summon(F => F.interface({ type: F.stringLiteralCfg<'a', Only<Deps>>('a', 1 as any) }, 'A'))
const B = summon(F => F.interface({ type: F.stringLiteralCfg<'b', Only<Deps2>>('b', 1 as any) }, 'B'))

// $ExpectType HKT2<unknown, Deps & { [x: string]: never; } & Deps2, { type: string; } | { type: string; }, { type: "a"; } | { type: "b"; }>
foo(F =>
  F.taggedUnion(
    'type',
    {
      a: A(F),
      b: B(F)
    },
    'X'
  )
)
