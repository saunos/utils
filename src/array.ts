import { isArray, isFunction } from './typed'

/**
 * @category Array
 *
 * @description
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 *
 * @example
 * const fish = [
 *   {
 *     name: 'Marlin',
 *     source: 'ocean'
 *   },
 *   {
 *     name: 'Bass',
 *     source: 'lake'
 *   },
 *   {
 *     name: 'Trout',
 *     source: 'lake'
 *   }
 * ]
 * const fishBySource = group(fish, f => f.source) // => { ocean: [marlin], lake: [bass, trout] }
 */
export const group = <T, Key extends string | number | symbol>(
  array: ReadonlyArray<T>,
  getGroupId: (item: T) => Key
): Partial<Record<Key, T[]>> => {
  return array.reduce(
    (acc, item) => {
      const groupId = getGroupId(item)
      if (!acc[groupId]) acc[groupId] = []
      acc[groupId].push(item)
      return acc
    },
    {} as Record<Key, T[]>
  )
}

/**
 * @category Array
 *
 * @description
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 * credit:
 *  https://gist.github.com/briancavalier/62f784e20e4fffc4d671126b7f91bad0
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

/**
 * @category Array
 *
 * @description
 * Creates an object mapping the specified keys to their corresponding values
 *
 * @example
 * const zipped = zipToObject(['a', 'b'], [1, 2]) // { a: 1, b: 2 }
 * const zipped = zipToObject(['a', 'b'], (k, i) => k + i) // { a: 'a0', b: 'b1' }
 * const zipped = zipToObject(['a', 'b'], 1) // { a: 1, b: 1 }
 */
export function zipToObject<K extends string | number | symbol, V>(
  keys: readonly K[],
  values: V | ((key: K, idx: number) => V) | V[]
): Record<K, V> {
  if (!keys || !keys.length) {
    return {} as Record<K, V>
  }

  const getValue = isFunction(values)
    ? values
    : isArray(values)
      ? (_k: K, i: number) => values[i]
      : (_k: K, _i: number) => values

  return keys.reduce(
    (acc, key, idx) => {
      acc[key] = getValue(key, idx)
      return acc
    },
    {} as Record<K, V>
  )
}

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
export const boil = <T>(
  array: readonly T[],
  compareFunc: (a: T, b: T) => T
) => {
  if (!array || (array.length ?? 0) === 0) return null
  return array.reduce(compareFunc)
}

/**
 * @category Array
 *
 * @description
 * Sum all numbers in an array. Optionally provide a function
 * to convert objects in the array to number values.
 *
 * @example
 * sum([1, 2, 3]) // => 6
 */
export function sum<T extends number>(array: readonly T[]): number
export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number
): number
export function sum<T extends object | number>(
  array: readonly any[],
  fn?: (item: T) => number
): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}

/**
 * @category Array
 *
 * @description
 * Get the first item in an array or a default value
 */
export const first = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array?.length > 0 ? array[0] : defaultValue
}

/**
 * @category Array
 *
 * @description
 */
export const last = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}

/**
 * @category Array
 *
 * @description
 * Sort an array without modifying it and return
 * the newly sorted value
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
 * sort(fish, f => f.weight) // => [bass, trout, marlin]
 * sort(fish, f => f.weight, true) // => [marlin, trout, bass]
 */
export const sort = <T>(
  array: readonly T[],
  getter: (item: T) => number,
  desc = false
) => {
  if (!array) return []
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc)
}

/**
 * @category Array
 *
 * @description
 * Sort an array without modifying it and return
 * the newly sorted value. Allows for a string
 * sorting value.
 *
 * @example
 * const gods = [
 *   {
 *     name: 'Ra',
 *     power: 100
 *   },
 *   {
 *     name: 'Zeus',
 *     power: 98
 *   },
 *   {
 *     name: 'Loki',
 *     power: 72
 *   },
 *   {
 *     name: 'Vishnu',
 *     power: 100
 *   }
 * ]
 * alphabetical(gods, g => g.name) // => [Loki, Ra, Vishnu, Zeus]
 * alphabetical(gods, g => g.name, 'desc') // => [Zeus, Vishnu, Ra, Loki]
 */
export const alphabetical = <T>(
  array: readonly T[],
  getter: (item: T) => string,
  dir: 'asc' | 'desc' = 'asc'
) => {
  if (!array) return []
  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b))
  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a))
  return array.slice().sort(dir === 'desc' ? dsc : asc)
}

/**
 * @category Array
 *
 * @description
 * Given an array of objects and an identity callback function to determine how each object should
 * be identified. Returns an object where the keys are the id values the callback returned and each value
 * is an integer telling how many times that id occurred.
 *
 * @example
 *  const gods = [
 *   {
 *     name: 'Ra',
 *     culture: 'egypt'
 *   },
 *   {
 *     name: 'Zeus',
 *     culture: 'greek'
 *   },
 *   {
 *     name: 'Loki',
 *     culture: 'greek'
 *   }
 * ]
 * counting(gods, g => g.culture) // => { egypt: 1, greek: 2 }
 */
export const counting = <T, TId extends string | number | symbol>(
  list: readonly T[],
  identity: (item: T) => TId
): Record<TId, number> => {
  if (!list) return {} as Record<TId, number>
  return list.reduce(
    (acc, item) => {
      const id = identity(item)
      acc[id] = (acc[id] ?? 0) + 1
      return acc
    },
    {} as Record<TId, number>
  )
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
 * max([{ num: 1 }, { num: 2 }], x => x.num) == { num: 2 }
 */
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function max<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}

/**
 * @category Array
 *
 * @description
 * Min gets the smallest value from a list
 *
 * @example
 * min([1, 2, 3, 4]) == 1
 * min([{ num: 1 }, { num: 2 }], x => x.num) == { num: 1 }
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function min<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) < get(b) ? a : b))
}

/**
 * @category Array
 *
 * @description
 * Splits a single list into many lists of the desired size. If
 * given a list of 10 items and a size of 2, it will return 5
 * lists with 2 items each
 *
 * @example
 * const gods = ['Ra', 'Zeus', 'Loki', 'Vishnu', 'Icarus', 'Osiris', 'Thor', 'Apollo', 'Artemis', 'Athena']
 *
 * cluster(gods, 3)
 * // => [
 * //   [ 'Ra', 'Zeus', 'Loki' ],
 * //   [ 'Vishnu', 'Icarus', 'Osiris' ],
 * //   [ 'Thor', 'Apollo', 'Artemis' ],
 * //   [ 'Athena' ]
 * // ]
 */
export const cluster = <T>(list: readonly T[], size = 2): T[][] => {
  const clusterCount = Math.ceil(list.length / size)
  return new Array(clusterCount).fill(null).map((_c: null, i: number) => {
    return list.slice(i * size, i * size + size)
  })
}

/**
 * @category Array
 *
 * @description
 * Given a list of items returns a new list with only
 * unique items. Accepts an optional identity function
 * to convert each item in the list to a comparable identity
 * value
 *
 * @example
 * const fish = [
 *   {
 *     name: 'Marlin',
 *     weight: 105,
 *     source: 'ocean'
 *   },
 *   {
 *     name: 'Salmon',
 *     weight: 22,
 *     source: 'river'
 *   },
 *   {
 *     name: 'Salmon',
 *     weight: 22,
 *     source: 'river'
 *   }
 * ]
 *
 * unique( fish, f => f.name )
 * // [
 * //     { name: 'Marlin', weight: 105, source: 'ocean' },
 * //     { name: 'Salmon', weight: 22, source: 'river' }
 * // ]
 */
export const unique = <T, K>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] => {
  const valueMap = array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : item
    if (acc.get(key)) return acc
    acc.set(key, item)
    return acc
  }, new Map())
  return Array.from(valueMap.values())
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
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
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
 * Given an array of arrays, returns a single
 * dimentional array with all items in it.
 *
 * @deprecated
 * Use Array.prototype.flat instead
 *
 * @example
 * const gods = [['ra', 'loki'], ['zeus']]
 *
 * flat(gods) // => [ra, loki, zeus]
 */
export const flat = <T>(lists: readonly T[][]): T[] => {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
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
 * Split an array into two array based on
 * a true/false condition function
 *
 * @example
 *
 * const gods = [
 *   {
 *     name: 'Ra',
 *     power: 100
 *   },
 *   {
 *     name: 'Zeus',
 *     power: 98
 *   },
 *   {
 *     name: 'Loki',
 *     power: 72
 *   },
 *   {
 *     name: 'Vishnu',
 *     power: 100
 *   }
 * ]
 *
 * const [finalGods, lesserGods] = fork(gods, f => f.power > 90) // [[ra, vishnu, zues], [loki]]
 */
export const fork = <T>(
  list: readonly T[],
  condition: (item: T) => boolean
): [T[], T[]] => {
  if (!list) return [[], []]
  return list.reduce(
    (acc, item) => {
      const [a, b] = acc
      if (condition(item)) {
        return [[...a, item], b]
      }
      return [a, [...b, item]]
    },
    [[], []] as [T[], T[]]
  )
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
 * merge(gods, newGods, f => f.name) // => [{name: "Zeus" power: 100}, {name: "Ra", power: 97}]
 */
export const merge = <T>(
  root: readonly T[],
  others: readonly T[],
  matcher: (item: T) => any
) => {
  if (!others && !root) return []
  if (!others) return root
  if (!root) return []
  if (!matcher) return root
  return root.reduce(
    (acc, r) => {
      const matched = others.find(o => matcher(r) === matcher(o))
      if (matched) acc.push(matched)
      else acc.push(r)
      return acc
    },
    [] as T[]
  )
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
) => {
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
) => {
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
) {
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

type Falsy = null | undefined | false | '' | 0 | 0n

/**
 * @category Array
 *
 * @description
 * Given a list returns a new list with
 * only truthy values
 *
 * @example
 * const fish = ['salmon', null, false, NaN, 'sockeye', 'bass']
 *
 * compact(fish) // => ['salmon', 'sockeye', 'bass']
 */
export const compact = <T>(list: readonly (T | Falsy)[]): T[] => {
  return (list?.filter(x => !!x) as T[]) ?? []
}

/**
 * @category Array
 *
 * @description
 * Returns all items from the first list that
 * do not exist in the second list.
 *
 * @example
 * const oldWorldGods = ['ra', 'zeus']
 * const newWorldGods = ['vishnu', 'zeus']
 *
 * diff(oldWorldGods, newWorldGods) // => ['ra']
 */
export const diff = <T>(
  root: readonly T[],
  other: readonly T[],
  identity: (item: T) => string | number | symbol = (t: T) =>
    t as unknown as string | number | symbol
): T[] => {
  if (!root?.length && !other?.length) return []
  if (root?.length === undefined) return [...other]
  if (!other?.length) return [...root]
  const bKeys = other.reduce(
    (acc, item) => {
      acc[identity(item)] = true
      return acc
    },
    {} as Record<string | number | symbol, boolean>
  )
  return root.filter(a => !bKeys[identity(a)])
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
export function shift<T>(arr: Array<T>, n: number) {
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
