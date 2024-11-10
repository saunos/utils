export type UnaryFunc<T, R> = (arg: T) => R
export type Func<TArgs = any, KReturn = any> = (...args: TArgs[]) => KReturn

export type FuncN<T extends any[], R> = (...arg1: T) => R

export function pipe<T1 extends [any, ...any], T2, R>(
  fn1: FuncN<T1, T2>,
  fn2: UnaryFunc<T2, R>
): FuncN<T1, R>

export function pipe<T1 extends [any, ...any], T2, T3, R>(
  fn1: FuncN<T1, T2>,
  fn2: UnaryFunc<T2, T3>,
  fn3: UnaryFunc<T3, R>
): FuncN<T1, R>
export function pipe<T1 extends [any, ...any], T2, T3, T4, R>(
  fn1: FuncN<T1, T2>,
  fn2: UnaryFunc<T2, T3>,
  fn3: UnaryFunc<T3, T4>,
  fn4: UnaryFunc<T4, R>
): FuncN<T1, R>
export function pipe<T1 extends [any, ...any], T2, T3, T4, T5, R>(
  fn1: FuncN<T1, T2>,
  fn2: UnaryFunc<T2, T3>,
  fn3: UnaryFunc<T3, T4>,
  fn4: UnaryFunc<T4, T5>,
  fn5: UnaryFunc<T5, R>
): FuncN<T1, R>
export function pipe<T1 extends [any, ...any], T2, T3, T4, T5, T6, R>(
  fn1: FuncN<T1, T2>,
  fn2: UnaryFunc<T2, T3>,
  fn3: UnaryFunc<T3, T4>,
  fn4: UnaryFunc<T4, T5>,
  fn5: UnaryFunc<T5, T6>,
  fn6: UnaryFunc<T6, R>
): FuncN<T1, R>
export function pipe<T1 extends [any, ...any], T2, T3, T4, T5, T6, T7, R>(
  fn1: FuncN<T1, T2>,
  fn2: UnaryFunc<T2, T3>,
  fn3: UnaryFunc<T3, T4>,
  fn4: UnaryFunc<T4, T5>,
  fn5: UnaryFunc<T5, T6>,
  fn6: UnaryFunc<T6, T7>,
  fn7: UnaryFunc<T7, R>
): FuncN<T1, R>

export function pipe<T = any, R = any>(
  ...funcs: ((arg: any) => any)[]
): UnaryFunc<T, R>

/**
 * @category Curry
 *
 * @description
 * Creates pipeline of functions to be applied to a value
 * First function can receive any number of arguments
 * Subsequent functions can only receive one argument - the result of the previous function
 *
 * @example
 * const addFive = (base: string, repeat: number) => base.repeat(repeat)
 * const len = (str: string) => str.length
 * const twoX = (num: number) => num * 2
 * const func = _.pipe(addFive, len, twoX)
 * const result = func('a', 3)
 * expect(result).toBe(6)
 */
export function pipe(fn1: Func, ...fns: Func[]) {
  const piped = fns.reduce(
    (prevFn, nextFn) => value => nextFn(prevFn(value)),
    value => value
  )
  return (...args: any[]) => piped(fn1(...args))
}
