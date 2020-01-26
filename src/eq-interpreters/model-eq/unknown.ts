import { ModelAlgebraUnknown1 } from '../../model-algebras/unknown'
import { EqType, EqURI } from '..'
import { Eq } from 'fp-ts/lib/Eq'
import { circularDeepEqual, deepEqual } from 'fast-equals'
import { UnknownConfig } from '../../algebras/hkt'

declare module '../../algebras/hkt' {
  interface UnknownConfig {
    [EqURI]: Customize | undefined
  }
}

interface Customize {
  compare: 'default-circular' | 'default-non-circular' | Eq<unknown>
}

const getAlgebraConfig = <AlgebraConfig>() => <ConfigKey extends keyof AlgebraConfig>(configKey: ConfigKey) => (
  config: { [configKey in ConfigKey]?: AlgebraConfig[configKey] } | undefined
) => (config !== undefined ? config[configKey] : undefined)

const getUnkownConfig = getAlgebraConfig<UnknownConfig>()

const getEqURIUnkownConfig = getUnkownConfig(EqURI)

export const eqUnknownInterpreter: ModelAlgebraUnknown1<EqURI> = {
  unknown: cfg => {
    const config = getEqURIUnkownConfig(cfg)

    const equals =
      config === undefined
        ? circularDeepEqual
        : config.compare === 'default-circular'
        ? circularDeepEqual
        : config.compare === 'default-non-circular'
        ? deepEqual
        : config.compare.equals

    return new EqType({ equals })
  }
}
