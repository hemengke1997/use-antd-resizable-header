import React, { useCallback, useEffect } from 'react';
import ResizableHeader from './ResizableHeader';
import { option } from './config';
import isEmpty from 'lodash.isempty';
import useThrottleEffect from './utils/useThrottleEffect';
import useDebounceFn from './utils/useDebounceFn';
import { depthFirstSearch, getUniqueId } from './utils';

type useTableResizableHeaderProps<ColumnType> = {
  columns: ColumnType[] | undefined;
  /** @description 最后一列不能拖动，设置最后一列的最小展示宽度，默认120 */
  defaultWidth?: number;
  /** @description 拖动最小宽度 默认120 */
  minConstraints?: number;
  /** @description 拖动最大宽度 默认无穷 */
  maxConstraints?: number;
};

type CacheType = { width: number; index: number };

const WIDTH = 120;

const getKey = 'dataIndex';

function useTableResizableHeader<ColumnType extends Record<string, any>>(
  props: useTableResizableHeaderProps<ColumnType>,
) {
  const {
    columns,
    defaultWidth = WIDTH,
    minConstraints = WIDTH,
    maxConstraints = Infinity,
  } = props;

  // column的宽度缓存，避免render导致columns宽度重置
  // add column width cache to avoid column's width reset after render
  const widthCache = React.useRef<Map<React.Key, CacheType>>(new Map());

  const [resizableColumns, setResizableColumns] = React.useState<ColumnType[]>(columns || []);

  const [tableWidth, setTableWidth] = React.useState<number>();

  const [triggerRender, forceRender] = React.useReducer((s) => s + 1, 0);

  const onMount = useCallback(
    (id: string) => (width: number) => {
      if (width) {
        setResizableColumns((t) => {
          const nextColumns = depthFirstSearch(t, (col) => col[getKey] === id, width);

          const kvMap = new Map<React.Key, CacheType>();

          function dig(cols: ColumnType[]) {
            cols.forEach((col, i) => {
              const key = col[getKey];
              kvMap.set(key, { width: col?.width, index: i });
              if (col?.children) {
                dig(col.children);
              }
            });
          }

          dig(nextColumns);

          widthCache.current = kvMap;

          return nextColumns;
        });
      }
    },
    [widthCache.current, resizableColumns],
  );

  const onResize = onMount;

  const getColumns = React.useCallback(
    (list: ColumnType[]) => {
      const c = list
        ?.filter((item) => !isEmpty(item))
        .map((col, index) => {
          return {
            ...col,
            children: col?.children?.length ? getColumns(col.children) : undefined,
            onHeaderCell: (column: ColumnType) => {
              return {
                title: typeof col?.title === 'string' ? col?.title : '',
                width: widthCache.current?.get(column[getKey])?.width || column?.width,
                onMount: onMount(column?.[getKey]),
                onResize: onResize(column?.[getKey]),
                minWidth: minConstraints,
                maxWidth: maxConstraints,
                triggerRender,
              };
            },
            width: widthCache.current?.get(col[getKey])?.width || col?.width,
            ellipsis: typeof col.ellipsis !== 'undefined' ? col.ellipsis : true,
            [getKey]: col[getKey] || col['key'] || getUniqueId(index),
          };
        }) as ColumnType[];
      return c;
    },
    [onMount, onResize, widthCache.current],
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
    let width = 0;

    (function loop(cls: ColumnType[]) {
      for (let i = 0; i < cls.length; i++) {
        width += Number(cls[i].width) || columns?.[columns.length - 1].width || defaultWidth;
        if (cls[i].children) {
          loop(cls[i].children);
        }
      }
    })(resizableColumns);

    setTableWidth(width);
  }, [resizableColumns]);

  const { run: debounceRender } = useDebounceFn(forceRender);

  useEffect(() => {
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
