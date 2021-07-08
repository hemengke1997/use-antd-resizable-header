import React from 'react';
import ResizableHeader from './ResizableHeader';
import useFunction from './utils/useFunction';

function useTableResizableHeader<ColumnType extends Record<string, any>>(
  columns: ColumnType[] | undefined,
  defaultWidth: number = 120,
) {
  const [resizableColumns, setResizableColumns] = React.useState<ColumnType[]>([]);

  const [tableWidth, setTableWidth] = React.useState<number>();

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
        width: column.width,
        onResize: onResize(index),
      }),
    })) as ColumnType[];
    setResizableColumns(t);
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
