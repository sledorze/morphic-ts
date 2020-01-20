import { ADT, unionADT, intersectADT } from '../../src/adt'
import { Extension, ExtType } from '../../src/usage/extend'
import { Remove, ElemType, ExtractUnion } from '../../src/adt/utils'
import { IfStringLiteral } from '../../src/usage/utils'
import { OptionalIfUndefined } from '../../src/common/core'
import { BASTJInterpreter } from '../../src/batteries/interpreters-BAST'
import { ProgramNoUnionURI } from '../../src/batteries/program-no-union'

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

// $ExpectType Extension<typeof ProgramNoUnionURI, {}>
const extension = Extension.of(ProgramNoUnionURI)
// $ExpectType ProgramInterpreter<typeof ProgramUnionURI, typeof BASTJInterpreterURI>
const _BASTJInterpreter = BASTJInterpreter
// $ExpectType <E, A>(program: <G>(x: AlgebraNoUnion<G>) => HKT2<G, E, A>) => BASTJInterpreter<E, A>
const extended = extension.asType().interpretedBy(BASTJInterpreter)
