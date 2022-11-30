import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * @description 时间格式化成 年月日 时分秒
 * @param {string} date string
 * @param {string} format
 * @returns {string}
 */

export function formatToDateTime(
  date: dayjs.ConfigType = undefined,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format)
}

/**
 *
 * @param date
 * @param format
 * @returns
 */
export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

/**
 * @description  日期格式化
 * @param str
 * @param type
 */
export const formatDate = (str: string, type: 'date' | 'time' = 'date') => {
  const formatFn = type === 'date' ? formatToDate : formatToDateTime
  // dayjs格式化 毫秒数需要13位
  return str.length === 10 ? formatFn(Number(str) * 1000) : formatFn(str)
}

export const dateUtil = dayjs
