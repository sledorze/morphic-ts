import type { ModelAlgebraTaggedUnions } from '../../src/tagged-unions'
import type { ModelAlgebraPrimitive } from '../../src/primitives'
import type { ModelAlgebraObject } from '../../src/object'
import type { Eq } from 'fp-ts/Eq'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type {} from '@morphic-ts/algebras/lib/hkt'
import type { HKT2 } from '@morphic-ts/common/lib/HKT'

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<R, A> {
    ['Eq']: (env: R) => TypeEq<A>
  }
}

// Eq def
export class TypeEq<A> {
  _A!: A
  constructor(ord: Eq<A>) {}
}

const dummy = 42 // $ExpectType 42

const foo = <MEnv extends AnyEnv = {}>() => <F, R extends HKT2<F, Env, any, any>, Env extends MEnv>(
  f: (x: ModelAlgebraTaggedUnions<F, Env> & ModelAlgebraPrimitive<F, Env> & ModelAlgebraObject<F, Env>) => R
): R => f as any
const summon = <MEnv>() => <F, R extends HKT2<F, Env, any, any>, Env extends MEnv>(
  f: (x: ModelAlgebraTaggedUnions<F, Env> & ModelAlgebraPrimitive<F, Env> & ModelAlgebraObject<F, Env>) => R
) => f

// $ExpectType HKT2<unknown, {}, Readonly<{ type: string; }>, Readonly<{ type: "a"; }>>
foo()(F => F.taggedUnion('type', { a: F.interface({ type: F.stringLiteral('a') }, 'A') }, 'X'))

// $ExpectType HKT2<unknown, {}, Readonly<{ type: string; }> | Readonly<{ type: string; }>, Readonly<{ type: "a"; }> | Readonly<{ type: "b"; }>>
foo()(F =>
  F.taggedUnion(
    'type',
    { a: F.interface({ type: F.stringLiteral('a') }, 'A'), b: F.interface({ type: F.stringLiteral('b') }, 'B') },
    'X'
  )
)

interface EqDeps {
  dep: string
}

interface Deps extends AnyEnv {
  Eq: EqDeps
}

interface EqDeps2 extends AnyEnv {
  dep2: string
}

interface Deps2 extends AnyEnv {
  Eq: EqDeps2
}

// $ExpezctType HKT2<unknown, { Eq: Deps; }, string, "a">
foo<Deps>()(F => F.stringLiteral<'a'>('a', { Eq: (x, d: EqDeps) => x }))

// $ExpectType HKT2<unknown, Deps, Readonly<{ type: string; }>, Readonly<{ type: "a"; }>>
foo<Deps>()(F =>
  F.interface(
    { type: F.stringLiteral<'a'>('a', { Eq: (x, d: EqDeps) => x }) },
    'A'
  )
)

// $ExpectType HKT2<unknown, Deps, Readonly<{ type: string; }> | Readonly<{ type: string; }>, Readonly<{ type: "a"; }> | Readonly<{ type: "b"; }>>
foo<Deps>()(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface(
        { type: F.stringLiteral<'a'>('a', { Eq: (x, d: EqDeps) => x }) },
        'A'
      ),
      b: F.interface(
        { type: F.stringLiteral<'b'>('b', { Eq: (x, d: EqDeps) => x }) },
        'B'
      )
    },
    'X'
  )
)

// $ExpectType HKT2<unknown, Deps & Deps2, Readonly<{ type: string; }> | Readonly<{ type: string; }>, Readonly<{ type: "a"; }> | Readonly<{ type: "b"; }>>
foo<Deps & Deps2>()(F =>
  F.taggedUnion(
    'type',
    {
      a: F.interface(
        { type: F.stringLiteral<'a'>('a', { Eq: (x, _: EqDeps) => x }) },
        'A'
      ),
      b: F.interface(
        { type: F.stringLiteral<'b'>('b', { Eq: (x, _: EqDeps2) => x }) },
        'B'
      )
    },
    'X'
  )
)
