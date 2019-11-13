import * as chai from 'chai'
import { summon, M } from '../../src/utils/summoner'
import { EType, AType } from '../../src/usage/materializer'
import { AlgebraUnion } from '../../src/utils/program'
import { record } from 'fp-ts'
import { HKT2 } from '../../src/HKT'
import { TagsOf } from '../../src/common'
import { isRight } from 'fp-ts/lib/Either'

type AnyM = M<any, any>

const tagged = <Tag extends string>(tag: Tag) => <
  Types extends { [k in keyof Types]: M<EType<Types[k]>, AType<Types[k]> & { [t in Tag]: k }> }
>(
  o: Types
) => {
  const summoned = summon(<G>(F: AlgebraUnion<G>) => {
    return F.taggedUnion(tag, record.mapWithIndex((k, v: AnyM) => v(F))(o) as any) as HKT2<
      G,
      {
        [k in keyof Types]: EType<Types[k]>
      }[keyof Types],
      {
        [k in keyof Types]: AType<Types[k]>
      }[keyof Types]
    >
  })
  const tagged = summoned.tagged(tag as typeof tag & TagsOf<AType<Types[keyof Types]>> & string)(
    o as any
  ) // We're bending reality as bit
  return {
    summoned,
    tagged
  }
}

describe('Usage', () => {
  it('Should reexpose `program` in order to make the Morph usable', () => {
    const AType = summon(F =>
      F.interface({
        type: F.stringLiteral('AType')
      })
    )
    const BType = summon(F =>
      F.interface({
        type: F.stringLiteral('BType')
      })
    )
    const Union = tagged('type')({
      AType,
      BType
    })

    const Used = summon(F =>
      F.interface({
        x: Union.tagged.program(F)
      })
    )

    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })
})
