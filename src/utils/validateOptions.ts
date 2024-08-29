import { isColHidden } from '.'
import { type ResizableColumnType } from '../type'
import { logger } from './logger'

function traverseColumnsWidthAll(cols: ResizableColumnType[] | undefined) {
  if (!cols || !cols.length) return false
  return cols.every((col) => {
    if (col.children && col.children.length) {
      return traverseColumnsWidthAll(col.children)
    }
    return !!col.width || isColHidden(col)
  })
}

export function validateColumnsFlex(cols: ResizableColumnType[] | undefined) {
  if (traverseColumnsWidthAll(cols) && process.env.NODE_ENV !== 'production') {
    logger.errorOnce('[use-antd-resizable-header] 请不要在所有列上添加 `width` 属性，这将导致表格无法自适应')
    return false
  }
}
