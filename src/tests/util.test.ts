import { describe, expect, it } from 'bun:test'
import { type JsonPath, jsonPathProxy } from '../util'

interface DeepObject {
  root: {
    field?: Array<{
      value: string
      nested: {
        prop: number
      } | null
    }>
  }
}

describe('jsonPathProxy', () => {
  it('should generate type-safe paths', () => {
    const $ = jsonPathProxy<DeepObject>()

    const path1 = $.root.field[1].value.$
    const path2 = $.root.field[0].nested.prop.$

    expect(path1).toBe('root.field[1].value')
    expect(path2).toBe('root.field[0].nested.prop')
  })

  it('should work', () => {
    const $ = jsonPathProxy<DeepObject>()
    function foo<T>(path: string, $: JsonPath<DeepObject>['root']) {
      return $.field[0].nested.prop.$
    }
    foo('root', $.root)
  })
})
