/**
 * 値が null または undefined のときは false, それ以外の値のときは true を返す。
 * Array.prototype.filter と組み合わせて null を除去するのに使える。
 *
 * @param value null チェックしたい値
 * @example
 * [0, null, {}].filter(nonNull) // [0, {}]
 */
// eslint-disable-next-line import/prefer-default-export
export function nonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Error.message が undefined ではないときは true, それ以外の値のときは false を返す。
 * unkown 型で渡された値に対してチェックしたい場合に使える。
 *
 * @param arg チェックしたい値
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isError(arg: any): arg is Error {
  return arg.message !== undefined
}
