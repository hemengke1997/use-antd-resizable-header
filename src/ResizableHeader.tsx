import React, { type FC, type ThHTMLAttributes, memo, useEffect } from 'react'
import { Resizable, type ResizeCallbackData } from 'react-resizable'
import { type OptionsType, type UARHColumnType } from './useAntdResizableHeader'
import { isString } from './utils'
import { useOverflowDetector } from './utils/useOverflowDetector'
import { useSafeState } from './utils/useSafeState'
import './index.css'

type OnMountType = (
  width: number,
  extraProps?: {
    overflow?: boolean
  },
) => void

type ComponentProp = {
  onMount: OnMountType
  onResize: OnMountType
  onResizeStart?: (width: number) => void
  onResizeEnd?: (width: number) => void
  triggerRender: number
  width: number
  minWidth: number
  maxWidth: number
  tooltipRender?: OptionsType['tooltipRender']
} & UARHColumnType &
  ThHTMLAttributes<HTMLTableCellElement>

const ResizableHeader: FC<ComponentProp> = (props) => {
  const {
    width,
    minWidth,
    maxWidth,
    resizable,
    hideInTable,
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
    scope,
    tooltipRender,
    ...rest
  } = props

  const [resizeWidth, setResizeWidth] = useSafeState<number>(0)

  const { overflow, ref } = useOverflowDetector({})

  useEffect(() => {
    if (width) {
      setResizeWidth(width)
      onMount?.(width, { overflow })
    }
  }, [triggerRender])

  useEffect(() => {
    if (width) {
      setResizeWidth(width)
    }
  }, [setResizeWidth, width])

  if (hideInTable) {
    return null
  }

  if (!width || Number.isNaN(Number(width)) || resizable === false) {
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
    onResize(resizeWidth, {
      overflow,
    })
    setBodyStyle(false)
    onResizeEnd?.(resizeWidth)
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

  const content = (
    <div
      {...rest}
      ref={tooltipRender ? (ref as any) : null}
      className={`resizable-title${isSimpleChildren() ? ' ellipsis' : ''}`}
      children={children}
    ></div>
  )

  return (
    <th
      scope={scope}
      className={`resizable-container ${className}`}
      style={{
        ...style,
        overflow: 'unset',
      }}
      data-uarh-enable='true'
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
      {tooltipRender
        ? tooltipRender({
            children: content,
            open: overflow ? undefined : false,
            title: children,
          })
        : content}
    </th>
  )
}

export default memo(ResizableHeader)
