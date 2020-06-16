import { isHalfwidthAlphanum } from './normalizer'

/**
 * 半角は1文字、全角は2文字として文字数をカウントする
 *
 * @param str 文字列
 */
export function getLen(str: string) {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    if (isHalfwidth(chr)) {
      // 半角文字の場合は1を加算
      result += 1
    } else {
      // それ以外の文字の場合は2を加算
      result += 2
    }
  }

  return result
}

/**
 * 半角の場合は true を返却する
 * 半角ではない場合は false を返却する
 *
 * @param chr 文字の UTF-16 コード
 */
export function isHalfwidth(chr: number) {
  return (
    (chr >= 0x00 && chr < 0x81) ||
    chr === 0xf8f0 ||
    (chr >= 0xff61 && chr < 0xffa0) ||
    (chr >= 0xf8f1 && chr < 0xf8f4)
  )
}

/**
 * 文字数チェック
 * チェックOKの場合は true を返却する
 * チェックNGの場合は false を返却する
 *
 * @param str 文字列
 * @param maxLength 最大文字数
 * @param minLength 最小文字数
 */
export function checkLength(
  str?: string,
  maxLength?: number,
  minLength?: number,
) {
  if (!str) return true
  if (maxLength && str.length > maxLength) {
    return false
  }
  if (minLength && str.length < minLength) {
    return false
  }
  return true
}

/**
 * 文字数チェック
 * チェックNGの場合はエラーメッセージを返却する
 *
 * @param label 項目名
 * @param str 文字列
 * @param maxLength 最大文字数
 * @param minLength 最小文字数
 */
export function checkLengthWithErrMsg(
  label?: string,
  str?: string,
  maxLength?: number,
  minLength?: number,
) {
  if (!str) return ''

  if (label) {
    if (maxLength && str.length > maxLength) {
      return `${label} must be less than ${maxLength} characters.`
    }
    if (minLength && str.length < minLength) {
      return `${label} must be ${minLength} characters.`
    }
  } else if (maxLength && str.length > maxLength) {
    return 'Too many characters.'
  }
  return ''
}

/**
 * 半角英数文字数チェック
 * チェックNGの場合はエラーメッセージを返却する
 *
 * @param label 項目名
 * @param str 文字列
 * @param maxLength 最大文字数
 * @param minLength 最小文字数
 */
export function checkHalfwidthAlphanumLengthWithErrMsg(
  label?: string,
  str?: string,
  maxLength?: number,
  minLength?: number,
) {
  if (!str) return ''

  if (!isHalfwidthAlphanum(str)) {
    return `${label} contains invalid characters.`
  }

  if (label) {
    if (maxLength && str.length > maxLength) {
      return `${label} must be less than ${maxLength} characters.`
    }
    if (minLength && str.length < minLength) {
      return `${label} must be ${minLength} characters.`
    }
  } else if (maxLength && str.length > maxLength) {
    return 'Too many characters.'
  }

  return ''
}
