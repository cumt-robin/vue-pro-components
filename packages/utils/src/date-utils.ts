import type { PlainObject } from '@vue-pro-components/types'
import type { ManipulateType, QUnitType, OpUnitType } from 'dayjs'
import dayjs from 'dayjs'

export const DATE_STANDARD_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const DATE_STANDARD_FORMAT_CN = 'YYYY年M月D日 HH:mm:ss'

export const HOUR_FORMAT = 'HH:mm:ss'

export const ONE_DAY_MILLSECONDS = 86400000

export const ONE_WEEK_MILLSECONDS = ONE_DAY_MILLSECONDS * 7

type DayjsInput = Parameters<typeof dayjs>[0]

interface DayjsAddOption extends PlainObject {
    offset: number
    unit: ManipulateType
    format: string
}

export function format(date: DayjsInput = new Date(), fmt = DATE_STANDARD_FORMAT): string {
    return dayjs(date).format(fmt)
}

export function getDateByOffset(date: DayjsInput = new Date(), options: DayjsAddOption): string {
    const defaultOptions: DayjsAddOption = {
        offset: 0,
        unit: 'd',
        format: DATE_STANDARD_FORMAT,
    }
    const mergedOptions: DayjsAddOption = {
        ...defaultOptions,
        ...options,
    }
    const _date = dayjs(date).add(mergedOptions.offset, mergedOptions.unit)
    return _date.format(mergedOptions.format)
}

export function getTimeInterval(dateStr1: DayjsInput, dateStr2: DayjsInput, unit: QUnitType | OpUnitType = 'minute'): number {
    const date1 = dayjs(dateStr1)
    const date2 = dayjs(dateStr2)
    return Math.abs(date1.diff(date2, unit, true))
}

export function getDayStart(date: DayjsInput = new Date(), fmt = DATE_STANDARD_FORMAT, offset = 0): string | number {
    let res = dayjs(date).startOf('day')
    if (typeof offset === 'number' && offset !== 0) {
        res = offset > 0 ? res.add(offset, 'd') : res.subtract(Math.abs(offset), 'd')
    }
    if (fmt === 'valueOf') {
        return res.valueOf()
    }
    return res.format(fmt)
}

export function getDayEnd(date: DayjsInput = new Date(), fmt = DATE_STANDARD_FORMAT, offset = 0): string | number {
    let res = dayjs(date).endOf('day')
    if (typeof offset === 'number' && offset !== 0) {
        res = offset > 0 ? res.add(offset, 'd') : res.subtract(Math.abs(offset), 'd')
    }
    if (fmt === 'valueOf') {
        return res.valueOf()
    }
    return res.format(fmt)
}

export function getOneDayRange(date = new Date(), fmt = DATE_STANDARD_FORMAT, offset = 0) {
    return [getDayStart(date, fmt, offset), getDayEnd(date, fmt, offset)]
}
