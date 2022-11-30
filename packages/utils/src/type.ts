/* eslint-disable @typescript-eslint/no-explicit-any */
enum DataType {
    Number = 'number',
    String = 'string',
    Boolean = 'boolean',
    Undefined = 'undefined',
    Null = 'null',
    Symbol = 'symbol',
    Object = 'object',
    Date = 'date',
    Map = 'map',
    Set = 'set',
    BigInt = 'bigint',
    Function = 'function',
    Promise = 'promise',
    File = 'file',
    Blob = 'blob',
}

/**
 * 判断变量的数据类型
 * @param {unknown} val 变量值
 * @returns {string} 数据类型
 */
export function getType(val: unknown): string {
    return Object.prototype.toString
        .call(val)
        .replace(/\[object\s(\w+)\]/, '$1')
        .toLowerCase()
}

export function isObject<T = Record<any, any>>(val: unknown): val is T {
    return getType(val) === DataType.Object
}

export function isArray<T = unknown>(val: unknown): val is T[] {
    return Array.isArray(val)
}

export function isNumber(val: unknown): val is number {
    return typeof val === DataType.Number
}

export function isString(val: unknown): val is string {
    return typeof val === DataType.String
}

export function isBool(val: unknown): val is boolean {
    return typeof val === DataType.Boolean
}

export function isUndefined(val: unknown): val is undefined {
    return val === undefined
}

export function isNull(val: unknown): val is null {
    return val === null
}

export type GeneralFunction = (...args: any[]) => any

export function isFunction<T extends GeneralFunction = GeneralFunction>(val: unknown): val is T {
    return typeof val === DataType.Function
}

export function isSymbol(val: unknown): val is symbol {
    return typeof val === DataType.Symbol
}

export function isMap(val: unknown): val is Map<unknown, unknown> {
    return getType(val) === DataType.Map
}

export function isSet(val: unknown): val is Set<unknown> {
    return getType(val) === DataType.Set
}

export function isPromise<T = unknown>(val: unknown): val is Promise<T> {
    return getType(val) === DataType.Promise
}

export function isFile<T extends File>(val: unknown): val is T {
    return val instanceof File
}

export function isBlob<T extends Blob>(val: unknown): val is T {
    return val instanceof Blob
}

export type BasicType = number | string | symbol | undefined | null

export function isBasicType(val: unknown): val is BasicType {
    const type = getType(val) as DataType
    return [DataType.Number, DataType.Boolean, DataType.String, DataType.Symbol, DataType.Undefined, DataType.Null].includes(type)
}

export function isUndefOrNull(val: unknown): val is undefined | null {
    return isUndefined(val) || isNull(val)
}

/**
 * 判断变量是否有具体定义，即非null,非undefined,非空字符串
 * @param {unknown} val 变量值
 * @returns {boolean} 变量是否有具体定义
 */
export function isDefined(val: unknown): boolean {
    return val !== null && val !== undefined && val !== ''
}
