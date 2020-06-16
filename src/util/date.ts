import dayjs from "dayjs";

export function stringToDate(str: string) {
  return new Date(str);
}
export function formatDDMMMYY(date?: string) {
  return dayjs(date).format("DDMMMYYYY").toUpperCase();
}
export function japanDate(date: string) {
  let inDate = new Date(date);
  let year = inDate.getFullYear();
  let month = inDate.getMonth();
  let day = inDate.getDate();
  return `令和${year - 2018}年${month + 1}月${day}日`;
}

export function formatDDMMMYYHH(date?: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm").toUpperCase();
}

/**
 * ddmmyy を yyyymmddで返却する暫定版
 * @param date ddmmyy
 * @param format YYYY/MM/DD | YY/MM/DD ...etc
 */
export function formatChangeDDMMYY(date: string, format: string) {
  return dayjs(
    `20${date.substring(4, 6)}${date.substring(2, 4)}${date.substring(0, 2)}`
  ).format(format);
}

/**
 * 時間(分単位)の差分を返却
 * 第一引数をベースに第二引数との差分を取得
 *
 * @param baseTime : yyyymmddhhmm
 * @param diffValue : yyyymmddhhmm
 */
export function diffTime(
  baseTime: string | number | Date | dayjs.Dayjs | undefined,
  diffValue: string | number | Date | dayjs.Dayjs | undefined
) {
  return dayjs(baseTime).diff(dayjs(diffValue), "minute");
}
