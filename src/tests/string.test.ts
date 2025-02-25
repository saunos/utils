import { describe, expect, test } from 'bun:test'
import { template, title } from '../string'

describe('string module', () => {
  describe('template function', () => {
    test('replaces all occurrences', () => {
      const tmp = `
    Hello my name is {{name}}. I am a {{type}}.
    Not sure why I am {{reason}}.

    Thank You - {{name}}
  `
      const data = {
        name: 'Ray',
        type: 'template',
        reason: 'so beautiful'
      }

      const result = template(tmp, data)
      const expected = `
    Hello my name is ${data.name}. I am a ${data.type}.
    Not sure why I am ${data.reason}.

    Thank You - ${data.name}
  `

      expect(result).toBe(expected)
    })

    test('replaces all occurrences given template', () => {
      const tmp = 'Hello <name>.'
      const data = {
        name: 'Ray'
      }

      const result = template(tmp, data, /<(.+?)>/g)
      expect(result).toBe(`Hello ${data.name}.`)
    })
  })

  describe('title function', () => {
    test('returns input formatted in title case', () => {
      expect(title('hello world')).toBe('Hello World')
      expect(title('va_va_boom')).toBe('Va Va Boom')
      expect(title('root-hook   -  ok!')).toBe('Root Hook Ok!')
      expect(title('queryItems')).toBe('Query Items')
      expect(title('queryAllItems-in_Database')).toBe(
        'Query All Items In Database'
      )
    })
    test('returns empty string for bad input', () => {
      expect(title(null)).toBe('')
      expect(title(undefined)).toBe('')
    })
  })
})
