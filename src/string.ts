import { capitalize } from 'es-toolkit/compat'

/**
 * @category String
 *
 * @description
 * Formats the given string in title case fashion
 *
 * @example
 * title('hello world') -> 'Hello World'
 * title('va_va_boom') -> 'Va Va Boom'
 * title('root-hook') -> 'Root Hook'
 * title('queryItems') -> 'Query Items'
 */
export const title = (str: string | null | undefined): string => {
  if (!str) return ''
  return str
    .split(/(?=[A-Z])|[\.\-\s_]/)
    .map(s => s.trim())
    .filter(s => !!s)
    .map(s => capitalize(s.toLowerCase()))
    .join(' ')
}

/**
 * @category String
 *
 * @description
 * template is used to replace data by name in template strings.
 * The default expression looks for {{name}} to identify names.
 *
 * @example
 * Ex. template('Hello, {{name}}', { name: 'ray' })
 * Ex. template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)
 */
export const template = (
  str: string,
  data: Record<string, any>,
  regex: RegExp = /\{\{(.+?)\}\}/g
): string => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}
