type AnyFunc = (...args: any[]) => any
type IsProp<T, K extends keyof T> = T[K] extends AnyFunc ? never : K

/**
 * ExtractProps
 *
 * ExtractProps is a utility type that extracts the properties of a class that are not functions.
 *
 * @example
 * class Player {
 *   name!: string;
 *   points!: number;
 *   constructor(props: ExtractProps<Player>) {
 *     Object.assign(this, props);
 *   }
 * }
 * new Player({ name: 'colin', points: 42 });
 */
export type ExtractProps<T> = { [k in keyof T as IsProp<T, k>]: T[k] }
