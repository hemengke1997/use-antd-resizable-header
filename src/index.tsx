import React from 'react';
import ResizableHeader from './ResizableHeader';
import type { ProColumns } from '@ant-design/pro-table';
import usePersistFn from 'ahooks/es/usePersistFn';

function useTableResizableHeader<T = any>(
  columns: ProColumns<T>[] | undefined,
  defaultWidth: number = 120,
) {
  const [resizableColumns, setResizableColumns] = React.useState<ProColumns<T>[]>([]);

  const [tableWidth, setTableWidth] = React.useState<number>();

  const onResize = usePersistFn((index: number) => (width: number) => {
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
      onHeaderCell: (column: ProColumns) => ({
        width: column.width,
        onResize: onResize(index),
      }),
    })) as ProColumns[];
    setResizableColumns(t);
  }, []);

  // 设置表格宽度
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
