import React, { useEffect, useMemo } from 'react';
import type { ColumnOriginType, ColumnsStateType } from '..';
import useGetDataIndexColumns from './useGetDataIndexColumns';
import useMemoizedFn from './useMemoizedFn';

type LocalColumnsProp<T> = {
  columnsState?: ColumnsStateType;
  resizableColumns?: T[];
  columns?: T[];
};

function useLocalColumns<T extends ColumnOriginType<T>>({
  columnsState,
  resizableColumns,
  columns,
}: LocalColumnsProp<T>) {
  // 列设置需要每一个column都有dataIndex或key
  const columnsProp = useGetDataIndexColumns(columns);

  // 初始化本地columns
  const initLocalColumns = useMemoizedFn(() => {
    const { persistenceType, persistenceKey } = columnsState || {};

    if (!persistenceKey || !persistenceType) {
      return columnsProp;
    }
    if (typeof window === 'undefined') return columnsProp;

    /** 从持久化中读取数据 */
    const storage = window[persistenceType];

    try {
      const localResizableColumns = JSON.parse(storage?.getItem(persistenceKey) || '{}')?.resizableColumns;
      const c = columnsProp?.map((col, i) => ({
        ...col,
        width:
          (localResizableColumns as T[])?.find((item, j) => {
            if (item.dataIndex && col.dataIndex && item.dataIndex === col.dataIndex) {
              return true;
            }
            if (item.key && col.key && item.key === col.key) {
              return true;
            }
            if (i === j && !col.dataIndex && !col.key) {
              return true;
            }
            return false;
          })?.width || col.width,
      }));
      return c;
    } catch (error) {
      console.error(error);
    }
  });

  const [localColumns, setLocalColumns] = React.useState<T[] | undefined>(initLocalColumns);

  useEffect(() => {
    if (!localColumns?.length) {
      setLocalColumns(columnsProp);
    } else {
      setLocalColumns(initLocalColumns());
    }
  }, [columnsProp]);

  /**
   * 把resizableColumns存储在本地
   */
  React.useEffect(() => {
    const { persistenceType, persistenceKey } = columnsState || {};

    if (!persistenceKey || !persistenceType || !resizableColumns) {
      return;
    }
    if (typeof window === 'undefined') return;
    /** 给持久化中设置数据 */
    const storage = window[persistenceType];
    try {
      storage.setItem(
        persistenceKey,
        JSON.stringify({
          ...JSON.parse(storage?.getItem(persistenceKey) || '{}'),
          resizableColumns: resizableColumns.map((col) => ({
            dataIndex: col.dataIndex,
            key: col.key,
            title: col.title,
            width: col.width,
          })),
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }, [resizableColumns]);

  /**
   * reset
   */
  const resetColumns = useMemoizedFn(() => {
    setLocalColumns([...(columnsProp || [])]);
  });

  return {
    localColumns: useMemo(() => localColumns, [localColumns]),
    resetColumns,
  };
}

export default useLocalColumns;
