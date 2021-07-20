import React from 'react';
import ResizableHeader from './ResizableHeader';

function useTableResizableHeader<ColumnType extends Record<string, any>>(
  columns: ColumnType[] | undefined,
  /** @description 最后一列不能拖动，设置最后一列的最小展示宽度 */
  defaultWidth: number = 120,
) {
  const [resizableColumns, setResizableColumns] = React.useState<ColumnType[]>([]);

  const [tableWidth, setTableWidth] = React.useState<number>();

  const [triggerMount, forceRender] = React.useReducer((s) => s + 1, 0);

  const onMount = React.useCallback(
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

  React.useLayoutEffect(() => {
    forceRender();
  }, [columns]);

  React.useLayoutEffect(() => {
    const t = columns?.map((col, index) => {
      const isLast = index === columns.length - 1;
      return {
        ...col,
        onHeaderCell: (column: ColumnType) => {
          return {
            width: column.width,
            onMount: onMount(index),
            onResize: onResize(index),
            triggerMount,
            isLast,
          };
        },
        width: isLast && !col.fixed ? undefined : col.width,
      };
    }) as ColumnType[];
    setResizableColumns(t);
  }, [triggerMount]);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', forceRender);
    return () => {
      window.removeEventListener('resize', forceRender);
    };
  }, []);

  React.useLayoutEffect(() => {
    const width = resizableColumns?.reduce((total, current) => {
      return total + (Number(current.width) || columns?.[columns.length - 1].width || defaultWidth);
    }, 0);
    setTableWidth(width);
  }, [resizableColumns]);

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
