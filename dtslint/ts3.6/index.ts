import { Remove, ElemType, IfStringLiteral } from '../../src/common/index'
import { ADT, unionADT, intersectADT } from '../../src/adt'

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
