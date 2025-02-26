import { isDate, isFunction, isSymbol } from 'es-toolkit/compat'
import { isNumber } from 'es-toolkit/compat'

/**
 * @category Predicates
 */
export const isInt = (value: any): value is number => {
  return isNumber(value) && value % 1 === 0
}

/**
 * @category Predicates
 *
 * @description
 * This is really a _best guess_ promise checking. You
 * should probably use Promise.resolve(value) to be 100%
 * sure you're handling it correctly.
 */
export const isPromise = (value: any): value is Promise<any> => {
  if (!value) return false
  if (!value.then) return false
  if (!isFunction(value.then)) return false
  return true
}

/**
 * @category Predicates
 */
export function isEmpty(value: any): boolean {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (isNumber(value)) return value === 0
  if (isDate(value)) return Number.isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  const size = (value as any).size
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}

/**
 * @category Predicates
 *
 * @description
 * Asserts that the given condition is true, otherwise throws an error.
 */
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}

/**
 * @category Predicates
 *
 * @description
 * Asserts that the given value is not null or undefined, otherwise throws an error.
 */
export function assertNotNull<T>(
  value: T,
  msg?: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(msg)
  }
}

/**
 * @category Predicates
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected object: ${value}`)
}
