# use-antd-resizable-header

> antd 表格头拖拽 Hook，兼容 Table ProTable

## 预览

![preview](./image/preview.gif)

## 安装

```bash
yarn add use-antd-resizable-header
```

## 注意事项

- **columns 为常量时，提到组件外，或使用 `React.useMemo`, `React.Ref` 包裹常量**
- **最后一列不能拖动，[请保持最后一列的自适应](https://ant-design.gitee.io/components/table-cn/#components-table-demo-fixed-columns)，若最后一列传入宽度，会把传入的宽度作为最小宽度（默认 120）**

## Example

```tsx
import useATRH from 'use-antd-resizable-header';
import 'use-antd-resizable-header/dist/style.css';

const columns = [];

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

## TODO

[ ] Header Title 提示

## MIT

[LICENSE](https://github.com/hemengke1997/useATRH/blob/master/LICENSE)
