import * as compat from 'es-toolkit/compat'
import * as est from 'es-toolkit/string'

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').capitalize}
 */
export const capitalize: typeof est.capitalize = est.capitalize

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').camelCase}
 */
export const camelCase: typeof est.camelCase = est.camelCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').snake}
 */
export const snakeCase: typeof est.snakeCase = est.snakeCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').kebabCase}
 */
export const kebabCase: typeof est.kebabCase = est.kebabCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').pascalCase}
 */
export const pascalCase: typeof est.pascalCase = est.pascalCase

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

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').template}
 */
export const estTemplate: typeof compat.template = compat.template

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').trim}
 */
export const trim: typeof est.trim = est.trim

// ... existing imports and exports ...

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').constantCase}
 */
export const constantCase: typeof est.constantCase = est.constantCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').deburr}
 */
export const deburr: typeof est.deburr = est.deburr

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').endsWith}
 */
export const endsWith: typeof compat.endsWith = compat.endsWith

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').escape}
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const escape: typeof est.escape = est.escape

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').escapeRegExp}
 */
export const escapeRegExp: typeof est.escapeRegExp = est.escapeRegExp

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').lowerCase}
 */
export const lowerCase: typeof est.lowerCase = est.lowerCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').lowerFirst}
 */
export const lowerFirst: typeof est.lowerFirst = est.lowerFirst

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').pad}
 */
export const pad: typeof est.pad = est.pad

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').padEnd}
 */
export const padEnd: typeof compat.padEnd = compat.padEnd

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').padStart}
 */
export const padStart: typeof compat.padStart = compat.padStart

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').repeat}
 */
export const repeat: typeof compat.repeat = compat.repeat

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').replace}
 */
// export const replace = compat.replace

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').startCase}
 */
export const startCase: typeof est.startCase = est.startCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/compat').startsWith}
 */
export const startsWith: typeof compat.startsWith = compat.startsWith

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').trimEnd}
 */
export const trimEnd: typeof est.trimEnd = est.trimEnd

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').trimStart}
 */
export const trimStart: typeof est.trimStart = est.trimStart

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').unescape}
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const unescape: typeof est.unescape = est.unescape

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').upperCase}
 */
export const upperCase: typeof est.upperCase = est.upperCase

/**
 * @category String
 *
 * @alias {import('es-toolkit/string').upperFirst}
 */
export const upperFirst: typeof est.upperFirst = est.upperFirst
