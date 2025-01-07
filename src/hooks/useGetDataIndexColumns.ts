import { useMemo } from 'react'
import { type ResizableColumnType } from '../type'
import { isEmpty, isReservedColumn } from '../utils'

export const GETKEY = 'dataIndex'

export const ResizableUniqIdPrefix = 'resizable-col-id'

export function getUniqueId(s: string) {
  return `${ResizableUniqIdPrefix}-${s}`
}

function getColumns<T extends ResizableColumnType>(list: T[] | undefined) {
  const trulyColumns = list?.filter((item) => !isEmpty(item) || isReservedColumn(item))
  const c = trulyColumns?.map((col, index) => {
    if (isReservedColumn(col)) {
      return col
    }
    return {
      ...col,
      children: col?.children?.length ? getColumns(col.children) : undefined,
      [GETKEY]: col[GETKEY] || col.key || getUniqueId(`${col.title}-${index}`),
    }
  })

  return c
}

/*
 ** 如果columns没有dataIndex，则按规则添加一个不重复的dataIndex
 */
export function useGetDataIndexColumns<T extends ResizableColumnType>(columns: T[] | undefined) {
  const dataIndexColumns = useMemo(() => getColumns(columns), [columns]) as T[] | undefined

  return dataIndexColumns || columns
}
