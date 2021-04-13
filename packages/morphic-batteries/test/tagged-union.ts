import { intersectADT, unionADT } from '@morphic-ts/adt'
import type { AType, EType } from '@morphic-ts/summoners'
import * as chai from 'chai'
import { right } from 'fp-ts/lib/Either'

import { AsOpaque, summonFor } from '../src/summoner-BASTJ'

const { summon, tagged } = summonFor<{}>({})

const ObjA_ = summon(F => F.interface({ type: F.stringLiteral('ObjA') }, { name: 'ObjA' }))
export interface ObjA extends AType<typeof ObjA_> {}
export interface ObjARaw extends EType<typeof ObjA_> {}
export const ObjA = AsOpaque<ObjARaw, ObjA>()(ObjA_)

const ObjB_ = summon(F => F.interface({ type: F.stringLiteral('ObjB') }, { name: 'ObjB' }))
export interface ObjB extends AType<typeof ObjB_> {}
export interface ObjBRaw extends EType<typeof ObjB_> {}
export const ObjB = AsOpaque<ObjBRaw, ObjB>()(ObjB_)

const ObjC_ = summon(F => F.interface({ type: F.stringLiteral('ObjC') }, { name: 'ObjC' }))
export interface ObjC extends AType<typeof ObjC_> {}
export interface ObjCRaw extends EType<typeof ObjC_> {}
export const ObjC = AsOpaque<ObjCRaw, ObjC>()(ObjC_)

const ObjD_ = summon(F => F.interface({}, { name: 'ObjD' }))
export interface ObjD extends AType<typeof ObjD_> {}
export interface ObjDRaw extends EType<typeof ObjD_> {}
export const ObjD = AsOpaque<ObjDRaw, ObjD>()(ObjD_)

const TaggedAB = tagged('type')({
  ObjA,
  ObjB
})

const TaggedBC = tagged('type')({
  ObjB,
  ObjC
})

const TaggedAC = tagged('type')({
  ObjA,
  ObjC
})

const ObjCTag_ = summon(F => F.interface({ type: F.tag('ObjCTag'), x: F.string() }, { name: 'ObjCTag' }))
export interface ObjCTag extends AType<typeof ObjCTag_> {}
export interface ObjCTagRaw extends EType<typeof ObjCTag_> {}
export const ObjCTag = AsOpaque<ObjCTagRaw, ObjCTag>()(ObjCTag_)

const ObjDTag_ = summon(F => F.interface({ type: F.tag('ObjDTag'), y: F.number() }, { name: 'ObjDTag' }))
export interface ObjDTag extends AType<typeof ObjDTag_> {}
export interface ObjDTagRaw extends EType<typeof ObjDTag_> {}
export const ObjDTag = AsOpaque<ObjDTagRaw, ObjDTag>()(ObjDTag_)

const TaggedABTag = tagged('type')({
  ObjCTag,
  ObjDTag
})

describe('tagged-union', () => {
  it('can union via unionADT (should compile)', () => {
    unionADT([TaggedAB, TaggedBC, TaggedAC])
  })
  it('can intersect via intersectADT (should compile)', () => {
    intersectADT(TaggedAB, TaggedBC)
  })

  it('decoded with `tag`', () => {
    const objcTag: unknown = { x: 's' }
    const objdTag: unknown = { y: 1 }
    chai.assert.deepStrictEqual(TaggedABTag.type.decode(objcTag), right({ type: 'ObjCTag' as const, x: 's' }))
    chai.assert.deepStrictEqual(TaggedABTag.type.decode(objdTag), right({ type: 'ObjDTag' as const, y: 1 }))
  })
})
