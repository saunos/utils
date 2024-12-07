import * as compat from 'es-toolkit/compat'
import * as est from 'es-toolkit/util'

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').constant}
 */
export const constant: typeof compat.constant = compat.constant

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').defaultTo}
 */
export const defaultTo: typeof compat.defaultTo = compat.defaultTo

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').eq}
 */
export const eq: typeof compat.eq = compat.eq

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/util').invariant}
 */
export const invariant: typeof est.invariant = est.invariant

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').iteratee}
 */
// export const iteratee = compat.iteratee

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').times}
 */
export const times: typeof compat.times = compat.times

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toFinite}
 */
export const toFinite: typeof compat.toFinite = compat.toFinite

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toInteger}
 */
export const toInteger: typeof compat.toInteger = compat.toInteger

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toLength}
 */
export const toLength: typeof compat.toLength = compat.toLength

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toNumber}
 */
export const toNumber: typeof compat.toNumber = compat.toNumber

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toPath}
 */
export const toPath: typeof compat.toPath = compat.toPath

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toSafeInteger}
 */
export const toSafeInteger: typeof compat.toSafeInteger = compat.toSafeInteger

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').toString}
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const toString: typeof compat.toString = compat.toString

/**
 * @category Utility
 *
 * @alias {import('es-toolkit/compat').uniqueId}
 */
export const uniqueId: typeof compat.uniqueId = compat.uniqueId

export type PathProxy<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? PathProxy<U>[] & { toString(): string }
    : T[P] extends object
      ? PathProxy<T[P]> & { toString(): string }
      : { toString(): string }
} & { toString(): string }

/**
 * @category Utility
 *
 * Creates a proxy that allows for type-safe access to
 * nested properties of an object.
 *
 * @example
 * ```ts
 * const $ = jsonPathProxy<DeepObject>()
 * const path1 = $.root.field[1].value.toString() // "root.field[1].value"
 * ```
 */
export function jsonPathProxy<T>(path = ''): PathProxy<T> {
  return new Proxy(
    {},
    {
      get(target, prop: string | symbol) {
        if (prop === 'toString') {
          return () => path
        }

        // Handle array access
        if (typeof prop === 'number' || /^\d+$/.test(prop.toString())) {
          const newPath = path
            ? `${path}[${prop.toString()}]`
            : `[${prop.toString()}]`
          return jsonPathProxy<any>(newPath)
        }

        // Handle property access
        const newPath = path ? `${path}.${prop.toString()}` : prop.toString()
        return jsonPathProxy<any>(newPath)
      }
    }
  ) as PathProxy<T>
}

/**
 * @category Utility
 *
 * Creates a lazy-evaluated value and automatically memoizes it.
 *
 * @example
 * ```ts
 * const {value} = lazy(() => 1 + 1)
 * value // 2
 * ```
 */
export function lazy<T>(fn: () => T): { value: T } {
  return {
    get value(): T {
      const value = fn()
      Object.defineProperty(this, 'value', { value })
      return value
    }
  }
}
