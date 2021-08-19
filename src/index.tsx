import React, { useCallback, useEffect } from 'react';
import ResizableHeader from './ResizableHeader';
import { option } from './config';
import useThrottleEffect from './utils/useThrottleEffect';
import useDebounceFn from './utils/useDebounceFn';
import isEmpty from 'lodash.isempty';

type useTableResizableHeaderProps<ColumnType> = {
  columns: ColumnType[] | undefined;
  /** @description 最后一列不能拖动，设置最后一列的最小展示宽度，默认120 */
  defaultWidth?: number;
  /** @description 拖动最小宽度 默认120 */
  minConstraints?: number;
  /** @description 拖动最大宽度 默认无穷 */
  maxConstraints?: number;
};

const WIDTH = 120;

function useTableResizableHeader<ColumnType extends Record<string, any>>(
  props: useTableResizableHeaderProps<ColumnType>,
) {
  const {
    columns,
    defaultWidth = WIDTH,
    minConstraints = WIDTH,
    maxConstraints = Infinity,
  } = props;

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
      const t = list
        ?.filter((item) => !isEmpty(item))
        .map((col, index) => {
          const isLast = index === list.length - 1;
          return {
            ...col,
            onHeaderCell: (column: ColumnType) => {
              return {
                titleTip: column?.titleTip,
                width: column?.width,
                onMount: onMount(index),
                onResize: onResize(index),
                minWidth: minConstraints,
                maxWidth: maxConstraints,
                triggerRender,
                isLast,
              };
            },
            width: isLast && !col?.fixed ? undefined : col?.width,
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
