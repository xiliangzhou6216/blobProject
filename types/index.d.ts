// type ss = (...args: any[]) => any
// 定义万能函数
declare interface Fn<T = any, R = T> {
  (...args: T[]): R
}

// 定义Promise函数
declare interface PromiseFn<T = any, R = T> {
  (...args: T[]): Promise<R>
}

declare module 'ityped'

declare type Recordable<T = any> = Record<string, T>

// * 内部模块
declare module 'internal-module' {
  interface XXX {
    user: string
  }
  interface XX {
    user: string
  }
}
