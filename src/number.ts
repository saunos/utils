/**
 * @category Number
 */
export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0.0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = parseFloat(value)
  return Number.isNaN(result) ? def : result
}

/**
 * @category Number
 */
export const toInt = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = parseInt(value)
  return Number.isNaN(result) ? def : result
}

/**
 * @category Number
 *
 * @description
 * Checks if a value is within a specified range.
 *
 * @example
 * inRange(10, 0, 20) // true
 * inRange(10, 0, 10, 'start-exclusive') // false
 */
export const inRange = (
  value: number,
  start: number,
  end: number,
  behaviour?: 'start-exclusive' | 'end-exclusive' | 'both-exclusive'
): boolean => {
  if (behaviour === 'start-exclusive') {
    return value > start && value <= end
  }
  if (behaviour === 'end-exclusive') {
    return value >= start && value < end
  }
  if (behaviour === 'both-exclusive') {
    return value > start && value < end
  }
  return value >= start && value <= end
}
