import React from 'react';
import { useCallback } from 'react';
import ResizableHeader from './ResizableHeader';
import { option } from './config';
import { useEffect } from 'react';
import useThrottleEffect from './utils/useThrottleEffect';
import useDebounceFn from './utils/useDebounceFn';

function useTableResizableHeader<ColumnType extends Record<string, any>>(
  columns: ColumnType[] | undefined,
  /** @description 最后一列不能拖动，设置最后一列的最小展示宽度 */
  defaultWidth: number = 120,
) {
  const [resizableColumns, setResizableColumns] = React.useState<ColumnType[]>(columns || []);

  const [tableWidth, setTableWidth] = React.useState<number>();

  const [triggerRender, forceRender] = React.useReducer((s) => s + 1, 0);

  const onMount = useCallback(
    (index: number) => (width: number) => {
      if (width) {
        setResizableColumns((t) => {
          const nextColumns = [...t];
          nextColumns[index] = {
            ...nextColumns[index],
            width,
          };
          return nextColumns;
        });
      }
    },
    [],
  );

  const onResize = onMount;

  const getColumns = React.useCallback(
    (list: ColumnType[]) => {
      const t = list?.map((col, index) => {
        const isLast = index === list.length - 1;
        return {
          ...col,
          onHeaderCell: (column: ColumnType) => {
            return {
              titleTip: column.titleTip,
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              onMount: onMount(index),
              onResize: onResize(index),
              triggerRender,
              isLast,
            };
          },
          width: isLast && !col.fixed ? undefined : col.width,
        };
      }) as ColumnType[];
      return t;
    },
    [onMount, onResize],
  );

  useEffect(() => {
    if (columns) {
      const c = getColumns(columns);
      setResizableColumns(c);
    }
  }, [columns]);

  useThrottleEffect(
    () => {
      const t = getColumns(resizableColumns);
      setResizableColumns(t);
    },
    [triggerRender],
    option,
  );

  useEffect(() => {
    const width = resizableColumns?.reduce((total, current) => {
      return total + (Number(current.width) || columns?.[columns.length - 1].width || defaultWidth);
    }, 0);
    setTableWidth(width);
  }, [resizableColumns]);

  const { run: debounceRender } = useDebounceFn(forceRender);

  React.useEffect(() => {
    window.addEventListener('resize', debounceRender);
    return () => {
      window.removeEventListener('resize', debounceRender);
    };
  }, []);

  const components = React.useMemo(() => {
    return {
      header: {
        cell: ResizableHeader,
      },
    };
  }, [ResizableHeader]);

  return {
    resizableColumns,
    components,
    tableWidth,
  };
}

export default useTableResizableHeader;
