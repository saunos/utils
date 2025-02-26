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
