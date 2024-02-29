import React, {
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import ResizableHeader from "./ResizableHeader";
import { depthFirstSearch, isEmpty } from "./utils";
import { useDebounceFn } from "./utils/useDebounceFn";
import { GETKEY } from "./utils/useGetDataIndexColumns";
import { useIsomorphicLayoutEffect } from "./utils/useIsomorphicLayoutEffect";
import { useLatest } from "./utils/useLatest";
import { useLocalColumns } from "./utils/useLocalColumns";
import { useMemoizedFn } from "./utils/useMemoizedFn";
import { useSafeState } from "./utils/useSafeState";
import { useUpdateThrottleEffect } from "./utils/useUpdateThrottleEffect";
import { validateColumnsFlex } from "./utils/validateOptions";

export interface ColumnsStateType {
  /**
   * 持久化的类型，支持 localStorage 和 sessionStorage
   *
   * @param localStorage 设置在关闭浏览器后也是存在的
   * @param sessionStorage 关闭浏览器后会丢失
   */
  persistenceType?: "localStorage" | "sessionStorage";
  /** 持久化的key，用于存储到 storage 中 */
  persistenceKey?: string;
}

export interface OptionsType<
  ColumnsType extends Record<string, any> = Record<string, any>,
> {
  columns: ColumnsType[] | undefined;
  /** @description 最后一列不能拖动，设置最后一列的最小展示宽度，默认120 */
  defaultWidth?: number;
  /** @description 拖动最小宽度 默认0 */
  minConstraints?: number;
  /** @description 拖动最大宽度 默认无穷 */
  maxConstraints?: number;
  /** @description 是否缓存宽度 */
  cache?: boolean;
  /** @description 列状态的配置，可以用来操作列拖拽宽度 */
  columnsState?: ColumnsStateType;
  /** @description 开始拖拽时触发 */
  onResizeStart?: (
    col: ColumnsType & { resizableColumns: ColumnsType[] }
  ) => void;
  /** @description 结束拖拽时触发 */
  onResizeEnd?: (
    col: ColumnsType & { resizableColumns: ColumnsType[] }
  ) => void;
  /**
   * headerCell的tooltip
   * @example
   * ```tsx
   * tooltipRender={(props) => <Tooltip {...props} />)
   * ```
   */
  tooltipRender?: <T extends PropsWithChildren>(props: T) => ReactNode;
  dragRender?: ReactNode;
}

type WidthType = number | string;

type ExtendsInternalColumnType<T> = {
  width?: WidthType;
  resizable?: boolean;
} & T;

export type UARHColumnType<
  T extends Record<string, any> = Record<string, any>,
> = ExtendsInternalColumnType<T>;

interface CacheType {
  width?: WidthType;
  index: number;
}

const WIDTH = 120;

function useAntdResizableHeader<
  ColumnsType extends UARHColumnType = UARHColumnType,
>(props: OptionsType<ColumnsType>) {
  const {
    columns: columnsProp,
    defaultWidth = WIDTH,
    minConstraints = defaultWidth / 2,
    maxConstraints = Number.POSITIVE_INFINITY,
    cache = true,
    columnsState,
    onResizeStart: onResizeStartProp,
    onResizeEnd: onResizeEndProp,
    tooltipRender,
    dragRender,
  } = props;

  validateColumnsFlex(columnsProp);

  // add column width cache to avoid column's width reset after render
  const widthCache = useRef<Map<string | number, CacheType>>(new Map());

  const [resizableColumns, setResizableColumns] = useSafeState<ColumnsType[]>(
    columnsProp || []
  ); // keep all default vlaue (e.g. defaultFilterValue)

  const latestColumns = useLatest(resizableColumns);

  const { localColumns, resetLocalColumns } = useLocalColumns({
    columnsState,
    columns: columnsProp,
    resizableColumns,
  });

  const [tableWidth, setTableWidth] = useSafeState<number>();

  const [triggerRender, forceRender] = useReducer((s) => s + 1, 0);

  let kvMap: Map<string | number, CacheType>;

  const resetColumns = useMemoizedFn(() => {
    kvMap = new Map();
    widthCache.current = kvMap;
    resetLocalColumns();
  });

  const onMount = useCallback(
    (id?: string | number) => (width: number) => {
      if (width) {
        setResizableColumns((t) => {
          const nextColumns = depthFirstSearch(
            t as ColumnsType[],
            (col) => col[GETKEY] === id && !!col.width && !col.hideInTable,
            width
          );
          kvMap = kvMap || new Map<string | number, CacheType>();
          function dig(cols: ColumnsType[]) {
            for (let i = 0; i < cols.length; i++) {
              const col = cols[i];
              if (col.hideInTable) continue;
              const key = col[GETKEY];
              kvMap.set(String(key) ?? "", { width: col?.width, index: i });
              if (col?.children) {
                dig(col.children);
              }
            }
          }
          dig(nextColumns);
          widthCache.current = kvMap;

          return nextColumns;
        });
      }
    },
    []
  );

  const onResize = useMemo(() => onMount, [onMount]);

  const onResizeStart = (col: ColumnsType) => (width: number) => {
    onResizeStartProp?.({
      ...col,
      width,
      resizableColumns: latestColumns.current,
    });
  };

  const onResizeEnd = (col: ColumnsType) => (width: number) => {
    onResizeEndProp?.({
      ...col,
      width,
      resizableColumns: latestColumns.current,
    });
  };

  const getColumns = useMemoizedFn((list: ColumnsType[]) => {
    const trulyColumns = list?.filter((item) => !isEmpty(item));

    const c = trulyColumns.map((col) => {
      return {
        ...col,
        children: col?.children?.length ? getColumns(col.children) : undefined,
        onHeaderCell: (column: ColumnsType) => {
          return {
            ...col.onHeaderCell?.(column),
            "data-index": column.dataIndex,
            title: typeof col?.title === "string" ? col?.title : "",
            width: cache
              ? widthCache.current?.get(column[GETKEY] ?? "")?.width ||
                column?.width
              : column?.width,
            resizable: column.resizable,
            onMount: onMount(column?.[GETKEY]),
            onResize: onResize(column?.[GETKEY]),
            onResizeStart: onResizeStart(column),
            onResizeEnd: onResizeEnd(column),
            minWidth: minConstraints,
            maxWidth: maxConstraints,
            hideInTable: column.hideInTable,
            tooltipRender,
            triggerRender,
          };
        },
        width: cache
          ? widthCache.current?.get(col[GETKEY] ?? "")?.width || col?.width
          : col?.width,
        [GETKEY]: col[GETKEY] || col.key,
      };
    }) as ColumnsType[];

    return c;
  });

  useIsomorphicLayoutEffect(() => {
    if (localColumns) {
      const c = getColumns(localColumns);
      setResizableColumns(c);
    }
  }, [localColumns]);

  useUpdateThrottleEffect(
    () => {
      const t = getColumns(resizableColumns);
      setResizableColumns(t);
    },
    [triggerRender],
    {
      wait: 500,
    }
  );

  useIsomorphicLayoutEffect(() => {
    let width = 0;
    (function loop(cls: ColumnsType[]) {
      for (let i = 0; i < cls.length; i++) {
        if (cls[i].children) {
          loop(cls[i].children as ColumnsType[]);
        } else if (!cls[i].hideInTable) {
          width += Number(cls[i].width) || defaultWidth;
        }
      }
    })(resizableColumns);
    setTableWidth(width);
  }, [defaultWidth, resizableColumns]);

  const { run: debounceRender } = useDebounceFn(forceRender);

  useEffect(() => {
    window.addEventListener("resize", debounceRender);
    return () => {
      window.removeEventListener("resize", debounceRender);
    };
  }, [debounceRender]);
  console.log("ResizableHeader :>> ", ResizableHeader);
  const components = useMemo(() => {
    return {
      header: {
        cell: (props) => <ResizableHeader {...props} dragRender={dragRender} />,
      },
    };
  }, []);

  return {
    resizableColumns,
    components,
    tableWidth,
    resetColumns,
  };
}

export { useAntdResizableHeader };
