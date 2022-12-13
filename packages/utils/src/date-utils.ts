import dayjs from 'dayjs'

export const DATE_STANDARD_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const DATE_STANDARD_FORMAT_CN = 'YYYY年M月D日 HH:mm:ss'

export const HOUR_FORMAT = 'HH:mm:ss'

export const ONE_DAY_MILLSECONDS = 86400000

export const ONE_WEEK_MILLSECONDS = ONE_DAY_MILLSECONDS * 7

export function format(date: Parameters<typeof dayjs>[0] = new Date(), fmt = DATE_STANDARD_FORMAT): string {
    return dayjs(date).format(fmt)
}
