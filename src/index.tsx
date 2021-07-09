import React from 'react';
import ResizableHeader from './ResizableHeader';
import useFunction from './utils/useFunction';

function useTableResizableHeader<ColumnType extends Record<string, any>>(
  columns: ColumnType[] | undefined,
  defaultWidth: number = 120,
  throttleWait?: number,
) {
  const [resizableColumns, setResizableColumns] = React.useState<ColumnType[]>([]);

  const [tableWidth, setTableWidth] = React.useState<number>();

  const [triggerMount, forceRender] = React.useReducer((s) => s + 1, 0);

  const onResize = useFunction((index: number) => (width: number) => {
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
  });

  React.useEffect(() => {
    const t = columns?.map((col, index) => ({
      ...col,
      onHeaderCell: (column: ColumnType) => ({
        throttleWait,
        width: column.width,
        onMount: onResize(index),
        onResize: onResize(index),
        triggerMount,
      }),
    })) as ColumnType[];
    setResizableColumns(t);
  }, [columns, triggerMount]);

  React.useEffect(() => {
    window.addEventListener('resize', forceRender);
    return () => {
      window.removeEventListener('resize', forceRender);
    };
  }, []);

  React.useEffect(() => {
    const width = resizableColumns.reduce((total, current) => {
      return total + (Number(current.width) || defaultWidth);
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
