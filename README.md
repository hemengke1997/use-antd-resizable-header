# use-antd-resizable-header

> antd 表格头拖拽 Hook，兼容 Table ProTable

## 安装

```bash
yarn add use-antd-resizable-header
```

## Example

## 注意事项

- **columns为常量时，提到组件外，或使用 `React.useMemo`, `React.Ref` 包裹常量**

```tsx
import useATRH from 'use-antd-resizable-header';
import 'use-antd-resizable-header/dist/style.css';

const columns = []

function App() {
  const { components, resizableColumns, tableWidth } = useATRH(columns);

  return (
    <>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      ></Table>
      <ProTable
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      ></ProTable>;
    </>
  );
}
```

## MIT

[LICENSE](https://github.com/hemengke1997/useATRH/blob/master/LICENSE)
