const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}
