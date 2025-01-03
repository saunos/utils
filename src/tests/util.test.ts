import { describe, expect, it } from 'bun:test'
import { jsonPathProxy, type JsonPath } from '../util'

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

    const path1 = $.root.field[1].value.toString()
    const path2 = $.root.field[0].nested.prop.toString()

    expect(path1).toBe('root.field[1].value')
    expect(path2).toBe('root.field[0].nested.prop')
  })

  it('should work', () => {
    const $ = jsonPathProxy<DeepObject>()
    function foo<T>(path: string, $: JsonPath<DeepObject>['root']) {
      return $.field[0].nested.prop.toString()
    }
    foo('root', $.root)
  })
})
