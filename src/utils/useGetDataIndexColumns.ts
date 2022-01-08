import { useMemo } from 'react';
import { ResizableUniqIdPrefix } from '.';
import { ColumnOriginType } from '..';
import useMemoizedFn from './useMemoizedFn';

export const GETKEY = 'dataIndex';

export function getUniqueId(index: number) {
  return `${ResizableUniqIdPrefix}-${index}`;
}

/*
 ** 如果columns没有dataIndex，则按规则添加一个不重复的dataIndex
 */

function useGetDataIndexColumns<T extends ColumnOriginType<T>>(columns: T[] | undefined) {
  const getColumns = useMemoizedFn((list: T[] | undefined) => {
    const trulyColumns = list;
    const c = trulyColumns?.map((col, index) => {
      return {
        ...col,
        children: col?.children?.length ? getColumns(col.children) : undefined,
        [GETKEY]: col[GETKEY] || col.key || getUniqueId(index),
      };
    });

    return c;
  });

  const dataIndexColumns = useMemo(() => getColumns(columns), [getColumns]) as T[] | undefined;

  return dataIndexColumns || columns;
}

export default useGetDataIndexColumns;
