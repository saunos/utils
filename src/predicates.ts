import * as est from 'es-toolkit'
import * as compat from 'es-toolkit/compat'

/**
 * @category Predicates
 */
export const isObject: typeof compat.isObject = compat.isObject

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

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').conforms}
 */
export const conforms: typeof compat.conforms = compat.conforms

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').conformsTo}
 */
export const conformsTo: typeof compat.conformsTo = compat.conformsTo

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isArguments}
 */
export const isArguments: typeof compat.isArguments = compat.isArguments

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isArray}
 */
export const isArray: typeof compat.isArray = compat.isArray

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isArrayBuffer}
 */
export const isArrayBuffer: typeof est.isArrayBuffer = est.isArrayBuffer

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isArrayLike}
 */
export const isArrayLike: typeof compat.isArrayLike = compat.isArrayLike

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isArrayLikeObject}
 */
export const isArrayLikeObject: typeof compat.isArrayLikeObject =
  compat.isArrayLikeObject

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isBlob}
 */
export const isBlob: typeof est.isBlob = est.isBlob

/**
 * @category Predicates
 */
export const isBoolean: typeof compat.isBoolean = compat.isBoolean

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isDate}
 */
export const isDate: typeof est.isDate = est.isDate

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isEqual}
 */
export const isEqual: typeof est.isEqual = est.isEqual

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isEqualWith}
 */
export const isEqualWith: typeof compat.isEqualWith = compat.isEqualWith

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isError}
 */
export const isError: typeof est.isError = est.isError

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isFile}
 */
export const isFile: typeof est.isFile = est.isFile

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isFinite}
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const isFinite: typeof compat.isFinite = compat.isFinite

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isFunction}
 */
export const isFunction: typeof compat.isFunction = compat.isFunction

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isInteger}
 */
export const isInteger: typeof compat.isInteger = compat.isInteger

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isJSONArray}
 */
export const isJSONArray: typeof est.isJSONArray = est.isJSONArray

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isJSONObject}
 */
export const isJSONObject: typeof est.isJSONObject = est.isJSONObject

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isJSONValue}
 */
export const isJSONValue: typeof est.isJSONValue = est.isJSONValue

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isLength}
 */
export const isLength: typeof compat.isLength = compat.isLength

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isMap}
 */
export const isMap: typeof est.isMap = est.isMap

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isMatch}
 */
export const isMatch: typeof compat.isMatch = compat.isMatch

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isNil}
 */
export const isNil: typeof compat.isNil = compat.isNil

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isNotNil}
 */
export const isNotNil: typeof compat.isNotNil = compat.isNotNil

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isNull}
 */
export const isNull: typeof compat.isNull = compat.isNull

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isNumber}
 */
export const isNumber: typeof compat.isNumber = compat.isNumber

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isObjectLike}
 */
export const isObjectLike: typeof compat.isObjectLike = compat.isObjectLike

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isPlainObject}
 */
export const isPlainObject: typeof compat.isPlainObject = compat.isPlainObject

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isPrimitive}
 */
export const isPrimitive: typeof compat.isPrimitive = compat.isPrimitive

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isRegExp}
 */
export const isRegExp: typeof est.isRegExp = est.isRegExp

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isSafeInteger}
 */
export const isSafeInteger: typeof compat.isSafeInteger = compat.isSafeInteger

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isSet}
 */
export const isSet: typeof est.isSet = est.isSet

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isString}
 */
export const isString: typeof compat.isString = compat.isString

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isSymbol}
 */
export const isSymbol: typeof est.isSymbol = est.isSymbol

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isTypedArray}
 */
export const isTypedArray: typeof est.isTypedArray = est.isTypedArray

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isUndefined}
 */
export const isUndefined: typeof compat.isUndefined = compat.isUndefined

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isWeakMap}
 */
export const isWeakMap: typeof est.isWeakMap = est.isWeakMap

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').isWeakSet}
 */
export const isWeakSet: typeof est.isWeakSet = est.isWeakSet

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').matches}
 */
export const matches: typeof compat.matches = compat.matches

/**
 * @category Predicates
 *
 * @alias {import('es-toolkit/predicates').matchesProperty}
 */
export const matchesProperty: typeof compat.matchesProperty =
  compat.matchesProperty
