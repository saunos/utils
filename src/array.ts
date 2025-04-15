import { isFunction } from 'es-toolkit/compat'

/**
 * @category Array
 *
 * @description
 * Go through a list of items, starting with the first item,
 * and comparing with the second. Keep the one you want then
 * compare that to the next item in the list with the same
 *
 * @example
 * const greatest = () => boil(numbers, (a, b) => a > b)
 */
export const boilDownTo = <T>(
  array: readonly T[],
  compareFunc: (a: T, b: T) => T
): T | null => {
  if (!array || (array.length ?? 0) === 0) return null
  return array.reduce(compareFunc)
}

/**
 * @category Array
 *
 * @description
 * Replace an element in an array with a new
 * item without modifying the array and return
 * the new value
 *
 * @example
 * const fish = [
 *  {
 *    name: 'Marlin',
 *    weight: 105
 *  },
 *  {
 *    name: 'Bass',
 *    weight: 8
 *  },
 *  {
 *    name: 'Trout',
 *    weight: 13
 *  }
 * ]
 *
 * const salmon = {
 *   name: 'Salmon',
 *   weight: 22
 * }
 *
 * replace(fish, salmon, f => f.name === 'Bass') // => [marlin, salmon, trout]
 */
export const replace = <T>(
  list: readonly T[],
  newItem: T,
  match: (item: T, idx: number) => boolean
): T[] => {
  if (!list) return []
  if (newItem === undefined) return [...list]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        ...list.slice(0, idx),
        newItem,
        ...list.slice(idx + 1, list.length)
      ]
    }
  }
  return [...list]
}

/**
 * @category Array
 *
 * @description
 * Convert an array to a dictionary by mapping each item
 * into a dictionary key & value
 *
 * @example
 * const fish = [
 *   {
 *     name: 'Marlin',
 *     weight: 105
 *   },
 *   {
 *     name: 'Bass',
 *     weight: 8
 *   },
 *   {
 *     name: 'Trout',
 *     weight: 13
 *   }
 * ]
 * objectify(fish, f => f.name) // => { Marlin: [marlin object], Bass: [bass object], ... }
 * objectify(
 *   fish,
 *   f => f.name,
 *   f => f.weight
 * ) // => { Marlin: 105, Bass: 8, Trout: 13 }
 */
export const objectify = <T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value
): Record<Key, Value> => {
  return array.reduce(
    (acc, item) => {
      acc[getKey(item)] = getValue(item)
      return acc
    },
    {} as Record<Key, Value>
  )
}

/**
 * @category Array
 *
 * @description
 * Max gets the greatest value from a list
 *
 * @example
 * max([ 2, 3, 5]) == 5
 */
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(array: readonly T[]): T | null {
  return boilDownTo(array, (a, b) => (a > b ? a : b))
}

/**
 * @category Array
 *
 * @description
 * Min gets the smallest value from a list
 *
 * @example
 * min([1, 2, 3, 4]) == 1
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(array: readonly T[]): T | null {
  return boilDownTo(array, (a, b) => (a < b ? a : b))
}

/**
 * @category Array
 *
 * @description
 * Creates a generator that will produce an iteration through
 * the range of number as requested.
 *
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 */
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step = 1
): Generator<T> {
  const mapper = (
    isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  ) as (i: number) => T
  const start = end ? startOrLength : 0
  const final = end ?? startOrLength
  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    if (i + step > final) break
  }
}

/**
 * @category Array
 *
 * @description
 * Creates a list of given start, end, value, and
 * step parameters.
 *
 * @example
 * list(3)                  // 0, 1, 2, 3
 * list(0, 3)               // 0, 1, 2, 3
 * list(0, 3, 'y')          // y, y, y, y
 * list(0, 3, () => 'y')    // y, y, y, y
 * list(0, 3, i => i)       // 0, 1, 2, 3
 * list(0, 3, i => `y${i}`) // y0, y1, y2, y3
 * list(0, 3, obj)          // obj, obj, obj, obj
 * list(0, 6, i => i, 2)    // 0, 2, 4, 6
 */
export const list = <T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper?: T | ((i: number) => T),
  step?: number
): T[] => {
  return Array.from(range(startOrLength, end, valueOrMapper, step))
}

/**
 * @category Array
 *
 * @description
 * Given two arrays, returns true if any
 * elements intersect
 *
 * @example
 * const oceanFish = ['tuna', 'tarpon']
 * const lakeFish = ['bass', 'trout']
 *
 * intersects(oceanFish, lakeFish) // => false
 *
 * const brackishFish = ['tarpon', 'snook']
 *
 * intersects(oceanFish, brackishFish) // => true
 */
export const intersects = <T, K extends string | number | symbol>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K
): boolean => {
  if (!listA || !listB) return false
  const ident = identity ?? ((x: T) => x as unknown as K)
  const dictB = listB.reduce(
    (acc, item) => {
      acc[ident(item)] = true
      return acc
    },
    {} as Record<string | number | symbol, boolean>
  )
  return listA.some(value => dictB[ident(value)])
}

/**
 * @category Array
 *
 * @description
 * Given two lists of the same type, iterate the first list
 * and replace items matched by the matcher func in the
 * first place.
 *
 * @example
 *
 * const gods = [
 *   {
 *     name: 'Zeus',
 *     power: 92
 *   },
 *   {
 *     name: 'Ra',
 *     power: 97
 *   }
 * ]
 *
 * const newGods = [
 *   {
 *     name: 'Zeus',
 *     power: 100
 *   }
 * ]
 *
 * mergeBy(gods, newGods, f => f.name) // => [{name: "Zeus" power: 100}, {name: "Ra", power: 97}]
 */
export const mergeBy = <T>(
  root: readonly T[],
  others: readonly T[],
  matcher: (item: T) => any
): readonly T[] => {
  if (!others && !root) return []
  if (!others) return root
  if (!root) return []
  if (!matcher) return root
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    if (matched) acc.push(matched)
    else acc.push(r)
    return acc
  }, [] as T[])
}

/**
 * @category Array
 *
 * @description
 * Replace an item in an array by a match function condition. If
 * no items match the function condition, appends the new item to
 * the end of the list.
 *
 * @example
 * const fish = [
 *   {
 *     name: 'Marlin',
 *     weight: 105
 *   },
 *   {
 *     name: 'Salmon',
 *     weight: 19
 *   },
 *   {
 *     name: 'Trout',
 *     weight: 13
 *   }
 * ]
 *
 * const salmon = {
 *   name: 'Salmon',
 *   weight: 22
 * }
 *
 * const sockeye = {
 *   name: 'Sockeye',
 *   weight: 8
 * }
 *
 * replaceOrAppend(fish, salmon, f => f.name === 'Salmon') // => [marlin, salmon (weight:22), trout]
 * replaceOrAppend(fish, sockeye, f => f.name === 'Sockeye') // => [marlin, salmon, trout, sockeye]
 */
export const replaceOrAppend = <T>(
  list: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean
): T[] => {
  if (!list && !newItem) return []
  if (!newItem) return [...list]
  if (!list) return [newItem]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        ...list.slice(0, idx),
        newItem,
        ...list.slice(idx + 1, list.length)
      ]
    }
  }
  return [...list, newItem]
}

/**
 *
 */
const _toggle = <T>(
  list: readonly T[],
  item: T,
  /**
   * Converts an item of type T item into a value that
   * can be checked for equality
   */
  toKey?: null | ((item: T, idx: number) => number | string | symbol),
  options?: {
    strategy?: 'prepend' | 'append'
  }
) => {
  if (!list && !item) return []
  if (!list) return [item]
  if (!item) return [...list]
  const matcher = toKey
    ? (x: T, idx: number) => toKey(x, idx) === toKey(item, idx)
    : (x: T) => x === item
  const existing = list.find(matcher)
  if (existing) return list.filter((x, idx) => !matcher(x, idx))
  const strategy = options?.strategy ?? 'append'
  if (strategy === 'append') return [...list, item]
  return [item, ...list]
}

/**
 * @category Array
 *
 * @deprecated use xor instead
 *
 * @description
 * If the item matching the condition already exists
 * in the list it will be removed. If it does not it
 * will be added.
 *
 * @example
 * const gods = ['ra', 'zeus', 'loki']
 *
 * toggle(gods, 'ra')     // => [zeus, loki]
 * toggle(gods, 'vishnu') // => [ra, zeus, loki, vishnu]
 *
 * const ra = { name: 'Ra' }
 * const zeus = { name: 'Zeus' }
 * const loki = { name: 'Loki' }
 * const vishnu = { name: 'Vishnu' }
 *
 * const gods = [ra, zeus, loki]
 *
 * toggle(gods, ra, g => g.name)     // => [zeus, loki]
 * toggle(gods, vishnu, g => g.name) // => [ra, zeus, loki, vishnu]
 *
 * const gods = ['ra', 'zeus', 'loki']
 *
 * toggle(gods, 'vishnu', g => g, { strategy: 'prepend' }) // => [vishnu, ra, zeus, loki]
 *
 * toggle(gods, ['vishnu', 'ra']) // => [vishnu, zeus, loki]
 */
export const toggle = <T>(
  list: readonly T[],
  items: readonly T[] | T,
  /**
   * Converts an item of type T item into a value that
   * can be checked for equality
   */
  toKey?: null | ((item: T, idx: number) => number | string | symbol),
  options?: {
    strategy?: 'prepend' | 'append'
  }
): T[] => {
  if (!Array.isArray(items)) return _toggle(list, items as T, toKey, options)

  let result = [...list]
  for (const item of items) {
    result = _toggle(result, item, toKey, options)
  }
  return result
}

/**
 * @category Array
 *
 * @deprecated use xor instead
 *
 * @description
 * If the item matching the condition already exists
 * in the list it will be removed. If it does not it
 * will be added.
 *
 * @remarks
 * Mutates the array
 *
 * @example
 * const gods = ['ra', 'zeus', 'loki']
 * toggleInPlace(gods, 'ra')     // => [zeus, loki]
 *
 * const gods = ['zeus', 'loki']
 * toggleInPlace(gods, 'ra')     // => [zeus, loki, ra]
 */
export function toggleInPlace<T extends {}>(
  list: T[],
  item: T,
  // toKey?: null | ((item: T, idx: number) => number | string | symbol),
  options?: {
    strategy?: 'prepend' | 'append'
  }
): T[] {
  const idx = list.findIndex(x => x === item)
  if (idx === -1) {
    if (options?.strategy === 'prepend') {
      list.unshift(item)
    } else {
      list.push(item)
    }
    return list
  }

  list.splice(idx, 1)

  return list
}

/**
 * @category Array
 *
 * @description
 * Shift array items by n steps
 * If n > 0 items will shift n steps to the right
 * If n < 0 items will shift n steps to the left
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * shift(arr, 3) // => [7, 8, 9, 1, 2, 3, 4, 5, 6]
 */
export function shift<T>(arr: Array<T>, n: number): T[] {
  if (arr.length === 0) return arr

  const shiftNumber = n % arr.length

  if (shiftNumber === 0) return arr

  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)]
}

/**
 * @category Array
 *
 * @description
 * Remove an item from an array.
 *
 * @remarks
 * Mutates the array
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const success = removeInPlace(arr, i => i === 5) // => [1, 2, 3, 4, 6, 7, 8, 9]
 * success // => 5
 */
export function removeInPlace<T>(
  arr: Array<T>,
  predicate: (item: T) => boolean
): false | T[] {
  const index = arr.findIndex(predicate)
  if (index === -1) return false
  return arr.splice(index, 1)
}

/**
 * @category Array
 *
 * @deprecated use castArray instead
 *
 * @description
 * Converts a value or an array of values to an array.
 *
 * @example
 * toArray(1) // => [1]
 * toArray([1, 2]) // => [1, 2]
 */
export function toArray<T>(value: T | T[]): T[] {
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value : [value]
}


/**
 * @category Array
 *
 * @description
 * Unlike es-toolkit version this doesn't force tuples as arguments
 *
 * @example
 * const zipped = zip(['a', 'b'], [1, 2], [true, false]) // [['a', 1, true], ['b', 2, false]]
 */
export function zip<Arrays extends ReadonlyArray<any>[]>(
  ...arrays: Arrays
): ReadonlyArray<Zip<Arrays>> {
  if (!arrays || !arrays.length) return []
  const len = Math.min(...arrays.map(a => a.length))
  const zipped: Zip<Arrays>[] = new Array(len)
  for (let i = 0; i < len; i++) {
    zipped[i] = arrays.map(a => a[i]) as Zip<Arrays>
  }
  return zipped
}

type Zip<A extends ReadonlyArray<any>> = {
  [K in keyof A]: A[K] extends ReadonlyArray<infer T> ? T : never
}