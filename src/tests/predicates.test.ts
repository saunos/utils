import { describe, expect, test } from 'bun:test'
import * as _ from '../predicates'

describe('typed module', () => {
  describe('isObject function', () => {
    test('returns false for null', () => {
      const result = _.isObject(null)
      expect(result).toBe(false)
    })
    test('returns false for undefined', () => {
      const result = _.isObject(undefined)
      expect(result).toBe(false)
    })
    test('returns false for boolean', () => {
      const result = _.isObject(false)
      expect(result).toBe(false)
    })
    test('returns false for number', () => {
      const result = _.isObject(22)
      expect(result).toBe(false)
    })
    test('returns false for string', () => {
      const result = _.isObject('abc')
      expect(result).toBe(false)
    })
    test('returns true for object', () => {
      const result = _.isObject({})
      expect(result).toBe(true)
    })
  })

  describe('isPrimitive function', () => {
    test('returns true for all the primitives', () => {
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
        expect(_.isPrimitive(elm)).toBe(true)
      }
    })
    test('returns false for non-primitives', () => {
      const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

      for (const elm of arr) {
        expect(_.isPrimitive(elm)).toBe(false)
      }
    })
  })

  describe('isFunction function', () => {
    test('returns false for null', () => {
      const result = _.isFunction(null)
      expect(result).toBe(false)
    })
    test('returns false for undefined', () => {
      const result = _.isFunction(undefined)
      expect(result).toBe(false)
    })
    test('returns false for boolean', () => {
      const result = _.isFunction(false)
      expect(result).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isFunction(new Data())
      expect(result).toBe(false)
    })
    test('returns false for number', () => {
      const result = _.isFunction(22)
      expect(result).toBe(false)
    })
    test('returns false for string', () => {
      const result = _.isFunction('abc')
      expect(result).toBe(false)
    })
    test('returns false for array', () => {
      const result = _.isFunction([1, 2, 3])
      expect(result).toBe(false)
    })
    test('returns false for object', () => {
      const result = _.isFunction({})
      expect(result).toBe(false)
    })
    test('returns true for anonymous function', () => {
      // biome-ignore lint/complexity/useArrowFunction: <explanation>
      const result = _.isFunction(function () {
        return 'hello'
      })
      expect(result).toBe(true)
    })
    test('returns true for arrow function', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })
      expect(result).toBe(true)
    })
    test('returns true for named function', () => {
      function sayHello() {
        return 'hello'
      }
      const result = _.isFunction(sayHello)
      expect(result).toBe(true)
    })
  })

  describe('isString function', () => {
    test('returns false for null', () => {
      const result = _.isString(null)
      expect(result).toBe(false)
    })
    test('returns false for undefined', () => {
      const result = _.isString(undefined)
      expect(result).toBe(false)
    })
    test('returns false for boolean', () => {
      const result = _.isString(false)
      expect(result).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isString(new Data())
      expect(result).toBe(false)
    })
    test('returns false for number', () => {
      const result = _.isString(22)
      expect(result).toBe(false)
    })
    test('returns false for array', () => {
      const result = _.isString([1, 2, 3])
      expect(result).toBe(false)
    })
    test('returns false for object', () => {
      const result = _.isString({})
      expect(result).toBe(false)
    })
    test('returns true for string', () => {
      const result = _.isString('abc')
      expect(result).toBe(true)
    })
    test('returns true for string class', () => {
      const result = _.isString(String('abc'))
      expect(result).toBe(true)
    })
  })

  describe('isNumber function', () => {
    test('returns false for null', () => {
      const result = _.isNumber(null)
      expect(result).toBe(false)
    })
    test('returns false for undefined', () => {
      const result = _.isNumber(undefined)
      expect(result).toBe(false)
    })
    test('returns false for boolean', () => {
      const result = _.isNumber(false)
      expect(result).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isNumber(new Data())
      expect(result).toBe(false)
    })
    test('returns true for int', () => {
      const result = _.isNumber(22)
      expect(result).toBe(true)
    })
    test('returns true for float', () => {
      const result = _.isNumber(22.0567)
      expect(result).toBe(true)
    })
    test('returns true for NaN', () => {
      const result = _.isNumber(Number.NaN)
      expect(result).toBe(true)
    })
    test('returns false for array', () => {
      const result = _.isNumber([1, 2, 3])
      expect(result).toBe(false)
    })
    test('returns false for object', () => {
      const result = _.isNumber({})
      expect(result).toBe(false)
    })
    test('returns false for string', () => {
      const result = _.isNumber('abc')
      expect(result).toBe(false)
    })
    test('returns false for string class', () => {
      const result = _.isNumber(String('abc'))
      expect(result).toBe(false)
    })
  })

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

  describe('isDate function', () => {
    test('return true for Date values', () => {
      expect(_.isDate(new Date())).toBe(true)
      expect(_.isDate(new Date('2022-09-01T02:19:55.976Z'))).toBe(true)
      expect(_.isDate(new Date('invalid value'))).toBe(true)
    })
    test('return false for non-Date values', () => {
      expect(_.isDate(22)).toBe(false)
      expect(_.isDate({ name: 'x' })).toBe(false)
      expect(_.isDate('abc')).toBe(false)
      expect(_.isDate(String('abc'))).toBe(false)
      expect(_.isDate([1, 2, 3])).toBe(false)
      expect(_.isDate(function work() {})).toBe(false)
      expect(_.isDate(() => {})).toBe(false)
      expect(_.isDate(Symbol(''))).toBe(false)
      expect(_.isDate(Symbol('hello'))).toBe(false)
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

  describe('isSymbol function', () => {
    test('returns false for null', () => {
      const input = null
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for undefined', () => {
      const input = undefined
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for empty class instance', () => {
      class Data {}
      const input = new Data()
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for class instance with properties', () => {
      class Data {
        name = 'ray'
      }
      const input = new Data()
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for number greater than 0', () => {
      const input = 22
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for number 0', () => {
      const input = 0
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for array with values', () => {
      const input = [1, 2, 3]
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for empty array', () => {
      const input: unknown[] = []
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for true', () => {
      const input = true
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for false', () => {
      const input = false
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for empty object', () => {
      const input = {}
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for object with values', () => {
      const input = { name: 'x' }
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for string with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for empty string', () => {
      const input = ''
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for empty string class', () => {
      const input = ''
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for string class with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns false for empty Map', () => {
      const input = new Map()
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
    test('returns true for empty Symbol', () => {
      const input = Symbol('')
      const result = _.isSymbol(input)
      expect(result).toBe(true)
    })
    test('returns true for Symbol instance', () => {
      const input = Symbol('hello')
      const result = _.isSymbol(input)
      expect(result).toBe(true)
    })
    test('returns false for Map with values', () => {
      const input = new Map()
      input.set('a', 1)
      input.set('b', 2)
      input.set('c', 3)
      const result = _.isSymbol(input)
      expect(result).toBe(false)
    })
  })

  describe('isEqual function', () => {
    class Person {
      name: string
      friends: Person[] = []
      self?: Person
      constructor(name: string) {
        this.name = name
      }
    }
    const jake = new Person('jake')
    jake.self = jake
    jake.friends = [jake, jake]
    const symbolKey = Symbol('symkey')
    const complex = {
      num: 0,
      str: '',
      boolean: true,
      unf: void 0,
      nul: null,
      obj: { name: 'object', id: 1, chilren: [0, 1, 2] },
      arr: [0, 1, 2],
      func() {
        console.log('function')
      },
      loop: null as any,
      person: jake,
      date: new Date(0),
      reg: /\/regexp\/ig/,
      [symbolKey]: 'symbol'
    }
    complex.loop = complex
    test('returns true for equal things', () => {
      expect(_.isEqual(0, 0)).toBe(true)
      expect(_.isEqual('a', 'a')).toBe(true)
      const hello = Symbol('hello')
      expect(_.isEqual(hello, hello)).toBe(true)
      expect(_.isEqual({}, {})).toBe(true)
      expect(_.isEqual(true, true)).toBe(true)
      expect(_.isEqual(new RegExp(/a*s/), new RegExp(/a*s/))).toBe(true)
      const now = new Date()
      expect(_.isEqual(now, now)).toBe(true)
      expect(_.isEqual([], [])).toBe(true)
      expect(_.isEqual(complex, { ...complex })).toBe(true)
      expect(
        _.isEqual([complex, complex], [{ ...complex }, { ...complex }])
      ).toBe(true)
    })
    test('returns false for non-equal things', () => {
      expect(_.isEqual(0, 1)).toBe(false)
      expect(_.isEqual('a', 'b')).toBe(false)
      expect(_.isEqual(new RegExp(/^http:/), new RegExp(/https/))).toBe(false)
      expect(_.isEqual(Symbol('hello'), Symbol('goodbye'))).toBe(false)
      expect(_.isEqual({ z: 23 }, { a: 1 })).toBe(false)
      expect(_.isEqual(true, false)).toBe(false)
      expect(_.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z'))).toBe(
        false
      )
      expect(_.isEqual([], [1])).toBe(false)
      expect(_.isEqual(complex, { ...complex, num: 222 })).toBe(false)
      expect(_.isEqual([complex], [{ ...complex, num: 222 }])).toBe(false)
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
