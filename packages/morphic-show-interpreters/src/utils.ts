import type { Named } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export const wrapShow = (config: Named<unknown> | undefined, s: string) =>
  config?.name ? `<${config?.name}>(${s})` : s
