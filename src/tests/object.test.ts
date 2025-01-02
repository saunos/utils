import { describe, expect, test } from 'bun:test'
import * as _ from '../object'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const NULL = null as unknown as {}

describe('object module', () => {
  describe('assign function', () => {
    test('assigns all values from source to target', () => {
      const result: { a: number; b: number } = _.assign({ a: 2 }, { b: 3 })
      expect(result).toEqual({ a: 2, b: 3 })
    })
  })
  describe('shake function', () => {
    test('removes all undefined values', () => {
      const src = {
        x: 2,
        y: null,
        z: undefined,
        o: false,
        r: 'x'
      }
      const result = _.shake(src)
      expect(result).toEqual({
        x: 2,
        y: null,
        o: false,
        r: 'x'
      })
      expect(result).not.toBe(src)
    })
    test('removes values based on filter function input', () => {
      const result = _.shake(
        {
          x: 2,
          y: null,
          z: undefined,
          o: false,
          r: 'x'
        },
        val => val !== 'x'
      )
      expect(result).toEqual({
        r: 'x'
      })
    })
    test('handles undefined input', () => {
      // @ts-ignore
      const result = _.shake(undefined)
      expect(result).toEqual({})
    })
  })

  describe('mapKeys function', () => {
    test('runs all keys against mapper function', () => {
      const prefixWith = (prefix: string) => (_: number, key: string) =>
        `${prefix}${key}`
      const result = _.mapKeys(
        {
          x: 22,
          y: 8
        },
        prefixWith('x')
      )
      expect(result).toEqual({
        xx: 22,
        xy: 8
      })
    })
  })

  describe('mapValues function', () => {
    test('runs all values against mapper function', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
      const result = _.mapValues(
        {
          x: 'hi',
          y: 'bye'
        },
        prefixWith('x')
      )
      expect(result).toEqual({
        x: 'xhi',
        y: 'xbye'
      })
    })
  })

  describe('clone function', () => {
    test('copies the primitives', () => {
      const arr = [
        1.1,
        'How you doin?',
        false,
        Symbol('key'),
        BigInt('1'),
        undefined,
        null
      ]
      for (const elm of arr) {
        const newElm = _.clone(elm)
        expect(elm as any).toBe(newElm as any)
      }
    })
    test('copies arrays', () => {
      const arr = [{ a: 0 }, 1, 2, 3]
      const result = _.clone(arr)

      expect(arr).not.toBe(result)
      for (const i in result) {
        expect(arr[i]).toBe(result[i])
      }
    })
    test('copies objects (class instances) without losing the class type', () => {
      class Data {
        val = 0
      }

      const obj = new Data()
      obj.val = 1
      const result = _.clone(obj)

      expect(obj).not.toBe(result)
      expect(obj.constructor.name).toBe(result.constructor.name)
      expect(obj.val).toBe(result.val)
    })
    test('copies all attributes from object', () => {
      const obj = {
        x: 22,
        add: (a: number, b: number) => a + b,
        child: {
          key: 'yolo'
        }
      }
      const result = _.clone(obj)
      expect(result.x).toBe(obj.x)
      expect(result.add(2, 2)).toBe(obj.add(2, 2))
      expect(result.child.key).toBe(obj.child.key)
    })
    test('copies all attributes from class instance', () => {
      class Data {
        public x = 22
        public add(a: number, b: number) {
          return a + b
        }
        public child: any = {
          key: 'yolo'
        }
      }
      const result = _.clone(new Data())
      expect(result.x).toBe(22)
      // @warning will not copy functions from class instance
      // assert.equal(result.add(2, 2), 4)
      expect(result.child.key).toBe('yolo')
    })
  })

  describe('listify function', () => {
    test('handles empty object', () => {
      const result = _.listify({} as Record<string, string>, () => 1)
      expect(result).toEqual([])
    })
    test('calls toItem to convert to list', () => {
      type Index = 'one' | 'two'
      const obj = {
        one: { name: 'ray' },
        two: { name: 'ash' }
      }
      const result = _.listify(obj, (key, value) => ({
        index: key,
        name: value.name
      }))
      expect(result).toEqual([
        { index: 'one', name: 'ray' },
        { index: 'two', name: 'ash' }
      ])
    })
  })

  describe('pick function', () => {
    test('handles null input', () => {
      const result = _.pick(null as unknown as Record<string, unknown>, [])
      expect(result).toEqual({})
    })
    test('handles empty keys', () => {
      const result = _.pick({ a: 2 }, [])
      expect(result).toEqual({})
    })
    test('handle key not in object', () => {
      const result = _.pick({ a: 2, b: 3 }, ['c'] as any)
      expect(result).toEqual({} as any)
    })
    test('handle one key not in object', () => {
      const result = _.pick({ a: 2, b: 3 }, ['a', 'c'] as any)
      expect(result).toEqual({ a: 2 } as any)
    })
    test('does not ignore undefined values', () => {
      const result = _.pick({ a: 2, b: undefined }, ['b'])
      expect(result).toEqual({ b: undefined })
    })
    test('returns picked properties only', () => {
      const result = _.pick({ a: 2, b: 4 }, ['a'])
      expect(result).toEqual({
        a: 2
      })
    })
    test('type: accepts an interface', () => {
      interface SomeDeclaredType {
        a: string
        b: Error
        c: number[]
      }
      const x: SomeDeclaredType = {
        a: 'alpha',
        b: new Error('beta'),
        c: [3]
      }
      const result = _.pick(x, ['a'])
      expect(result).toEqual({
        a: 'alpha'
      })
    })
    test('works with proxified objects', () => {
      const target = {
        a: 'hello',
        b: 'everyone'
      }
      const handler1 = {
        get() {
          return 'world'
        }
      }
      const proxified = new Proxy(target, handler1)
      const result = _.pick(proxified, ['a'])
      expect(result).toEqual({
        a: 'world'
      })
    })
    test('works with objects created without the prototype chain of Object e.g. by `Object.create(null)`', () => {
      const obj = Object.create(null)
      obj.a = 2
      obj.b = 4
      // @ts-ignore
      const result = _.pick(obj, ['a'])
      expect(result).toEqual({
        a: 2
      })
    })
    test('works with objects that have `hasOwnProperty` overwritten', () => {
      const obj = { a: 2, b: 4 }
      // @ts-ignore
      obj.hasOwnProperty = 'OVERWRITTEN'
      const result = _.pick(obj, ['a'])
      expect(result).toEqual({
        a: 2
      })
    })
  })

  describe('omit function', () => {
    const person = {
      name: 'jay',
      age: 20,
      active: true
    }
    test('handles null input', () => {
      const result = _.omit(null as any, [])
      expect(result).toEqual({})
    })
    test('handles empty keys', () => {
      const result = _.omit(person, [])
      expect(result).toEqual(person)
    })
    test('returns object without omitted properties', () => {
      const result = _.omit(person, ['name'])
      expect(result).toEqual({
        age: 20,
        active: true
      })
    })
  })

  describe('get function', () => {
    type Person = {
      name: string
      age: number
      friends?: Person[]
    }
    const jay: Person = {
      name: 'jay',
      age: 17,
      friends: [
        {
          name: 'carl',
          age: 17,
          friends: [
            {
              name: 'sara',
              age: 17
            }
          ]
        }
      ]
    }
    test('handles null and undefined input', () => {
      expect(_.get(null, 'name')).toBe(undefined)
      expect(_.get(undefined, 'name')).toBe(undefined)
    })
    test('respects undefined as default value', () => {
      expect(_.get({}, 'a.b.c', undefined)).toBe(undefined)
    })
    test('returns specified value or default using path', () => {
      expect(_.get({ age: undefined }, 'age', 22)).toBe(22)
      expect(_.get(jay, 'friends[0].age')).toBe(17)
      expect(_.get(jay, 'friends["0"].age') as unknown as number).toBe(17)
      expect(_.get(jay, 'friends.0.age') as unknown as number).toBe(17)
      expect(_.get(jay, 'friends.1.age')).toBe(undefined)
      expect(_.get(jay, 'friends.0.friends[0].name') as unknown as string).toBe(
        'sara'
      )
      expect(_.get(jay, 'name') as unknown as string).toBe('jay')
      expect(_.get(jay, '[name]') as unknown as string).toBe('jay')
      expect(_.get(jay, '["name"]') as unknown as string).toBe('jay')
      expect(_.get(jay, 'friends[0][name]') as unknown as string).toBe('carl')
      expect(
        _.get(
          jay,
          'friends[0].friends[0].friends[0].age',
          22
        ) as unknown as number
      ).toBe(22)
    })
  })

  describe('mapEntries function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('handles null input', () => {
      const result = _.mapEntries(
        NULL,
        null as unknown as (
          key: never,
          value: never
        ) => [string | number | symbol, unknown]
      )
      expect(result).toEqual({})
    })
    test('correctly maps keys and values', () => {
      const result = _.mapEntries(peopleByRole, (key, value) => [
        value,
        key.toUpperCase()
      ])
      expect(result.jay).toBe('ADMIN')
      expect(result.fey).toBe('USER')
      expect(result.bray).toBe('GUEST')
    })
  })

  describe('invert function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('correctly maps keys and values', () => {
      const result = _.invert(peopleByRole)
      expect(result.jay).toBe('admin')
      expect(result.fey).toBe('user')
      expect(result.bray).toBe('guest')
    })
  })

  describe('assign function', () => {
    const initial = {
      name: 'jay',
      cards: ['ac'],
      location: {
        street: '23 main',
        state: {
          abbrv: 'FL',
          name: 'Florida'
        }
      }
    }
    const override = {
      name: 'charles',
      cards: ['4c'],
      location: {
        street: '8114 capo',
        state: {
          abbrv: 'TX',
          name: 'Texas'
        }
      }
    }
    test('correctly assign a with values from b', () => {
      const result = _.merge(initial, override)
      expect(result).toEqual(override)
    })
    test('handles initial have unique value', () => {
      const result = _.merge({ a: 'x' }, {})
      expect(result).toEqual({ a: 'x' })
    })
    test('handles override have unique value', () => {
      const result = _.merge({}, { b: 'y' })
      expect(result).toEqual({ b: 'y' })
    })
  })

  describe('flattenKeys function', () => {
    test('handles bad input', () => {
      expect(_.flattenKeys({})).toEqual([])
    })
    test('returns correct list of keys', () => {
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hathor',
            power: 12
          }
        ]
      }
      expect(_.flattenKeys(ra)).toEqual([
        'name',
        'power',
        'friend.name',
        'friend.power',
        'enemies.0.name',
        'enemies.0.power'
      ])
    })
  })

  describe('set function', () => {
    test('sets deep values correctly', () => {
      // @ts-ignore
      expect(_.set({}, 'cards.value', 2)).toEqual({
        cards: { value: 2 }
      })
      // @ts-ignore
      expect(_.set({}, 'cards.0.value', 2)).toEqual({
        cards: [{ value: 2 }]
      })
      // @ts-ignore
      expect(_.set({}, 'cards.0.0.value', 2)).toEqual({
        cards: [[{ value: 2 }]]
      })
      // @ts-ignore
      expect(_.set({}, 'cards[0][0].value', 2)).toEqual({
        cards: [[{ value: 2 }]]
      })
      // @ts-ignore
      expect(_.set({}, 'cards.[1].[1].value', 2)).toEqual({
        cards: [undefined, [undefined, { value: 2 }]]
      })
    })
  })

  describe('flattenObject function', () => {
    test('handles bad input', () => {
      expect(_.flattenObject({})).toEqual({})
    })
    test('returns correctly flattened object', () => {
      const now = new Date()
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hathor',
            power: 12
          }
        ],
        timestamp: now
      }
      expect(_.flattenObject(ra)).toEqual({
        name: 'ra',
        power: 100,
        'friend.name': 'loki',
        'friend.power': 80,
        'enemies.0.name': 'hathor',
        'enemies.0.power': 12,
        timestamp: now
      })
    })
  })

  describe('construct function', () => {
    test('handles bad input', () => {
      expect(_.construct({})).toEqual({})
      expect(_.construct(null as any)).toEqual({})
      expect(_.construct(undefined as any)).toEqual({})
    })
    test('returns correctly constructed object', () => {
      const now = new Date()
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hathor',
            power: 12
          },
          {
            name: 'vishnu',
            power: 58
          }
        ],
        timestamp: now
      }
      expect(
        _.construct({
          name: 'ra',
          power: 100,
          'friend.name': 'loki',
          'friend.power': 80,
          'enemies.0.name': 'hathor',
          'enemies.0.power': 12,
          'enemies.1.name': 'vishnu',
          'enemies.1.power': 58,
          timestamp: now
        })
      ).toEqual(ra)
    })
  })
})
