import { describe, expect, test } from 'bun:test'
import * as _ from '../array'

const NULL = null as unknown as unknown[]

describe('array module', () => {
  describe('groupBy function', () => {
    test('groups by provided attribute', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' }
      ]
      const groups = _.groupBy(list, x => x.group)
      expect(groups.a?.length).toBe(2)
      expect(groups.b?.length).toBe(2)
      expect(groups.c?.length).toBe(1)
      expect(groups.c?.[0].word).toBe('ok')
    })
  })

  describe('boil function', () => {
    test('compares and keeps item based on condition', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.boilDownTo(list, (a, b) => (a.score > b.score ? a : b))
      expect(result!.game).toBe('e')
      expect(result!.score).toBe(500)
    })
    test('does not fail when provided array is empty', () => {
      const result = _.boilDownTo([], () => true)
      expect(result).toBeNull()
    })
    test('does not fail when provided array is null', () => {
      const result = _.boilDownTo(
        null as unknown as readonly boolean[],
        () => true
      )
      expect(result).toBeNull()
    })
    test('does not fail when provided array is funky shaped', () => {
      const result = _.boilDownTo({} as any, () => true)
      expect(result).toBeNull()
    })
  })

  describe('zip function', () => {
    test('zips an array correctly', () => {
      const result = _.zip(['a', 'b'], [1, 2], [true, false])
      expect(result).toEqual([
        ['a', 1, true],
        ['b', 2, false]
      ])
    })
  })

  describe('zipObject function', () => {
    test('zips to an object correctly', () => {
      const result = _.zipObject(['a', 'b'], [1, 2])
      expect(result).toEqual({ a: 1, b: 2 })
    })
  })

  describe('sortBy function', () => {
    test('uses getter', () => {
      const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
      const result = _.sortBy(list, ['index'])
      expect(result[0].index).toBe(0)
      expect(result[1].index).toBe(1)
      expect(result[2].index).toBe(2)
    })
  })

  describe('orderBy function', () => {
    test('uses getter', () => {
      const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
      const result = _.orderBy(list, ['index'], ['asc'])
      expect(result[0].index).toBe(0)
    })
  })

  describe('replace function', () => {
    test('returns empty list for null input list', () => {
      const result = _.replace(
        null as unknown as readonly string[],
        'x',
        () => false
      )
      expect(result).toEqual([])
    })
    test('returns the list for an undefined new item', () => {
      const result = _.replace(['a'], undefined, () => true)
      expect(result).toEqual(['a'])
    })
    test('returns replaced item when value is null', () => {
      const result = _.replace(['a'], null, i => i === 'a')
      expect(result).toEqual([null])
    })
    test('returns replaced item by index', () => {
      const result = _.replace(
        ['a', 'b', 'c', 'd'],
        'BB',
        (letter, idx) => idx === 1
      )
      expect(result[1]).toBe('BB')
    })
    test('returns copy of list with replaced item', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(
        list,
        { game: 'x', score: 800 },
        item => item.game === 'a'
      )
      expect(result[0].game).toBe('x')
      expect(list[1].game).toBe('b')
    })
    test('returns copy of list without changing', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(
        list,
        { game: 'x', score: 800 },
        item => item.game === 'XX'
      )
      expect(result[0].game).toBe('a')
      expect(list[1].game).toBe('b')
    })
  })

  describe('objectify function', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'bye' },
      { id: 'c', word: 'oh' },
      { id: 'd', word: 'hey' },
      { id: 'e', word: 'ok' }
    ]
    test('returns correct map of values', () => {
      const result = _.objectify(
        list,
        x => x.id,
        x => x
      )
      expect(result.a.word).toBe('hello')
      expect(result.b.word).toBe('bye')
    })
    test('does not fail on empty input list', () => {
      const result = _.objectify(
        [],
        (x: any) => x.id,
        x => x
      )
      expect(result).toEqual({})
    })
    test('defaults value to array item', () => {
      const result = _.objectify(list.slice(0, 1), x => x.id)
      expect(result).toEqual({
        a: { id: 'a', word: 'hello' }
      })
    })
  })

  describe('max function', () => {
    test('returns the max value from list of number', () => {
      const list = [5, 5, 10, 2]
      const result = _.max(list)
      expect(result).toBe(10)
    })
  })
  describe('maxBy function', () => {
    test('returns the max value from list of objects', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.maxBy(list, x => x.score)
      expect(result!.game).toBe('e')
      expect(result!.score).toBe(500)
    })
  })

  describe('min function', () => {
    test('returns the min value from list of number', () => {
      const list = [5, 5, 10, 2]
      const result = _.min(list)
      expect(result).toBe(2)
    })
  })

  describe('minBy function', () => {
    test('returns the min value from list of objects', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.minBy(list, x => x.score)
      expect(result!.game).toBe('a')
      expect(result!.score).toBe(100)
    })
  })

  describe('chunk function', () => {
    test('returns an array of arrays', () => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1]
      const result = _.chunk(list, 2)
      const [a, b, c] = result
      expect(a).toEqual([1, 1])
      expect(b).toEqual([1, 1])
      expect(c).toEqual([1, 1])
    })
    test('returns remainder in final cluster', () => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
      const result = _.chunk(list, 3)
      const [a, b, c, d] = result
      expect(a).toEqual([1, 1, 1])
      expect(b).toEqual([1, 1, 1])
      expect(c).toEqual([1, 1, 1])
      expect(d).toEqual([2, 2])
    })
  })

  describe('unique function', () => {
    test('correctly removed duplicate items', () => {
      const list = [1, 1, 2]
      const result = _.uniq(list)
      expect(result).toEqual([1, 2])
    })

    test('correctly handles non string, number or symbol values', () => {
      const list = [
        null,
        null,
        true,
        true,
        'true',
        false,
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' }
      ]
      const result = _.uniq(list)
      expect(result).toEqual([
        null,
        true,
        'true',
        false,
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' }
      ])
    })
  })

  describe('uniqBy function', () => {
    test('uses key fn to correctly remove duplicate items', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.uniqBy(list, x => x.id)
      const [a, b, c] = result
      expect(a.id).toBe('a')
      expect(a.word).toBe('hello')
      expect(b.id).toBe('b')
      expect(b.word).toBe('oh')
      expect(c.id).toBe('c')
      expect(c.word).toBe('yolo')
    })
  })

  describe('range function', () => {
    const obj = { name: 'radash' }
    const toList = <T>(gen: Generator<T>): T[] => {
      const items: T[] = []
      for (const item of gen) items.push(item)
      return items
    }

    test('yields expected values', () => {
      expect(toList(_.range(0, 4))).toEqual([0, 1, 2, 3, 4])
      expect(toList(_.range(3))).toEqual([0, 1, 2, 3])
      expect(toList(_.range(0, 3))).toEqual([0, 1, 2, 3])
      expect(toList(_.range(0, 3, 'y'))).toEqual(['y', 'y', 'y', 'y'])
      expect(toList(_.range(0, 3, () => 'y'))).toEqual(['y', 'y', 'y', 'y'])
      expect(toList(_.range(0, 3, i => i))).toEqual([0, 1, 2, 3])
      expect(toList(_.range(0, 3, i => `y${i}`))).toEqual([
        'y0',
        'y1',
        'y2',
        'y3'
      ])
      expect(toList(_.range(0, 3, obj))).toEqual([obj, obj, obj, obj])
      expect(toList(_.range(0, 6, i => i, 2))).toEqual([0, 2, 4, 6])
    })
  })

  describe('list function', () => {
    const obj = { name: 'radash' }
    test('creates correct list', () => {
      expect(_.list(0, 4)).toEqual([0, 1, 2, 3, 4])
      expect(_.list(3)).toEqual([0, 1, 2, 3])
      expect(_.list(0, 3)).toEqual([0, 1, 2, 3])
      expect(_.list(0, 3, 'y')).toEqual(['y', 'y', 'y', 'y'])
      expect(_.list(0, 3, () => 'y')).toEqual(['y', 'y', 'y', 'y'])
      expect(_.list(0, 3, i => i)).toEqual([0, 1, 2, 3])
      expect(_.list(0, 3, i => `y${i}`)).toEqual(['y0', 'y1', 'y2', 'y3'])
      expect(_.list(0, 3, obj)).toEqual([obj, obj, obj, obj])
      expect(_.list(0, 6, i => i, 2)).toEqual([0, 2, 4, 6])
    })
    test('omits end if step does not land on it', () => {
      const result = _.list(0, 5, i => i, 2)
      expect(result).toEqual([0, 2, 4])
    })
    test('returns start only if step larger than end', () => {
      const result = _.list(0, 5, i => i, 20)
      expect(result).toEqual([0])
    })
  })

  describe('intersects function', () => {
    test('returns true if list a & b have items in common', () => {
      const listA = ['a', 'b']
      const listB = [1, 2, 'b', 'x']
      const result = _.intersects(listA, listB)
      expect(result).toBe(true)
    })
    test('returns false if list a & b have no items in common', () => {
      const listA = ['a', 'b', 'c']
      const listB = ['x', 'y']
      const result = _.intersects(listA, listB)
      expect(result).toBe(false)
    })
    test('returns true using custom identity', () => {
      const listA = [{ value: 23 }, { value: 12 }]
      const listB = [{ value: 12 }]
      const result = _.intersects(listA, listB, x => x.value)
      expect(result).toBe(true)
    })
    test('returns false without failing if either list is null', () => {
      expect(_.intersects(null as unknown as never, [])).toBe(false)
      expect(_.intersects([], null as unknown as never)).toBe(false)
    })
  })

  describe('fork function', () => {
    test('returns two empty arrays for one empty array input', () => {
      const [a, b] = _.partition([], x => !!x)
      expect(a).toEqual([])
      expect(b).toEqual([])
    })
    test('returns correctly forked list', () => {
      const input = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' }
      ]
      const [xs, ys] = _.partition(input, x => x.group === 'X')
      expect(xs).toHaveLength(2)
      expect(ys).toHaveLength(2)
      const [r, s] = xs
      expect(r.name).toBe('ray')
      expect(s.name).toBe('sara')
      const [b, m] = ys
      expect(b.name).toBe('bo')
      expect(m.name).toBe('mary')
    })
  })

  describe('mergeBy function', () => {
    test('returns empty array for two null inputs', () => {
      const result = _.mergeBy(NULL, NULL, x => '')
      expect(result).toEqual([])
    })
    test('returns an empty array for two empty array inputs', () => {
      const result = _.mergeBy([], [], x => '')
      expect(result).toEqual([])
    })
    test('returns root for a null other input', () => {
      const result = _.mergeBy([], NULL, x => '')
      expect(result).toEqual([])
    })
    test('returns empty array for a null root input', () => {
      const result = _.mergeBy(NULL, [], x => '')
      expect(result).toEqual([])
    })
    test('returns root for a null matcher input', () => {
      const result = _.mergeBy(
        ['a'],
        [],
        null as unknown as (x: string) => string
      )
      expect(result).toEqual(['a'])
    })
    test('returns correctly mergeped lists', () => {
      const inputA = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' }
      ]
      const inputB = [
        { name: 'ray', group: 'XXX' },
        { name: 'mary', group: 'YYY' }
      ]
      const result = _.mergeBy(inputA, inputB, x => x.name)
      expect(result[0].group).toBe('XXX')
      expect(result[1].group).toBe('X')
      expect(result[2].group).toBe('Y')
      expect(result[3].group).toBe('YYY')
    })
  })

  describe('replaceOrAppend', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    const lettersXA = ['XA', 'b', 'c', 'd', 'e']
    const lettersXC = ['a', 'b', 'XC', 'd', 'e']
    const lettersXE = ['a', 'b', 'c', 'd', 'XE']
    const lettersXX = ['a', 'b', 'c', 'd', 'e', 'XX']
    test('returns empty array for two null inputs', () => {
      const result = _.replaceOrAppend(NULL, null, x => false)
      expect(result).toEqual([])
    })
    test('returns array with new item for null list input', () => {
      const result = _.replaceOrAppend(NULL, 'a', x => false)
      expect(result).toEqual(['a'])
    })
    test('returns list for null new item input', () => {
      const result = _.replaceOrAppend(['a'], null, x => false)
      expect(result).toEqual(['a'])
    })
    test('returns list with item replacing match by index', () => {
      const result = _.replaceOrAppend(
        ['a', 'b', 'c', 'd'],
        'BB',
        (letter, idx) => idx === 1
      )
      expect(result[1]).toBe('BB')
    })
    test('returns list with item replacing match', () => {
      const result = _.replaceOrAppend(letters, 'XA', x => x === 'a')
      expect(result).toEqual(lettersXA)
    })
    test('returns list with item replacing match in middle', () => {
      const result = _.replaceOrAppend(letters, 'XC', x => x === 'c')
      expect(result).toEqual(lettersXC)
    })
    test('returns list with item replacing match at end', () => {
      const result = _.replaceOrAppend(letters, 'XE', x => x === 'e')
      expect(result).toEqual(lettersXE)
    })
    test('returns list with item appended', () => {
      const result = _.replaceOrAppend(letters, 'XX', x => x === 'x')
      expect(result).toEqual(lettersXX)
    })
  })

  describe('compact', () => {
    const people = [null, 'hello', undefined, false, 23]
    test('returns array with falsy values filtered out', () => {
      const result = _.compact(people)
      expect(result).toEqual(['hello', 23])
    })
  })

  describe('difference function', () => {
    test('handles null other', () => {
      const result = _.difference(['a'], NULL)
      expect(result).toEqual(['a'])
    })
    test('handles empty array root', () => {
      const result = _.difference([], ['a'])
      expect(result).toEqual([])
    })
    test('handles empty array other', () => {
      const result = _.difference(['a'], [])
      expect(result).toEqual(['a'])
    })
    test('returns all items from root that dont exist in other', () => {
      const result = _.difference(['a', 'b', 'c'], ['c', 'd', 'e'])
      expect(result).toEqual(['a', 'b'])
    })
    test('uses identity function', () => {
      const identity = ({ letter }: { letter: string }) => letter
      const letter = (l: string) => ({ letter: l })
      const result = _.differenceBy(
        [letter('a'), letter('b'), letter('c')],
        [letter('c'), letter('d'), letter('e')],
        identity
      )
      expect(result).toEqual([letter('a'), letter('b')])
    })
  })

  describe('countBy function', () => {
    const people = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' }
    ]
    test('returns correctly counted items object', () => {
      const result = _.countBy(people, p => p.group)
      expect(result).toEqual({
        X: 2,
        Y: 2
      })
    })
  })

  describe('shift function', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    test('should shift array right 3 positions', () => {
      const result = _.shift(arr, 3)
      expect(result).toEqual([7, 8, 9, 1, 2, 3, 4, 5, 6])
    })
    test('should shift array left 3 positions', () => {
      const result = _.shift(arr, -3)
      expect(result).toEqual([4, 5, 6, 7, 8, 9, 1, 2, 3])
    })
    test('should shift array right 6 positions', () => {
      const result = _.shift(arr, 15)
      expect(result).toEqual([4, 5, 6, 7, 8, 9, 1, 2, 3])
    })
    test('should shift array left 6 positions', () => {
      const result = _.shift(arr, -15)
      expect(result).toEqual([7, 8, 9, 1, 2, 3, 4, 5, 6])
    })
    test('should keep array as is', () => {
      const result = _.shift(arr, 0)
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    test('should keep array as is', () => {
      const result = _.shift(arr, 9)
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    test('should return empty array', () => {
      const results = _.shift([], 0)
      expect(results).toEqual([])
    })
    test('should return empty array', () => {
      const results = _.shift([], 10)
      expect(results).toEqual([])
    })
  })

  describe('toggle function', () => {
    test('should handle null input list', () => {
      const result = _.toggle(null as unknown as any[], 'a')
      expect(result).toEqual(['a'])
    })
    test('should handle null input list and null item', () => {
      const result = _.toggle(null as unknown as any[], null)
      expect(result).toEqual([])
    })
    test('should handle null item', () => {
      const result = _.toggle(['a'], null)
      expect(result).toEqual(['a'])
    })
    test('should add item when it does not exist using default matcher', () => {
      const result = _.toggle(['a'], 'b')
      expect(result).toEqual(['a', 'b'])
    })
    test('should remove item when it does exist using default matcher', () => {
      const result = _.toggle(['a', 'b'], 'b')
      expect(result).toEqual(['a'])
    })
    test('should remove item when it does exist using custom matcher', () => {
      const result = _.toggle(
        [{ value: 'a' }, { value: 'b' }],
        { value: 'b' },
        v => v.value
      )
      expect(result).toEqual([{ value: 'a' }])
    })
    test('should add item when it does not exist using custom matcher', () => {
      const result = _.toggle([{ value: 'a' }], { value: 'b' }, v => v.value)
      expect(result).toEqual([{ value: 'a' }, { value: 'b' }])
    })
    test('should prepend item when strategy is set', () => {
      const result = _.toggle(['a'], 'b', null, { strategy: 'prepend' })
      expect(result).toEqual(['b', 'a'])
    })
    test('should add item when it does not exist using default matcher', () => {
      const result = _.toggle(['a'], ['b'])
      expect(result).toEqual(['a', 'b'])
    })
    test('should remove item when it does exist using default matcher', () => {
      const result = _.toggle(['a', 'b'], ['b'])
      expect(result).toEqual(['a'])
    })
    test('should remove item when it does exist using custom matcher', () => {
      const result = _.toggle(
        [{ value: 'a' }, { value: 'b' }],
        [{ value: 'b' }],
        v => v.value
      )
      expect(result).toEqual([{ value: 'a' }])
    })
    test('should add item when it does not exist using custom matcher', () => {
      const result = _.toggle([{ value: 'a' }], [{ value: 'b' }], v => v.value)
      expect(result).toEqual([{ value: 'a' }, { value: 'b' }])
    })
    test('should prepend item when strategy is set', () => {
      const result = _.toggle(['a'], ['b'], null, { strategy: 'prepend' })
      expect(result).toEqual(['b', 'a'])
    })
  })

  describe('toggleInPlace function', () => {
    test('should return same reference', () => {
      const arr = ['a']
      const result = _.toggleInPlace(arr, 'a')
      expect(arr === result).toBe(true)
    })

    test('should add item to the end of list', () => {
      const arr = ['a']
      const result = _.toggleInPlace(arr, 'b')
      expect(arr).toEqual(['a', 'b'])
    })

    test('should remove item from list', () => {
      const arr = ['a', 'b']
      const result = _.toggleInPlace(arr, 'b')
      expect(arr).toEqual(['a'])
    })

    test('should add item to the beginning of list', () => {
      const arr = ['a']
      const result = _.toggleInPlace(arr, 'b', { strategy: 'prepend' })
      expect(arr).toEqual(['b', 'a'])
    })
  })

  describe('removeInPlace function', () => {
    test('should remove item from list', () => {
      const list = ['a', 'b', 'c']
      const res = _.removeInPlace(list, it => it === 'b')
      expect(list).toEqual(['a', 'c'])
      expect(res).not.toEqual(false)
    })
    test('should not remove item from list when it does not exist', () => {
      const list = ['a', 'b', 'c']
      const res = _.removeInPlace(list, it => it === 'x')
      expect(list).toEqual(['a', 'b', 'c'])
      expect(res).toEqual(false)
    })
  })

  describe('toArray function', () => {
    test('should return empty array for null input', () => {
      const result = _.toArray(null)
      expect(result).toEqual([])
    })
    test('should return array for input', () => {
      const result = _.toArray('hello')
      expect(result).toEqual(['hello'])
    })
    test('should return array for array input', () => {
      const result = _.toArray([1, 2, 3])
      expect(result).toEqual([1, 2, 3])
    })
  })
})
