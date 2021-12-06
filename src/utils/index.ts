export function depthFirstSearch<T extends Record<string, any> & { children?: T[] }>(
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

export const ResizableUniqIdPrefix = 'resizable-table-id';

export function getUniqueId(index: number) {
  return `${ResizableUniqIdPrefix}${index}`;
}
