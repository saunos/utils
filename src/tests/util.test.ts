import { describe, expect, it } from 'bun:test'
import { jsonPathProxy } from '../util'

interface DeepObject {
  root: {
    field: Array<{
      value: string
      nested: {
        prop: number
      }
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
})
