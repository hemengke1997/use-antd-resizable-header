# use-antd-resizable-header

> antd 表格头拖拽 Hook，兼容 Table ProTable

## 安装

```bash
yarn add use-antd-resizable-header
```

## Example

```tsx
import useATRH from 'use-antd-resizable-header';
import 'use-antd-resizable-header/dist/style.css';

function App() {
  const { components, resizableColumns, tableWidth } = useATRH(columns);

  return (
    <>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      ></Table>;<ProTable
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
