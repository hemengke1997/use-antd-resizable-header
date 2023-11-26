import { type UARHColumnType } from '../useAntdResizableHeader'
import { logger } from './logger'

function traverseColumnsWidthAll(cols: UARHColumnType[] | undefined) {
  if (!cols || !cols.length) return false
  return cols.every((col) => {
    if (col.children && col.children.length) {
      return false
    }
    return !!col.width
  })
}

export function validateColumnsFlex(cols: UARHColumnType[] | undefined) {
  if (traverseColumnsWidthAll(cols) && process.env.NODE_ENV !== 'production') {
    logger.errorOnce('[use-antd-resizable-header] 请不要在所有列上添加 `width` 属性，这将导致表格无法自适应')
  }
}
