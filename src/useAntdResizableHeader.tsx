import { useMemo, useReducer, useRef } from 'react'
import { useDebounceFn } from './hooks/useDebounceFn'
import { GETKEY } from './hooks/useGetDataIndexColumns'
import { useIsomorphicLayoutEffect } from './hooks/useIsomorphicLayoutEffect'
import { useLatest } from './hooks/useLatest'
import { useLocalColumns } from './hooks/useLocalColumns'
import { useMemoizedFn } from './hooks/useMemoizedFn'
import { useSafeState } from './hooks/useSafeState'
import { useUpdateEffect } from './hooks/useUpdateEffect'
import ResizableHeader from './ResizableHeader'
import { type CacheType, type OptionsType, type ResizableColumnType } from './type'
import { depthFirstSearchWidthSet, isColHidden, isEmpty, isString, isUndefined } from './utils'
import { DefaultWidth } from './utils/constant'
import { validateColumns } from './utils/validateOptions'

function useAntdResizableHeader<ColumnType extends ResizableColumnType = ResizableColumnType>(
  props: OptionsType<ColumnType>,
) {
  const {
    columns: columnsProp,
    defaultWidth = DefaultWidth,
    minConstraints = defaultWidth / 2,
    maxConstraints = Number.POSITIVE_INFINITY,
    columnsState,
    onResizeStart: onResizeStartProp,
    onResizeEnd: onResizeEndProp,
    debounceWaitTime = 1000,
  } = props

  validateColumns(columnsProp)

  // cache for avoid column's width reset after re-render
  const widthCache = useRef<Map<string | number, CacheType>>(new Map())

  const [resizableColumns, setResizableColumns] = useSafeState<ColumnType[]>(columnsProp || [])

  const latestColumns = useLatest(resizableColumns)

  const { localColumns, resetLocalColumns } = useLocalColumns({
    columnsState,
    columns: columnsProp,
    resizableColumns,
  })

  const [tableWidth, setTableWidth] = useSafeState<number>()

  const [shouldRender, forceRender] = useReducer((s) => s + 1, 0)

  const resetColumns = useMemoizedFn((resetStorage: boolean = true) => {
    widthCache.current.clear()
    resetLocalColumns(resetStorage)
  })

  const _onResizeEnd = useMemoizedFn((id?: string | number) => (width: number) => {
    if (width) {
      const kvMap = new Map<string | number, CacheType>()
      setResizableColumns((t) => {
        const nextColumns = depthFirstSearchWidthSet(
          t as ColumnType[],
          (col) => col[GETKEY] === id && !!col.width && !isColHidden(col),
          width,
        )
        function dig(cols: ColumnType[]) {
          for (let i = 0; i < cols.length; i++) {
            const col = cols[i]
            if (isColHidden(col)) continue
            const key = col[GETKEY]
            kvMap.set(String(key) ?? '', { width: col?.width, index: i })

            if (col?.children) {
              dig(col.children)
            }
          }
        }
        dig(nextColumns)
        widthCache.current = kvMap
        return nextColumns
      })
    }
  })

  const onResizeStart = useMemoizedFn((col: ColumnType) => (width: number) => {
    onResizeStartProp?.({
      ...col,
      width,
      resizableColumns: latestColumns.current,
    })
  })

  const onResizeEnd = useMemoizedFn((col: ColumnType) => (width: number) => {
    onResizeEndProp?.({
      ...col,
      width,
      resizableColumns: latestColumns.current,
    })
    forceRender()
  })

  const getColumns = useMemoizedFn((list: ColumnType[]) => {
    const trulyColumns = list?.filter((item) => !isEmpty(item))

    const c = trulyColumns.map((col) => {
      return {
        ...col,
        children: col?.children?.length ? getColumns(col.children) : undefined,
        onHeaderCell: (column: ColumnType) => {
          return {
            ...col.onHeaderCell?.(column),
            'data-index': column.dataIndex,
            'title': isString(column?.title) ? column?.title : '',
            'width': widthCache.current?.get(column[GETKEY] ?? '')?.width || column?.width,
            'resizable': column.resizable,
            '_onResizeEnd': _onResizeEnd(column?.[GETKEY]),
            'onResizeStart': onResizeStart(column),
            'onResizeEnd': onResizeEnd(column),
            'minWidth': column.minConstraints || minConstraints,
            'maxWidth': column.maxConstraints || maxConstraints,
            'hide': isColHidden(column),
            shouldRender,
          }
        },
        // ellipsis为true时，表格布局将变成 tableLayout="fixed"
        ellipsis: isUndefined(col.ellipsis) ? true : col.ellipsis,
        width: widthCache.current?.get(col[GETKEY] ?? '')?.width || col?.width,
        [GETKEY]: col[GETKEY] || col.key,
      }
    }) as ColumnType[]

    return c
  })

  useIsomorphicLayoutEffect(() => {
    if (localColumns) {
      const c = getColumns(localColumns)
      setResizableColumns(c)
    }
  }, [localColumns])

  useUpdateEffect(() => {
    const t = getColumns(resizableColumns)
    setResizableColumns(t)
  }, [shouldRender])

  useIsomorphicLayoutEffect(() => {
    let width = 0
    ;(function loop(cls: ColumnType[]) {
      for (let i = 0; i < cls.length; i++) {
        if (cls[i].children) {
          loop(cls[i].children as ColumnType[])
        } else if (!isColHidden(cls[i])) {
          width += Number(cls[i].width) || cls[i].defaultWidth || defaultWidth
        }
      }
    })(resizableColumns)
    setTableWidth(width)
  }, [defaultWidth, resizableColumns])

  const { run: debounceRender } = useDebounceFn(forceRender, {
    wait: debounceWaitTime,
  })

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('resize', debounceRender)
    return () => {
      window.removeEventListener('resize', debounceRender)
    }
  }, [])

  const components = useMemo(
    () => ({
      header: {
        cell: ResizableHeader,
      },
    }),
    [],
  )

  return {
    resizableColumns,
    components,
    tableWidth,
    resetColumns,
    refresh: forceRender,
  }
}

export { useAntdResizableHeader }
