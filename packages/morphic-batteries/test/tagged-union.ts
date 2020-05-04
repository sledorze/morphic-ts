import { summonFor, AsOpaque } from '../src/summoner-BASTJ'
import { AType, EType } from '../src/usage/utils'
import { unionADT, intersectADT } from '@morphic-ts/adt'

const { summon, tagged } = summonFor<{}>({})

const ObjA_ = summon(F => F.interface({ type: F.stringLiteral('ObjA') }, 'ObjA'))
export interface ObjA extends AType<typeof ObjA_> {}
export interface ObjARaw extends EType<typeof ObjA_> {}
export const ObjA = AsOpaque<ObjARaw, ObjA>()(ObjA_)

const ObjB_ = summon(F => F.interface({ type: F.stringLiteral('ObjB') }, 'ObjB'))
export interface ObjB extends AType<typeof ObjB_> {}
export interface ObjBRaw extends EType<typeof ObjB_> {}
export const ObjB = AsOpaque<ObjBRaw, ObjB>()(ObjB_)

const ObjC_ = summon(F => F.interface({ type: F.stringLiteral('ObjC') }, 'ObjC'))
export interface ObjC extends AType<typeof ObjC_> {}
export interface ObjCRaw extends EType<typeof ObjC_> {}
export const ObjC = AsOpaque<ObjCRaw, ObjC>()(ObjC_)

const ObjD_ = summon(F => F.interface({}, 'ObjD'))
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

describe('tagged-union', () => {
  it('can union via unionADT (should compile)', () => {
    unionADT([TaggedAB, TaggedBC, TaggedAC])
  })
  it('can intersect via intersectADT (should compile)', () => {
    intersectADT(TaggedAB, TaggedBC)
  })
})
