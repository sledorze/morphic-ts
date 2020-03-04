// import { ADT, unionADT, intersectADT } from '../../src/adt'
import { Extension, ExtType } from '../../src/usage/extend'
import { SelectKeyOfMatchingValues } from '../../src/usage/utils'
import { OptionalIfUndefined } from '@morphic-ts/common/lib/core'
import { BASTJInterpreter } from '../../src/interpreters-BAST'
import { ProgramNoUnionURI } from '../../src/program-no-union'
import { summon, tagged } from '../../src/summoner'
import { EOfMorhpADT, IfStringLiteral, MorphADT, AOfMorhpADT } from '../../src/usage/tagged-union'
import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { interpretable } from '../../src/usage/programs-infer'
import { ADT, unionADT, intersectADT } from '@morphic-ts/adt'
import { Remove, ElemType, ExtractUnion } from '@morphic-ts/adt/lib/utils'

type IsLiteralA = IfStringLiteral<'a', 'ok', 'string', 'notString'> // $ExpectType "ok"
type IsLiteralString = IfStringLiteral<string, 'ok', 'string', 'notString'> // $ExpectType "string"
type IsLiteralNumber = IfStringLiteral<number, 'ok', 'string', 'notString'> // $ExpectType "notString"

type RemoveAFromAB = keyof Remove<{ a: number; b: string }, 'a'> // "b"

interface Dummy {
  dummyValue: string
}

type ElemArrayA = ElemType<Dummy[]> // $ExpectType Dummy
type ElemA = ElemType<Dummy> // $ExpectType never
type ElemString = ElemType<string> // $ExpectType never

interface ADTFoo0 {
  type: 'ADTFoo0'
}
const ADTFoo0: ADT<ADTFoo0, ADTTag> = 1 as any
interface ADTFoo1 {
  type: 'ADTFoo1'
}
const ADTFoo1: ADT<ADTFoo1, ADTTag> = 1 as any
interface ADTFoo2 {
  type: 'ADTFoo2'
}
const ADTFoo2: ADT<ADTFoo2, ADTTag> = 1 as any
type ADTTag = 'type'

type ADTFoo01 = ADT<ADTFoo0 | ADTFoo1, ADTTag>
const ADTFoo01: ADTFoo01 = 1 as any

type ADTFoo12 = ADT<ADTFoo1 | ADTFoo2, ADTTag>
const ADTFoo12: ADTFoo12 = 1 as any

const unionADTRes = unionADT([ADTFoo01, ADTFoo12]) // $ExpectType ADT<ADTFoo0 | ADTFoo1 | ADTFoo2, "type">
const unionADTRes2 = unionADT([ADTFoo0, ADTFoo1, ADTFoo2]) // $ExpectType ADT<ADTFoo0 | ADTFoo1 | ADTFoo2, "type">

const intersectADTRes = intersectADT(ADTFoo01, ADTFoo12) // $ExpectType ADT<ADTFoo1, "type">

// tslint:disable-next-line: max-line-length
type E = OptionalIfUndefined<{ x: string; y: string | undefined; z?: string; q?: string }> // $ExpectType Compact<{ x: string; } & { y?: string | undefined; } & { z?: string | undefined; } & { q?: string | undefined; }>

type Extracted = ExtractUnion<{ type: 'x'; b: string } | { type: 'y'; c: string }, 'type', 'x'> // $ExpectType { type: "x"; b: string; }

// $ExpectType Extension<"ProgramNoUnionURI", {}>
const extension = Extension.of(ProgramNoUnionURI)
// $ExpectType ProgramInterpreter<"ProgramUnionURI", "BASTJInterpreterURI">
const _BASTJInterpreter = BASTJInterpreter
// $ExpectType <E, A>(program: <G>(x: AlgebraNoUnion<G>) => HKT2<G, E, A>) => BASTJInterpreter<E, A>
const extended = extension.asType().interpretedBy(BASTJInterpreter)

const symA = Symbol()
const symB = Symbol()
const symC = Symbol()

interface Bag {
  [symA]: { type: string }
  [symB]: { tag: number }
  [symC]: { tag: number; type: string }
}

type SelectKeyOfMatchingValuesA = SelectKeyOfMatchingValues<Bag, { type: string }> // $ExpectType typeof symA | typeof symC
type SelectKeyOfMatchingValuesB = SelectKeyOfMatchingValues<Bag, { type: number }> // $ExpectType never
type SelectKeyOfMatchingValuesC = SelectKeyOfMatchingValues<Bag, { tag: any }> // $ExpectType typeof symB | typeof symC
type SelectKeyOfMatchingValuesD = SelectKeyOfMatchingValues<Bag, { tag: number; type: string }> // $ExpectType typeof symC
type SelectKeyOfMatchingValuesE = SelectKeyOfMatchingValues<Bag, { atag: number }> // $ExpectType never

interface ARaw {
  a: string
  type: string
}
interface A {
  a: string
  type: 'A'
}
interface BRaw {
  b: string
  type: string
}
interface B {
  b: string
  type: 'B'
}
interface CRaw {
  c: string
  type: string
}
interface C {
  c: string
  type: 'C'
}
const A = summon<ARaw, A>(F => F.interface({ type: F.stringLiteral('A'), a: F.string() }, 'A'))
const B = summon<BRaw, B>(F => F.interface({ type: F.stringLiteral('B'), b: F.string() }, 'B'))
const C = summon<CRaw, C>(F => F.interface({ type: F.stringLiteral('C'), c: F.string() }, 'C'))

// $ExpectType MorphADT<{ A: [ARaw, A]; B: [BRaw, B]; C: [CRaw, C]; }, "type", "ProgramUnionURI", "BASTJInterpreterURI">
const ABC = tagged('type')({
  A,
  B,
  C
})

// $ExpectType MorphADT<{ A: [ARaw, A]; B: [BRaw, B]; }, "type", "ProgramUnionURI", "BASTJInterpreterURI">
ABC.selectMorph(['A', 'B'])

// $ExpectType MorphADT<{ B: [BRaw, B]; C: [CRaw, C]; }, "type", "ProgramUnionURI", "BASTJInterpreterURI">
ABC.excludeMorph(['A'])

type AM = AOfMorhpADT<typeof ABC> // $ExpectType A | B | C
type EM = EOfMorhpADT<typeof ABC> // $ExpectType ARaw | BRaw | CRaw

// $ExpectType FastCheckType<A | B | C>
const fc = interpretable(ABC)(modelFastCheckInterpreter)
