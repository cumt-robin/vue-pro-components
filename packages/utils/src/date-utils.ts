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

interface GetDatePointOption {
    type: 'start' | 'end'
    date?: DayjsInput
    fmt?: string
    unit?: ManipulateType
    offset?: number
}

export function getDatePoint(
    { type, date = new Date(), fmt = DATE_STANDARD_FORMAT, offset = 0, unit = 'd' }: GetDatePointOption = { type: 'start' }
): string | number {
    const dayjsObj = dayjs(date)
    // ManipulateType 赋值给 OpUnitType 是安全的
    let res = type === 'start' ? dayjsObj.startOf(unit) : dayjsObj.endOf(unit)
    if (typeof offset === 'number' && offset !== 0) {
        res = offset > 0 ? res.add(offset, unit) : res.subtract(Math.abs(offset), unit)
    }
    if (fmt === 'valueOf') {
        return res.valueOf()
    }
    return res.format(fmt)
}

type GetSpecifiedDatePointOption = Omit<GetDatePointOption, 'unit' | 'type'>

export function getDayStart(option: GetSpecifiedDatePointOption) {
    return getDatePoint({
        ...option,
        type: 'start',
        unit: 'd',
    })
}

export function getDayEnd(option: GetSpecifiedDatePointOption) {
    return getDatePoint({
        ...option,
        type: 'end',
        unit: 'd',
    })
}

export function getOneDayRange(date: DayjsInput = new Date(), fmt = DATE_STANDARD_FORMAT, offset = 0) {
    return [getDayStart({ date, fmt, offset }), getDayEnd({ date, fmt, offset })]
}

export function getWeekStart(option: GetSpecifiedDatePointOption) {
    return getDatePoint({
        ...option,
        type: 'start',
        unit: 'w',
    })
}

export function getWeekEnd(option: GetSpecifiedDatePointOption) {
    return getDatePoint({
        ...option,
        type: 'end',
        unit: 'w',
    })
}

export function isBefore(date1: DayjsInput, date2: DayjsInput) {
    const dayjs1 = dayjs(date1)
    const dayjs2 = dayjs(date2)
    return dayjs1.isBefore(dayjs2)
}

export function isSameDay(date1: DayjsInput, date2: DayjsInput) {
    return format(date1, 'YYYY-MM-DD') === format(date2, 'YYYY-MM-DD')
}
