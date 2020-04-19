import { summonFor, AsOpaque } from '../../src/summoner-BASTJ'
import { AType, EType } from '../../src/usage/utils'

const { summon, tagged } = summonFor<{}>({})

const CommonType = summon(F =>
  F.keysOf({
    none: null,
    foo: null,
    bar: null
  })
)

const TypeA_ = summon(F =>
  F.interface(
    {
      event: F.stringLiteral('TypeA'),
      common: CommonType(F)
    },
    'TypeA'
  )
)
interface TypeA extends AType<typeof TypeA_> {}
interface TypeAR extends EType<typeof TypeA_> {}

const TypeA = AsOpaque<TypeAR, TypeA>()(TypeA_)

const TypeB_ = summon(F =>
  F.interface(
    {
      event: F.stringLiteral('TypeB'),
      common: CommonType(F)
    },
    'TypeB'
  )
)
interface TypeB extends AType<typeof TypeB_> {}
interface TypeBR extends EType<typeof TypeB_> {}

const TypeB = AsOpaque<TypeBR, TypeB>()(TypeB_)

const ADT = tagged('event')({
  TypeA,
  TypeB
})

ADT.of // $ExpectType Of<TypeA | TypeB, "event">
