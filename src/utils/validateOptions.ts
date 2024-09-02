import { isColHidden } from '.'
import { type ResizableColumnType } from '../type'
import { logger } from './logger'

function traverseColumnsWidth(cols: ResizableColumnType[] | undefined) {
  if (!cols || !cols.length) return false
  return cols.every((col) => {
    if (col.children && col.children.length) {
      return traverseColumnsWidth(col.children)
    }
    return !!col.width || isColHidden(col)
  })
}

function validateColumnsFlex(cols: ResizableColumnType[] | undefined) {
  if (traverseColumnsWidth(cols) && process.env.NODE_ENV !== 'production') {
    logger.errorOnce('[use-antd-resizable-header] 请不要在所有列上添加 `width` 属性，这将导致表格无法自适应')
    return false
  }
}

function traverseColumnsDataIndex(
  cols: ResizableColumnType[] | undefined,
  dataIndexMap: Map<string, boolean> = new Map(),
) {
  if (!cols || !cols.length) return false
  return cols.every((col) => {
    if (col.children && col.children.length) {
      return traverseColumnsDataIndex(col.children, dataIndexMap)
    }
    if (col.dataIndex) {
      if (dataIndexMap.has(col.dataIndex)) {
        if (process.env.NODE_ENV !== 'production') {
          logger.errorOnce(
            `[use-antd-resizable-header] dataIndex 重复: ${col.dataIndex}，请确保每个列的 [dataIndex] 唯一`,
          )
        }
        return false
      }
      dataIndexMap.set(col.dataIndex, true)
    }
    return true
  })
}

function validateColumnsDataIndex(cols: ResizableColumnType[] | undefined) {
  traverseColumnsDataIndex(cols, new Map())
}

export function validateColumns(cols: ResizableColumnType[] | undefined) {
  validateColumnsFlex(cols)
  validateColumnsDataIndex(cols)
}
