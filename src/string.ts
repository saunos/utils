/**
 * @category String
 *
 * @description
 * Capitalize the first word of the string
 *
 * @example
 * capitalize('hello')   -> 'Hello'
 * capitalize('va va voom') -> 'Va va voom'
 */
export const capitalize = (str: string): string => {
  if (!str || str.length === 0) return ''
  const lower = str.toLowerCase()
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}

/**
 * @category String
 *
 * @description
 * Formats the given string in camel case fashion
 *
 * @example
 * camel('hello world')   -> 'helloWorld'
 * camel('va va-VOOM') -> 'vaVaVoom'
 * camel('helloWorld') -> 'helloWorld'
 */
export const camel = (str: string): string => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|[\.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}

/**
 * @category String
 *
 * @description
 * Formats the given string in snake case fashion
 *
 * @example
 * snake('hello world')   -> 'hello_world'
 * snake('va va-VOOM') -> 'va_va_voom'
 * snake('helloWord') -> 'hello_world'
 */
export const snake = (
  str: string,
  options?: {
    splitOnNumber?: boolean
  }
): string => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      .split(/(?=[A-Z])|[\.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  const result = parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
  return options?.splitOnNumber === false
    ? result
    : result.replace(/([A-Za-z]{1}[0-9]{1})/, val => `${val[0]!}_${val[1]!}`)
}

/**
 * @category String
 *
 * @description
 * Formats the given string in dash case fashion
 *
 * @example
 * dash('hello world')   -> 'hello-world'
 * dash('va va_VOOM') -> 'va-va-voom'
 * dash('helloWord') -> 'hello-word'
 */
export const dash = (str: string): string => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|[\.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`
  })
}

/**
 * @category String
 *
 * @description
 * Formats the given string in pascal case fashion
 *
 * @example
 * pascal('hello world') -> 'HelloWorld'
 * pascal('va va boom') -> 'VaVaBoom'
 */
export const pascal = (str: string): string => {
  const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  return parts.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join('')
}

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
  regex = /\{\{(.+?)\}\}/g
) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}

/**
 * @category String
 *
 * @description
 * Trims all prefix and suffix characters from the given
 * string. Like the builtin trim function but accepts
 * other characters you would like to trim and trims
 * multiple characters.
 *
 * @example
 * trim('  hello ') // => 'hello'
 * trim('__hello__', '_') // => 'hello'
 * trim('/repos/:owner/:repo/', '/') // => 'repos/:owner/:repo'
 * trim('222222__hello__1111111', '12_') // => 'hello'
 */
export const trim = (str: string | null | undefined, charsToTrim = ' ') => {
  if (!str) return ''
  const toTrim = charsToTrim.replace(/[\W]{1}/g, '\\$&')
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, 'g')
  return str.replace(regex, '')
}
