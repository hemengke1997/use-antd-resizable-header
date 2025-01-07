import { type ResizableColumnType } from '../type'

export function depthFirstSearchWidthSet<T extends { children?: T[] } & Record<string, any>>(
  children: T[],
  condition: (column: T) => boolean,
  width: number,
) {
  const c = [...children]

  ;(function find(cls: T[] | undefined) {
    if (!cls) return
    for (let i = 0; i < cls?.length; i++) {
      if (condition(cls[i])) {
        cls[i] = {
          ...cls[i],
          width,
        }
        return
      }
      if (cls[i].children) {
        find(cls[i].children)
      }
    }
  })(c)

  return c
}

export function isString(data: unknown): data is string {
  return typeof data === 'string'
}

export function isUndefined(data: unknown): data is undefined {
  return typeof data === 'undefined'
}

export function isNumber(data: unknown): data is number {
  return typeof data === 'number'
}

export function isFunction(data: unknown): data is Function {
  return typeof data === 'function'
}

export function isEmpty(data: unknown) {
  if (typeof data !== 'object' || data === null) {
    return true
  }
  if (Array.isArray(data) && data.length) {
    return false
  }
  if (Object.keys(data).length) {
    return false
  }
  return true
}

export function isColHidden(col: ResizableColumnType) {
  // pro-table hideInTable
  // antd@5.13.0 table hidden
  return col.hideInTable || col.hidden
}

// Table.SELECTION_COLUMN 和 Table.EXPANDABLE_COLUMN 为 {}，会被过滤掉，需要保留
// 因 Antd 侧只想用 Table.SELECTION_COLUMN 和 Table.EXPANDABLE_COLUMN 的引用值是否相等来判断是否为内置列
// 而当组件和业务的 Table 不是同一个引用时，只通过引用值判断会导致内置列被过滤掉
// fix #107
export function isReservedColumn(item: ResizableColumnType) {
  return item && item.constructor === Object && Object.keys(item).length === 0
}
