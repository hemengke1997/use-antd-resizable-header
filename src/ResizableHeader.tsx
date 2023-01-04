import type { ThHTMLAttributes } from 'react'
import React from 'react'
import type { ResizeCallbackData } from 'react-resizable'
import { Resizable } from 'react-resizable'
import { useSafeState } from './utils/useSafeState'

import './index.css'

type ComponentProp = {
  onResize: (width: number) => void
  onMount: (width: number) => void
  onResizeStart?: (width: number) => void
  onResizeEnd?: (width: number) => void
  triggerRender: number
  width: number
  minWidth: number
  maxWidth: number
} & ThHTMLAttributes<HTMLTableCellElement>

const ResizableHeader: React.FC<ComponentProp> = (props) => {
  const {
    width,
    minWidth,
    maxWidth,
    onResize,
    onResizeStart,
    onResizeEnd,
    onMount,
    triggerRender,
    className,
    style,
    onClick,
    children,
    rowSpan,
    colSpan,
    title,
    ...rest
  } = props

  const thRef = React.useRef<HTMLTableCellElement>(null)

  const [resizeWidth, setResizeWidth] = useSafeState<number>(0)

  React.useEffect(() => {
    if (width) {
      setResizeWidth(width)
      onMount?.(width)
    }
  }, [triggerRender])

  React.useEffect(() => {
    if (width) {
      setResizeWidth(width)
    }
  }, [setResizeWidth, width])

  if (!width || Number.isNaN(Number(width))) {
    return (
      <th
        {...rest}
        data-arh-disable='true'
        style={style}
        className={className}
        onClick={onClick}
        rowSpan={rowSpan}
        colSpan={colSpan}
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
    setResizeWidth(data.size.width)
    setBodyStyle(true)
    onResizeStart?.(data.size.width)
  }

  const onSelfResize = ({}, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width)
  }

  const onStop = () => {
    if (resizeWidth <= 0) return
    onResize(resizeWidth)
    setBodyStyle(false)
    onResizeEnd?.(resizeWidth)
  }

  return (
    <th
      scope='col'
      className={`resizable-container ${className}`}
      style={{
        ...style,
        overflow: 'unset',
      }}
      data-arh-enable='true'
      ref={thRef}
      onClick={onClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      <Resizable
        className='resizable-box'
        width={resizeWidth}
        minConstraints={[minWidth, 0]}
        maxConstraints={[maxWidth, 0]}
        height={0}
        handle={
          <div
            className='resizable-handler'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className='resizable-line' />
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResizeStart={onStart}
        onResize={onSelfResize}
        onResizeStop={onStop}
      >
        <div style={{ width: resizeWidth, height: '100%' }} />
      </Resizable>
      <div {...rest} className='resizable-title'>
        <span title={title}>{children}</span>
      </div>
    </th>
  )
}

// eslint-disable-next-line no-restricted-syntax
export default React.memo(ResizableHeader)
