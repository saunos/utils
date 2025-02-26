import { describe, expect, test } from 'bun:test'
import * as _ from '../predicates'

describe('predicates module', () => {
  describe('isInt function', () => {
    class Data {}
    test('returns false for non-number values', () => {
      expect(_.isInt(undefined)).toBe(false)
      expect(_.isInt(null)).toBe(false)
      expect(_.isInt(false)).toBe(false)
      expect(_.isInt(new Data())).toBe(false)
      expect(_.isInt(Number.NaN)).toBe(false)
      expect(_.isInt([1, 2, 3])).toBe(false)
      expect(_.isInt({})).toBe(false)
      expect(_.isInt('abc')).toBe(false)
      expect(_.isInt(String('abc'))).toBe(false)
    })
    test('returns true for int', () => {
      const result = _.isInt(22)
      expect(result).toBe(true)
    })
    test('returns false for float', () => {
      const result = _.isInt(22.0567)
      expect(result).toBe(false)
    })
  })

  describe('isEmpty function', () => {
    class Data {}
    class Person {
      name = 'ray'
    }
    test('returns true for empty values', () => {
      expect(_.isEmpty(null)).toBe(true)
      expect(_.isEmpty(undefined)).toBe(true)
      expect(_.isEmpty(new Data())).toBe(true)
      expect(_.isEmpty(0)).toBe(true)
      expect(_.isEmpty(true)).toBe(true)
      expect(_.isEmpty([])).toBe(true)
      expect(_.isEmpty(false)).toBe(true)
      expect(_.isEmpty({})).toBe(true)
      expect(_.isEmpty('')).toBe(true)
      expect(_.isEmpty(String())).toBe(true)
      expect(_.isEmpty(new Map())).toBe(true)
      expect(_.isEmpty(new Date('invalid value'))).toBe(true)
    })
    test('returns false for non-empty values', () => {
      expect(_.isEmpty(new Date())).toBe(false)
      expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBe(false)
      expect(_.isEmpty(22)).toBe(false)
      expect(_.isEmpty(new Person())).toBe(false)
      expect(_.isEmpty({ name: 'x' })).toBe(false)
      expect(_.isEmpty('abc')).toBe(false)
      expect(_.isEmpty(String('abc'))).toBe(false)
      expect(_.isEmpty([1, 2, 3])).toBe(false)
      expect(_.isEmpty(function work() {})).toBe(false)
      expect(_.isEmpty(() => {})).toBe(false)
      expect(_.isEmpty(Symbol(''))).toBe(false)
      expect(_.isEmpty(Symbol('hello'))).toBe(false)
      const map = new Map()
      map.set('a', 1)
      expect(_.isEmpty(map)).toBe(false)
    })
  })

  describe('isPromise function', () => {
    test('return true for Promise values', () => {
      expect(_.isPromise(new Promise(res => res(0)))).toBe(true)
      expect(_.isPromise(new Promise(res => res('')))).toBe(true)
      expect(_.isPromise((async () => {})())).toBe(true)
    })
    test('return false for non-Date values', () => {
      expect(_.isPromise(22)).toBe(false)
      expect(_.isPromise({ name: 'x' })).toBe(false)
      expect(_.isPromise('abc')).toBe(false)
      expect(_.isPromise(String('abc'))).toBe(false)
      expect(_.isPromise([1, 2, 3])).toBe(false)
      expect(_.isPromise(function work() {})).toBe(false)
      expect(_.isPromise(() => {})).toBe(false)
      expect(_.isPromise(Symbol(''))).toBe(false)
      expect(_.isPromise(Symbol('hello'))).toBe(false)
      // biome-ignore lint/suspicious/noThenProperty: <explanation>
      expect(_.isPromise({ then: 2 })).toBe(false)
    })
  })

  describe('assert function', () => {
    test('throws error for false condition', () => {
      expect(() => _.assert(false, 'error message')).toThrow('error message')
    })
    test('does not throw error for true condition', () => {
      expect(() => _.assert(true, 'error message')).not.toThrow()
    })
  })

  describe('assertNotNull function', () => {
    test('throws error for null value', () => {
      expect(() => _.assertNotNull(null, 'error message')).toThrow(
        'error message'
      )
    })
    test('throws error for undefined value', () => {
      expect(() => _.assertNotNull(undefined, 'error message')).toThrow(
        'error message'
      )
    })
    test('does not throw error for non-null value', () => {
      expect(() => _.assertNotNull(0, 'error message')).not.toThrow()
    })
  })

  describe('assertNever function', () => {
    test('throws error', () => {
      type A = { type: 'a' }
      type B = { type: 'b' }
      type Union = A | B

      function doSomething(arg: Union) {
        if (arg.type === 'a') {
          return true
        }

        // @ts-expect-error
        return _.assertNever(arg)
      }

      expect(() => doSomething({ type: 'b' })).toThrow()
    })
  })
})
