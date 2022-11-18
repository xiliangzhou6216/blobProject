type pathType = string | string[]

function toArray<T>(value: T | T[]): T[] {
  if (value === undefined || value === null) {
    return []
  }

  return (Array.isArray(value) ? value : [value]) as T[]
}

export function getByValue<T>(value: T, path: pathType): T {
  if (!path?.length) {
    return value
  }
  const pathList = toArray(path)
  let result: any = value
  for (let i = 0; i < pathList.length; i++) {
    result = result[pathList[i]]
  }
  return result as T
}
// console.log(getByValue({ a: { b: 1 } }, []))
