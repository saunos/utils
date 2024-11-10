import * as compat from 'es-toolkit/compat'
import * as est from 'es-toolkit/object'
import { objectify } from './array'
import { isPlainObject } from './predicates'

/**
 * @category Object
 *
 * @description
 * Removes (shakes out) undefined entries from an
 * object. Optional second argument shakes out values
 * by custom evaluation.
 *
 * @example
 * const ra = {
 *   mode: 'god',
 *   greek: false,
 *   limit: undefined
 * }
 *
 * shake(ra) // => { mode, greek }
 * shake(ra, a => !a) // => { mode }
 */
export const shake = <RemovedKeys extends string, T>(
  obj: Readonly<T>,
  filter: (value: unknown) => boolean = x => x === undefined
): Omit<T, RemovedKeys> => {
  if (!obj) return {} as T
  const keys = Object.keys(obj) as (keyof T)[]
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc
    }
    acc[key] = obj[key]
    return acc
  }, {} as T)
}

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').mapKeys}
 */
export const mapKeys: typeof est.mapKeys = est.mapKeys

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').mapValues}
 */
export const mapValues: typeof est.mapValues = est.mapValues

/**
 * @category Object
 *
 * @description
 * Map over all the keys to create a new object
 *
 * @example
 * const ra = {
 *   name: 'Ra',
 *   power: 'sun',
 *   rank: 100,
 *   culture: 'egypt'
 * }
 *
 * mapEntries(ra, (key, value) => [key.toUpperCase(), `${value}`]) // => { NAME: 'Ra', POWER: 'sun', RANK: '100', CULTURE: 'egypt' }
 */
export const mapEntries = <
  TKey extends string | number | symbol,
  TValue,
  TNewKey extends string | number | symbol,
  TNewValue
>(
  obj: Readonly<Record<TKey, TValue>>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue]
): Record<TNewKey, TNewValue> => {
  if (!obj) return {} as Record<TNewKey, TNewValue>
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const [newKey, newValue] = toEntry(key as TKey, value as TValue)
      acc[newKey] = newValue
      return acc
    },
    {} as Record<TNewKey, TNewValue>
  )
}

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').invert}
 */
export const invert: typeof est.invert = est.invert

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').clone}
 */
export const clone: typeof est.clone = est.clone

/**
 * @category Object
 *
 * @description
 * Convert an object to a list, mapping each entry
 * into a list item
 *
 * @example
 * const fish = {
 *   marlin: {
 *     weight: 105,
 *   },
 *   bass: {
 *     weight: 8,
 *   }
 * }
 *
 * listify(fish, (key, value) => ({ ...value, name: key })) // => [{ name: 'marlin', weight: 105 }, { name: 'bass', weight: 8 }]
 */
export function listify<TValue, TKey extends string | number | symbol, KResult>(
  obj: Readonly<Record<TKey, TValue>>,
  toItem: (key: TKey, value: TValue) => KResult
): KResult[] {
  if (!obj) return []
  const entries = Object.entries(obj)
  if (entries.length === 0) return []
  return entries.reduce(
    (acc, entry) => {
      acc.push(toItem(entry[0] as TKey, entry[1] as TValue))
      return acc
    },
    [] as KResult[]
  )
}

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').pick}
 */
export const pick: typeof est.pick = est.pick

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').omit}
 */
export const omit: typeof est.omit = est.omit

// https://www.typescriptlang.org/play/?#code/MYewdgzgLgBAJgQygmBeGBvAUASAJZQCmAthAFwwDaGMYCxhFARKADZ5gAWCwA1hExgBfALoAaXADMQICjQBGCAE4UoSgK6FhEnAHNCsOIUIAHQkoAUASky4cSg+qVh4SBLiFZPWAPQ+YCOpQIKDEJqwGhBABsIQ8nDDQpligkLAgQWgw+lAWiMhiMEwEJBAAdAAMTFa+-jD1AHoA-FhYkupgwFB44NkGADyp0DAgMIQAHkRgcNEg8gBWhF2FJkgJE1MziWocugB8Frj5CBQgOqtQnADKahSp0krE-RechdBKuzAAZDAAbgjsfKEAAKa36ZxgLz2eywVgoOVBl3BKzWe1sOAisGQShyFAQYAAnlljrghrAXlkXjclGUIOECBYmGVqrgAO6cPARGAWF5lCJgXSXGzYnJZEUGSi8iAcyS5KwAQhEuAcUCcLnFUC8rR8ACodTAALJ4Yh4YDRS5aBwQdSsdKSGAAeQWSygZV4hAJEAsZR9Nh1PiwUAJZhg7oJDsk4LRqFwow2hGm0QcCDg4FYRI6vDAIFZYEoIhgLRwODA6mI8nMY0mCa2IEoTH5gs4TALReLAAMACQYUvl8xCdt2Mg4MMge2jH5dntlitKAe4YfYYs4Si8GAcUMescjEQUNfxxPbD4Cwuhuw4PdVzbRXuz09T3jz5cUMCEX7mOxCVdb8dKwPBrQcgAaQ9ZFQ2jXB92rQ9R3HU8614JUL1DK8a2iKcOEkSsXAPLZb0rH5YJGAd4MoMAkJfN8P3-EMETBCEKVw6J3l2CCcEY6CtgwsAsKUGBODiOAhDKbtMMrZBORIpo+igRFOH6YDQIhASUz2QoJNYGELz0AwQIJMCoVaIMQ3+QEkBBeiUUuVDDxYgUVgcSQ8HGGytjs3QsiYJg2I468YG43j+ME4TRJ48SEEk9tCzsFS4Fc6IwwjKNouXUy8CBOSFN0pTClitSYA0wopxMRznKEbtYuE9stO09s9JgAByCrgoa9cbxAWA0ri6RWFYHNPiajASsIJzxiEBrB2Q3y0M3cNIxANFpOK0qxu7F4nzkc8-BgJzpkSdRJFGqICu4WBWQyVg4uIBB3ROrQIEIXQGDATqAXS89V3XFxEvmvZdxQpj-LWtZyowdypKBoaVtBx8oso98lE-b85qjP9jK0e4QEefooEKRQHujAr4pgfGtGk2AKFJrAgA
// https://www.typescriptlang.org/play/?#code/C4TwDgpgBA4hwAUCGwAWAeAKgERUqEAHsBAHYAmAzlAPYBGAVhAMbAA0UmyaBxZVUSsABOAS1IBzAHxQAvACgonbql4kK1AAYASAN7iAZhGGcAYqOFCAvgDo9h45wBKEa5sVQA-GYtC1-agBrCBAaA05cYCQPJW8cPABtTHNLYABdfw1aRhZgGKUvWHgVLEikJJShNI5MFyEpfKUALihSCAA3Y3yW5N9gTIEdfVIjE0wASQoiAepSAFcAWzpjK3cCgriymagkUhAEtMaNosQUDHiopMnyImrnV2AG9fWWts7hI9eOrublM+3gqFwhdoutNokuGdDi8-jwiOpBvYRo4JlNCNt5ksVmtnuCottdvtoc9YhEIddbkdfm8fs8vu8ANzyeSgSCcGgAZRE4gkWG2CGENEgwlAAGkQjIFJxtkIxJJCpgoD0MYtliZvENMKsla1vsImSzwNBsBAIGBxSBKFgAPKMSVQXQeBKiqDiKCAsKcW0MNItfKYb3OjLwgI7PYHI5xQOitIJABEABsyBI0HHg3wsgAGKmFTWc7mSdCiqSrHMtPNcuW84vagA+UArBerJbsukxarrDb0mHzVaLLb07ZWrZNZotVoDjCDCSHwjSJZxMMnDCD23oTFYOY13d7PP7ncbfZrI9N5pCE+j89LJN+h73NfcVgSHuB3rSBtZ0EwD3Hcigo7PS10F0V0SAWSgWhA0gkAWCAWjjZgaATcRUCQZhAkoOMoCfO4DBoGhIKgOgkGEFoAFZsI4YiAC8WgARkzDg6PozNsKkJkAHoOIKAA9TxmQMOZSFYUQaFIKAJHgUo8DXHJWBqFRtgA8dpKie1-1PFSQSkKQAApyDwHoyg4MAzkrHoVAAShaOBTjQVSkAUs4ZEdJQk36KJhEk4AWkJP8DKiJklEQ0g-FMnhZCgcLUErGxKDAZDgF0uMbDjSygqgAB3VBRCTKBdOimwk0kNBLKgTzvL-Cr4ASQrKBygwkssgBCd8PGEeA5mEcTquAJkrGZEK-AC-BIpA0QwIgqAEigmC4KgBCkJQtCMKwqwMisA0OIAKigABaA7DqOvaoG2jj5B2qAAEUAFUAFEnAATU4O6OUwDlTvOy7jp+z75CG-oRvGSa-28-S8A4OMJogcC0s47jeP4gGoCBybWMisGRsh6HwJsTM4YuhGlD4-6xOGvAADk5tB+BwaibHJrxmxoNggmuPWEmLt2n7Dr+y7RTu57MFe96+e5nmTrO0nQv6AXHoAfWFt6PsihIPExiGFpxzDLLYdXaaxrXGfx3X9aSw2ocZujmbmtK9aUDX6aNmHKBsAAmG3WdNpR2Z4qAOVQhME1aGh+gMJBcuZB2Dc1y2XfduKupZiA7Y8X3-cD4Pw8jtIgA
/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').get}
 */
export const get: typeof compat.get = compat.get

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').set}
 */
export const set: typeof compat.set = compat.set

/**
 * @category Object
 *
 * @description
 * Get a string list of all key names that exist in
 * an object (deep).
 *
 * @example
 * keys({ name: 'ra' }) // ['name']
 * keys({ name: 'ra', children: [{ name: 'hathor' }] }) // ['name', 'children.0.name']
 */
export const flattenKeys = <TValue extends object>(value: TValue): string[] => {
  if (!value) return []

  const getKeys = (nested: any, paths: string[]): string[] => {
    if (isPlainObject(nested)) {
      return Object.entries(nested).flatMap(([k, v]) =>
        getKeys(v, [...paths, k])
      )
    }
    if (Array.isArray(nested)) {
      return nested.flatMap((item, i) => getKeys(item, [...paths, `${i}`]))
    }
    return [paths.join('.')]
  }
  return getKeys(value, [])
}

/**
 * @category Object
 *
 * @description
 * Flattens a deep object to a single dimension, converting
 * the keys to dot notation.
 *
 * @example
 * flattenObject({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 */
export const flattenObject = <TValue extends object>(value: TValue): object => {
  if (!value) return {}
  return objectify(
    flattenKeys(value),
    k => k,
    k => get(value, k)
  )
}

/**
 * @category Object
 *
 * @description
 * The opposite of crush, given an object that was
 * crushed into key paths and values will return
 * the original object reconstructed.
 *
 * @example
 * construct({ name: 'ra', 'children.0.name': 'hathor' })
 * // { name: 'ra', children: [{ name: 'hathor' }] }
 */
export const construct = <TObject extends object>(obj: TObject): object => {
  if (!obj) return {}
  return Object.keys(obj).reduce((acc, path) => {
    return set(acc, path, (obj as any)[path])
  }, {})
}

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').merge}
 */
export const merge: typeof est.merge = est.merge

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').cloneDeep}
 */
export const cloneDeep: typeof est.cloneDeep = est.cloneDeep

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').mergeWith}
 */
export const mergeWith: typeof est.mergeWith = est.mergeWith

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').omitBy}
 */
export const omitBy: typeof est.omitBy = est.omitBy

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').pickBy}
 */
export const pickBy: typeof est.pickBy = est.pickBy

/**
 * @category Object
 *
 * @alias {import('es-toolkit/object').toMerged}
 */
export const toMerged: typeof est.toMerged = est.toMerged

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').unset}
 */
export const unset: typeof compat.unset = compat.unset

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').defaults}
 */
export const defaults: typeof compat.defaults = compat.defaults

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').fromPairs}
 */
export const fromPairs: typeof compat.fromPairs = compat.fromPairs

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').has}
 */
export const has: typeof compat.has = compat.has

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').invertBy}
 */
export const invertBy: typeof compat.invertBy = compat.invertBy

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').property}
 */
export const property: typeof compat.property = compat.property

/**
 * @category Object
 *
 * @alias {import('es-toolkit/compat').toDefaulted}
 */
export const toDefaulted: typeof compat.toDefaulted = compat.toDefaulted
