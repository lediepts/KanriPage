/**
 * Omit<T, K> で K に extends keyof T の制約を課した
 */
type OmitStrict<T, K extends keyof T> = Omit<T, K>

/**
 * T のうち、S のキーにあたる項目を、S で上書きする
 */
type Specify<T, S> = Omit<T, keyof S> & S

/**
 * T の全メンバーの交差型を返す
 */
type ValueOf<T> = T[keyof T]

/**
 * Promise が解決したときの値を取得する
 * @see https://stackoverflow.com/a/49889856
 */
type Resolved<T> = T extends Promise<infer U> ? U : T

/**
 * DeepReadonly
 * @see https://stackoverflow.com/a/49670389
 */
type DeepReadonly<T> = T extends (infer U)[]
  ? DeepReadonlyArray<U>
  : T extends object
  ? DeepReadonlyObject<T>
  : T

// DeepReadonlyArray は interface で定義しないと、循環参照になってうまくいかない
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
