type JsonPathBase<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? JsonPathBase<U>[] & { $: string }
    : T[P] extends object
      ? JsonPathBase<T[P]> & { $: string }
      : { $: string }
} & { $: string }

// Remove optional keys from object type
type RequiredKeys<T> = {
  [K in keyof T]-?: T[K]
}

// Deeply remove optional, undefined and null
type DeepRequired<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepRequired<NonNullable<U>>>
    : RequiredKeys<{
        [K in keyof T]: DeepRequired<NonNullable<T[K]>>
      }>
  : NonNullable<T>

export type JsonPath<T> = JsonPathBase<DeepRequired<T>>

/**
 * @category Utility
 *
 * Creates a proxy that allows for type-safe access to
 * nested properties of an object.
 *
 * @example
 * ```ts
 * const $ = jsonPathProxy<DeepObject>()
 * const path1 = $.root.field[1].value.$ // "root.field[1].value"
 * ```
 */
export function jsonPathProxy<T>(path = ''): JsonPath<T> {
  return new Proxy(
    {},
    {
      get(target, prop: string | symbol) {
        if (prop === '$') {
          return path
        }

        // Handle array access
        if (typeof prop === 'number' || /^\d+$/.test(prop.toString())) {
          const newPath = path
            ? `${path}[${prop.toString()}]`
            : `[${prop.toString()}]`
          return jsonPathProxy<NonNullable<any>>(newPath)
        }

        // Handle property access
        const newPath = path ? `${path}.${prop.toString()}` : prop.toString()
        return jsonPathProxy<
          NonNullable<
            T extends object ? { [K in keyof T]: NonNullable<T[K]> } : T
          >
        >(newPath)
      }
    }
  ) as JsonPath<T>
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
