import { useMemo } from 'react'
import { type ResizableColumnType } from '../type'
import { isEmpty } from '../utils'

export const GETKEY = 'dataIndex'

export const ResizableUniqIdPrefix = 'resizable-col-id'

export function getUniqueId(s: string) {
  return `${ResizableUniqIdPrefix}-${s}`
}

function getColumns<T extends ResizableColumnType>(list: T[] | undefined): any {
  // Table.SELECTION_COLUMN 和 Table.EXPANDABLE_COLUMN 为 {}，会被过滤掉，需要保留
  // 因 Antd 侧只想用 Table.SELECTION_COLUMN 和 Table.EXPANDABLE_COLUMN 的引用值是否相等来判断是否为内置列
  // 而当组件和业务的 Table 不是同一个引用时，只通过引用值判断会导致内置列被过滤掉
  // 故采用 JSON.stringify 判断是否为内置列
  const isReservedColumn = (item) => JSON.stringify(item) === '{}'
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
