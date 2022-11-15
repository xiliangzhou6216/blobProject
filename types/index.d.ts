// type ss = (...args: any[]) => any
// 定义万能函数
declare interface Fn<T = any, R = T> {
  (...args: T[]): R
}

// 定义Promise函数
declare interface PromiseFn<T = any, R = T> {
  (...args: T[]): Promise<R>
}
