import { isPromise } from './predicates'

/**
 * @category Async
 *
 * @description
 * Async wait
 *
 * @example
 * await sleep(2000) // => waits 2 seconds
 */
export const sleep = (milliseconds: number, cb?: () => void): Promise<void> => {
  return new Promise(res => {
    setTimeout(res, milliseconds)
    cb?.()
  })
}

/**
 * @category Async
 *
 * @description
 * A helper to try an async function without forking
 * the control flow. Returns an error first callback _like_
 * array response as [Error, result]
 *
 * @example
 * const [err, user] = await tryit(api.users.find)(userId)
 */
export const tryIt = <Args extends any[], Return>(
  func: (...args: Args) => Return
) => {
  return (
    ...args: Args
  ): Return extends Promise<any>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return] => {
    try {
      const result = func(...args)
      if (isPromise(result)) {
        return result
          .then(value => [undefined, value])
          .catch(err => [err, undefined]) as Return extends Promise<any>
          ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
          : [Error, undefined] | [undefined, Return]
      }
      return [undefined, result] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    } catch (err) {
      return [err as any, undefined] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    }
  }
}
