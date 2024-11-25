import { memo, type ThHTMLAttributes, useEffect, useRef } from 'react'
import { Resizable, type ResizeCallbackData } from 'react-resizable'
import { useMemoizedFn } from './hooks/useMemoizedFn'
import { useSafeState } from './hooks/useSafeState'
import { type ResizableColumnType } from './type'
import { isNumber, isString } from './utils'
import { clsx } from './utils/clsx'
import { NameSpace } from './utils/constant'

type InternalOnResizeEntType = (
  width: number,
  extraProps?: {
    overflow?: boolean
  },
) => void

type ComponentProp = {
  _onResizeEnd: InternalOnResizeEntType
  onResizeStart?: (width: number) => void
  onResizeEnd?: (width: number) => void
  shouldRender: number
  width: number
  minWidth: number
  maxWidth: number
  onColChange?: (width: number) => void
} & ResizableColumnType &
  ThHTMLAttributes<HTMLTableCellElement>

function resolveThWidthByColgroup(thElement: HTMLTableCellElement) {
  const tableElement = thElement.closest('table')

  if (tableElement) {
    const colgroup = tableElement.querySelector('colgroup')
    const cols = colgroup?.querySelectorAll('col')

    const rows = tableElement.querySelector('thead')?.rows || []
    const cellPositions: HTMLTableCellElement[][] = []

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells
      let colIndex = 0

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j]
        const rowspan = cell.rowSpan || 1
        const colspan = cell.colSpan || 1
        while (cellPositions[i] && cellPositions[i][colIndex]) {
          colIndex++
        }
        for (let r = 0; r < rowspan; r++) {
          for (let c = 0; c < colspan; c++) {
            if (!cellPositions[i + r]) {
              cellPositions[i + r] = []
            }
            cellPositions[i + r][colIndex + c] = cell
          }
        }
        colIndex += colspan
      }
    }

    const cells = cellPositions[cellPositions.length - 1]
    const colindex = cells.indexOf(thElement)

    // let w = 0
    // cols?.forEach((col) => {
    //   w += col.clientWidth
    // })
    // w && onColChange?.(w)

    if (colindex !== -1) {
      const colWidth = cols?.[colindex]?.clientWidth
      if (isNumber(colWidth)) {
        return colWidth
      }
    }
  }
}

function ResizableHeader(props: ComponentProp) {
  const {
    width,
    minWidth,
    maxWidth,
    resizable,
    hide,
    _onResizeEnd,
    onResizeStart,
    onResizeEnd,
    onColChange,
    shouldRender,
    className,
    style,
    onClick,
    children,
    rowSpan,
    colSpan,
    title,
    scope,
    ...rest
  } = props

  const [resizeWidth, setResizeWidth] = useSafeState<number>(0)
  const [colWidth, setColWidth] = useSafeState<number>(0)

  const thRef = useRef<HTMLTableCellElement>(null)

  const onColWidthChanged = useMemoizedFn((callback?: (width: number) => void) => {
    const fn = () => {
      if (thRef.current) {
        const colWidth = resolveThWidthByColgroup(thRef.current)
        if (colWidth) {
          setColWidth(colWidth)
          setResizeWidth(colWidth)
          callback?.(colWidth)
        }
      }
    }
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        fn()
      })
    } else {
      setTimeout(() => {
        fn()
      }, 1)
    }
  })

  useEffect(() => {
    if (width) {
      onColWidthChanged()
    }
  }, [width, shouldRender])

  if (hide) {
    return null
  }

  if (!width || Number.isNaN(Number(width)) || resizable === false) {
    return (
      <th
        {...rest}
        data-resizable-col='false'
        style={style}
        className={className}
        onClick={onClick}
        rowSpan={rowSpan}
        colSpan={colSpan}
        ref={thRef}
      >
        <span title={title}>{children}</span>
      </th>
    )
  }

  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : ''
    document.body.style.pointerEvents = active ? 'none' : ''
    document.documentElement.style.cursor = active ? 'col-resize' : ''
  }

  const onStart = ({}, data: ResizeCallbackData) => {
    if (resizeWidth >= maxWidth || resizeWidth <= minWidth) return

    setResizeWidth(data.size.width)
    onResizeStart?.(data.size.width)
  }

  const onSelfResize = ({}, data: ResizeCallbackData) => {
    setBodyStyle(true)
    setResizeWidth(data.size.width)
  }

  const onStop = () => {
    setBodyStyle(false)

    if (resizeWidth <= 0) return

    let w = resizeWidth
    if (w >= maxWidth) {
      w = maxWidth > width ? maxWidth : width
    } else if (w <= minWidth) {
      w = minWidth < width ? minWidth : width
    }

    _onResizeEnd(w)
    onResizeEnd?.(w)
    onColWidthChanged()
  }

  const isSimpleChildren = () => {
    if (Array.isArray(children)) {
      const lastChild = children[children.length - 1]
      if (lastChild) {
        return isString(lastChild) || lastChild.props?.ellipsis || isString(lastChild.props?.label)
      }
    }
    return false
  }

  return (
    <th
      ref={thRef}
      scope={scope}
      className={clsx(NameSpace.CSS, className)}
      style={{
        ...style,
        overflow: 'unset',
      }}
      data-resizable-col='true'
      onClick={onClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      <Resizable
        className={`${NameSpace.CSS}__content`}
        width={resizeWidth}
        minConstraints={[Math.min(minWidth, colWidth), 0]}
        maxConstraints={[Math.max(maxWidth, colWidth), 0]}
        height={0}
        handle={
          <div
            className={`${NameSpace.CSS}__handler`}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className={`${NameSpace.CSS}__handler__line`} />
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResizeStart={onStart}
        onResize={onSelfResize}
        onResizeStop={onStop}
      >
        <div style={{ width: resizeWidth, height: '100%' }} />
      </Resizable>
      <div {...rest} className={`${NameSpace.CSS}__title${isSimpleChildren() ? '--ellipsis' : ''}`}>
        {children}
      </div>
    </th>
  )
}

export default memo(ResizableHeader)
