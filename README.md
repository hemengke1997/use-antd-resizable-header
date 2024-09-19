# use-antd-resizable-header

> antd 表格头拖拽 Hook，兼容 Table ProTable

## 预览

![preview](./screenshots/new_preview.gif)

## 在线地址

[Demo](https://hemengke1997.github.io/use-antd-resizable-header/)

[Stackblitz](https://stackblitz.com/edit/use-antd-resizable-header-demo?file=src%2FApp.tsx)

## 安装

```sh
npm i use-antd-resizable-header
```

## 升级最新版本注意事项

[CHANGELOG](./docs/3.md)

## API

### Properties

| Name             | Type                  | Default   | Description                                      |
| ---------------- | --------------------- | --------- | ------------------------------------------------ |
| columns          | ResizableColumnType[] | undefined | antd table 的 columns                            |
| defaultWidth     | number                | 120       | 某一列不能拖动，设置该列的最小展示宽度，默认 120 |
| minConstraints   | number                | 60        | 拖动最小宽度 默认 defaultWidth/2                 |
| maxConstraints   | number                | Infinity  | 拖动最大宽度 默认无穷                            |
| columnsState     | ColumnsStateType      | undefined | 列状态的配置，可以用来操作列拖拽宽度             |
| onResizeStart    | Function              | undefined | 开始拖拽时触发                                   |
| onResizeEnd      | Function              | undefined | 结束拖拽时触发                                   |
| debounceWaitTime | number                | 1000      | 窗口resize时重新渲染的防抖时间，单位 ms          |

### Return

| Name             | Description                             |
| ---------------- | --------------------------------------- |
| resizableColumns | 拖拽 columns，用在 Table columns        |
| components       | 拖拽 components， 用在 Table components |
| tableWidth       | 表格宽度，用在 Table width              |
| resetColumns     | 重置                                    |
| refresh          | 刷新组件                                |

## 注意事项

- **默认拖动颜色为`#000`，可通过`global`或设置 css 变量`--resizable-line-background`设置颜色**
- **至少一列不能拖动（width 不设置即可），[请保持至少一列的自适应](https://ant-design.antgroup.com/components/table-cn#table-demo-fixed-columns)**
- **若 column 未传入`dataIndex`，请传入一个唯一的`key`，否则按照将按照 column 的序号 index 计算唯一 key**
- **若 column 有副作用，请把依赖项传入 useMemo deps 中**

## Example

### Antd Table

```tsx
import { useMemo } from 'react'
import { Table, type TableColumnsType } from 'antd'
import { type ResizableColumnsType, useAntdResizableHeader } from 'use-antd-resizable-header'


type Columns = ResizableColumnsType<TableColumnsType>

function App() {
  const columns: Columns = []

  const { components, resizableColumns, tableWidth, resetColumns, refresh } = useAntdResizableHeader({
    columns: useMemo(() => columns, []),
    // 保存拖拽宽度至本地localStorage
    columnsState: {
      persistenceKey: 'localKey',
      persistenceType: 'localStorage',
    },
  });

  return (
    <>
      <Table
        columns={resizableColumns}
        components={components}
        scroll={{ x: tableWidth }}
      />
    </>
  );
}
```

### ProTable

```tsx
import { useMemo } from 'react'
import { type ProColumns, ProTable } from '@ant-design/pro-components'

type Columns = ResizableColumnsType<ProColumns[]>


function App() {
  const columns: Columns = []

  const { components, resizableColumns, tableWidth, resetColumns, refresh } = useAntdResizableHeader({
    columns: useMemo(() => columns, []),
  });

  return (
    <>
      <ProTable
        columns={resizableColumns}
        components={components}
        scroll={{ x: tableWidth }}
      />
    </>
  );
}
```

## 修改拖拽背景颜色

```css
/* index.css */
--resizable-line-background: red;
```


## 为什么需要 React.useMemo ?

### 如果不使用 useMemo

#### 组件 render => columns 引用变化 => use-antd-resiable-header render => 组件 render => columns 引用变化···

## 不使用 useMemo

可以采用其他阻止 render 的方案，如: `columns` 是 prop 或 组件外常量

## Table 特殊处理

### filter 按钮溢出隐藏了

#### 解决方案

```css
.ant-table-filter-trigger {
  margin-inline: 0;
}
```

## ProTable 特殊处理

### fixed

[ProTable 默认会给 fixed 列添加宽度](https://github.com/ant-design/pro-components/blob/master/packages/table/src/utils/genProColumnToColumn.tsx#L115-L116)，所以可能会造成 `至少一列宽度为0` 的条件无法满足。

#### 解决方案

1. 手动给 fixed 列添加宽度，然后不设置其余某一个非 fixed 列宽度
2. 不设置 fixed 列宽度（默认 200），然后其余某一列也不设置宽度

## 本地开发

```bash
# 开发调试工具库
pnpm i

pnpm run dev

# 预览调试 playground
cd playground

pnpm i

pnpm run dev
```

## MIT

[LICENSE](https://github.com/hemengke1997/use-antd-resizable-header/blob/master/LICENSE)
