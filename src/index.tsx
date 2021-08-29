import React, { useCallback, useEffect } from 'react';
import ResizableHeader from './ResizableHeader';
import { option } from './config';
import { useUniqueId } from './utils/useUniqueId';
import isEmpty from 'lodash.isempty';
import useThrottleEffect from './utils/useThrottleEffect';
import useDebounceFn from './utils/useDebounceFn';

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

function depthFirstSearch<T extends Record<string, any> & { children?: T[] }>(
  children: T[],
  condition: (column: T) => boolean,
  width: number,
) {
  const c = [...children];

  (function find(cls: T[] | undefined) {
    if (!cls) return;
    for (let i = 0; i < cls?.length; i++) {
      if (condition(cls[i])) {
        // eslint-disable-next-line no-param-reassign
        cls[i] = {
          ...cls[i],
          width,
        };
        return;
      }
      if (cls[i].children) {
        find(cls[i].children);
      }
    }
  })(c);

  return c;
}

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
  const widthCache = React.useRef<Map<React.Key, CacheType>>(new Map());

  const uniqueId = useUniqueId('resizable-table-id');

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
          const isLast = index === list.length - 1;
          return {
            ...col,
            children: col?.children?.length ? getColumns(col.children) : undefined,
            onHeaderCell: (column: ColumnType) => {
              return {
                titleTip: column?.titleTip,
                width: widthCache.current?.get(column[getKey])?.width || column?.width,
                onMount: onMount(column?.[getKey]),
                onResize: onResize(column?.[getKey]),
                minWidth: minConstraints,
                maxWidth: maxConstraints,
                triggerRender,
                isLast,
              };
            },
            width:
              isLast && !col?.fixed
                ? undefined
                : widthCache.current?.get(col[getKey])?.width || col?.width,
            [getKey]: col[getKey] || uniqueId,
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
    const width = resizableColumns?.reduce((total, current) => {
      return total + (Number(current.width) || columns?.[columns.length - 1].width || defaultWidth);
    }, 0);
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
