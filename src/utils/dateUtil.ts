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

/**
 * @description  判断参数符合日期格式的 处理成'YYYY-MM-DD' (包括 year quarter month week )
 * @param str
 * @param type
 */
export function paramsHandleToDate(params: any) {
  if (Object.keys(params).length) {
    Object.keys(params).map((key) => {
      if (params[key] && dayjs.isDayjs(params[key])) {
        params[key] = formatToDate(params[key])
      }
    })
  }
  return params
}
export const dateUtil = dayjs
