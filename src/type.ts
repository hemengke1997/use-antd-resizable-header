export type WidthType = number | string

export type CacheType = {
  width?: WidthType
  index: number
}

export type ResizableColumnType<T extends Record<string, any> = Record<string, any>> = {
  /**
   * @description 列宽度
   */
  width?: WidthType
  /**
   * @description 默认列宽度
   */
  defaultWidth?: number
  /**
   * @description 是否可以拖动
   */
  resizable?: boolean
  /**
   * @description 最小拖动宽度
   */
  minConstraints?: number
  /**
   * @description 最大拖动宽度
   */
  maxConstraints?: number
} & T

/**
 * 类型工具，用于包装Table的Columns类型
 * @example
 * ```tsx
 * import { type TableColumnsType } from 'antd'
 * import { type ResizableColumnsType } from 'use-antd-resizable-header'
 *
 * type Columns = ResizableColumnsType<TableColumnsType>
 *
 * const columns: Columns = [
 *   // ... columns
 * ]
 * ```
 */
export type ResizableColumnsType<T extends Record<string, any>[]> = ResizableColumnType<T[number]>[]

export type ColumnsStateType = {
  /**
   * 持久化的类型，支持 localStorage 和 sessionStorage
   *
   * @param localStorage 设置在关闭浏览器后也是存在的
   * @param sessionStorage 关闭浏览器后会丢失
   */
  persistenceType?: 'localStorage' | 'sessionStorage'
  /** 持久化的key，用于存储到 storage 中 */
  persistenceKey?: string
}

export type OptionsType<ColumnType extends Record<string, any> = Record<string, any>> = {
  columns: ColumnType[] | undefined
  /** @description 默认宽度，默认120 */
  defaultWidth?: number
  /** @description 拖动最小宽度 默认0 */
  minConstraints?: number
  /** @description 拖动最大宽度 默认无穷 */
  maxConstraints?: number
  /** @description 列状态的配置，可以用来操作列拖拽宽度 */
  columnsState?: ColumnsStateType
  /** @description 开始拖拽时触发 */
  onResizeStart?: (col: ColumnType & { resizableColumns: ColumnType[] }) => void
  /** @description 结束拖拽时触发 */
  onResizeEnd?: (col: ColumnType & { resizableColumns: ColumnType[] }) => void
  /**
   * @description 窗口resize防抖时间（ms）
   * @default 1000 ms
   */
  debounceWaitTime?: number
}
