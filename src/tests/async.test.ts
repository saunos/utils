import { describe, expect, test } from 'bun:test'
import * as ft from '@sinonjs/fake-timers'
import * as _ from '../async'

describe('async module', () => {
  describe('_.tryIt function', () => {
    test('returns error when error is thrown', async () => {
      const fn = _.tryIt(async () => {
        throw new Error('not good enough')
      })
      const [err, result] = await fn()
      expect(result).toBeUndefined()
      expect(err).not.toBeNull()
      expect(err!.message).toBe('not good enough')
    })
    test('returns result when no error is thrown', async () => {
      const [err, result] = await _.tryIt(async () => {
        return 'hello'
      })()
      expect(result).not.toBeNull()
      expect(err).toBeUndefined()
      expect(result).toBe('hello')
    })
    test('handles non-async function results', async () => {
      const [err, result] = _.tryIt(() => {
        return 'hello'
      })()
      expect(result).not.toBeNull()
      expect(err).toBeUndefined()
      expect(result).toBe('hello')
    })
    test('handles non-async function errors', async () => {
      const [err, result] = _.tryIt(() => {
        if (1 < 0) return ''
        throw new Error('unknown')
      })()
      expect(result).toBeUndefined()
      expect(err).not.toBeNull()
      expect(err!.message).toBe('unknown')
    })
  })

  describe('_.sleep function', () => {
    test('suspends a thread for a specified number of milliseconds', async () => {
      const clock = ft.install()
      const ONE_SECOND = 1000
      const before = Date.now()
      await _.sleep(ONE_SECOND, () => {
        clock.tick(ONE_SECOND)
      })
      const after = Date.now()
      expect(after).toBeGreaterThanOrEqual(before + ONE_SECOND)
      clock.uninstall()
    })
  })
})
