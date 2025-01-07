## [3.2.2](https://github.com/hemengke1997/use-antd-resizable-header/compare/v3.2.1...v3.2.2) (2025-01-07)


### Bug Fixes

* JSON.stringify 处理有循环依赖的对象会报错 ([82a0f44](https://github.com/hemengke1997/use-antd-resizable-header/commit/82a0f44d3db176d863aa305bee689c51257bb7d9))
* object cycle ([e8932f7](https://github.com/hemengke1997/use-antd-resizable-header/commit/e8932f71bb96d4d624ec1b438699ce20ec9afc7a))
* 开启持久化后列顺序失效问题 ([246941c](https://github.com/hemengke1997/use-antd-resizable-header/commit/246941c667143bf8638d0179e1849a13763951cc))


### Features

* 补全列顺序 playground ([e43ee94](https://github.com/hemengke1997/use-antd-resizable-header/commit/e43ee943e5e373396618742f49a57865aaed79da))



## [3.2.1](https://github.com/hemengke1997/use-antd-resizable-header/compare/v3.2.0...v3.2.1) (2025-01-07)


### Bug Fixes

* [#107](https://github.com/hemengke1997/use-antd-resizable-header/issues/107) ([96ae6aa](https://github.com/hemengke1997/use-antd-resizable-header/commit/96ae6aaedeffd304461ee2f82dec7a614f2ded94))
* [#107](https://github.com/hemengke1997/use-antd-resizable-header/issues/107) ([33bfe4f](https://github.com/hemengke1997/use-antd-resizable-header/commit/33bfe4f72d63966920ceb64fa9a7c6c002dbfb8c))



# [3.2.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v3.1.0...v3.2.0) (2024-11-25)


### Bug Fixes

* inline css file ([c1701a3](https://github.com/hemengke1997/use-antd-resizable-header/commit/c1701a3e69c1865a1c37ab646cf4af6e3a564b7f))



# [3.1.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v3.0.0...v3.1.0) (2024-09-19)


### Bug Fixes

* cursor disappeared on click ([0bfa921](https://github.com/hemengke1997/use-antd-resizable-header/commit/0bfa921317bb3e4a493737c0fb9a51c138d3d257))


### Features

* tree-shaking
* log error on dataIndex repeated ([555ffab](https://github.com/hemengke1997/use-antd-resizable-header/commit/555ffaba4de2007a853e295dad7dc266d0b2641c))


# [3.0.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.9.5...v3.0.0) (2024-08-29)

## Breaking Changes

- 废弃了 `cache`
- 废弃了 `tooltipRender`
- css 采用 BEM 命名方式
- css 变量改为 `--resizable-line-background`
- css 文件重名为 `style.css`
- `ResizableUniqIdPrefix` 从 `resizable-table-id` 重命名为 `resizable-col-id`

## Feat

- 新增 `refresh` 方法，用于手动刷新组件
- 新增 `debounceWaitTime`，用于设置 resize窗口时 debounce 的等待时间
- `resetColumns` 新增入参 `resetStorage` 选项，可以重置storage中的列宽度，默认为 `true`
- 可给单独列设置以下选项
```tsx
type ResizableConfig = {
  /**
   * @description 列宽度
   */
  width?: WidthType
  /**
   * @description 默认列宽度
   */
  defaultWidth?: number
  /**
   * @description 是否可以拖动
   */
  resizable?: boolean
  /**
   * @description 最小拖动宽度
   */
  minConstraints?: number
  /**
   * @description 最大拖动宽度
   */
  maxConstraints?: number
}
```

### Bug Fixes

* [#78](https://github.com/hemengke1997/use-antd-resizable-header/issues/78) ([a2659f6](https://github.com/hemengke1997/use-antd-resizable-header/commit/a2659f613340dbfb88243db2fb5e32cf34d23fc4))



## [2.9.5](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.9.4...v2.9.5) (2024-01-31)


### Bug Fixes

* render error caused by react-resize-detector ([52f5321](https://github.com/hemengke1997/use-antd-resizable-header/commit/52f53219a6554c381102eb0ac8a3abe9d3b1b029))



## [2.9.4](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.9.3...v2.9.4) (2024-01-25)


### Bug Fixes

* replace overflow detector ([e5bc5ef](https://github.com/hemengke1997/use-antd-resizable-header/commit/e5bc5ef36f69dc9a9faed9efc6feb214bc378ea1))



## [2.9.3](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.9.2...v2.9.3) (2024-01-24)


### Bug Fixes

* react-detectable-overflow node engine ([d6b2d4f](https://github.com/hemengke1997/use-antd-resizable-header/commit/d6b2d4fd1d05a2035f1c40953a179c65c111cf36)), closes [#75](https://github.com/hemengke1997/use-antd-resizable-header/issues/75)



## [2.9.2](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.9.1...v2.9.2) (2024-01-21)


### Bug Fixes

* compatible with react legacy, not require react/jsx-runtime ([6bb0115](https://github.com/hemengke1997/use-antd-resizable-header/commit/6bb01159b7e7b530074ba774706110b57dea99a0))



## [2.9.1](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.9.0...v2.9.1) (2023-12-26)


### Bug Fixes

* `onHeaderCell` not working ([911a19a](https://github.com/hemengke1997/use-antd-resizable-header/commit/911a19a0444557c2f4a7804a947483cd093e9c22))
* playground [#67](https://github.com/hemengke1997/use-antd-resizable-header/issues/67) type ([c40a022](https://github.com/hemengke1997/use-antd-resizable-header/commit/c40a02298384d2d26c25afa64088222a0520bbc7))


### Performance Improvements

* minify code on build ([9187819](https://github.com/hemengke1997/use-antd-resizable-header/commit/918781968d9e6d73f2c938ea269ac2b550727ee4))
* optimize tootipRender ([5680146](https://github.com/hemengke1997/use-antd-resizable-header/commit/5680146e2b312b9bf9a7c78a26db266f9cb7dd4b))



# [2.9.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.15...v2.9.0) (2023-11-26)


### Features

* support `tooltipRender` for header cell ellipsis ([3345589](https://github.com/hemengke1997/use-antd-resizable-header/commit/33455893448204c79b713a427578b94b13ceb901))



## [2.8.15](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.14...v2.8.15) (2023-11-01)


### Bug Fixes

* `children.at is not a function` in legacy browser ([2b536d0](https://github.com/hemengke1997/use-antd-resizable-header/commit/2b536d0f8462bde7b0b4ce5f526a753531ad4f5e)), closes [#64](https://github.com/hemengke1997/use-antd-resizable-header/issues/64)
* fix typo ([21cf966](https://github.com/hemengke1997/use-antd-resizable-header/commit/21cf9663a91f8589f33f898af0d221b5051c1b37))
* typo ([37b00f5](https://github.com/hemengke1997/use-antd-resizable-header/commit/37b00f501965a77fe0d51665ff19301ccdccaab8))



## [2.8.14](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.13...v2.8.14) (2023-10-16)


### Bug Fixes

* `resizbale` option not working ([8efae9d](https://github.com/hemengke1997/use-antd-resizable-header/commit/8efae9dd5d26208a82dc501219c9ce888dfbdedb))
* fix typo ([02b04cb](https://github.com/hemengke1997/use-antd-resizable-header/commit/02b04cb71c7c1f5a31d8cea727999512e3b33199))



## [2.8.13](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.12...v2.8.13) (2023-05-19)


### Bug Fixes

* 可以自定义勾选表头时，cacheWidth失效 ([439a4d6](https://github.com/hemengke1997/use-antd-resizable-header/commit/439a4d6a64f9cb5b833ad3a4b76f106142408923))



## [2.8.12](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.11...v2.8.12) (2023-03-10)


### Reverts

* compute table width ([04f77ad](https://github.com/hemengke1997/use-antd-resizable-header/commit/04f77ad9bc9129dbb30d08060d03822eb1f67c76))



## [2.8.11](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.10...v2.8.11) (2023-03-10)


### Bug Fixes

* typo ([afedd60](https://github.com/hemengke1997/use-antd-resizable-header/commit/afedd602c4778eb14efc15684be0ee177682b812))



## [2.8.10](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.9...v2.8.10) (2023-03-10)


### Bug Fixes

* uniq colunm id ([f1eca36](https://github.com/hemengke1997/use-antd-resizable-header/commit/f1eca36879a41bee372b1bc8bca45d8cba8e5af3))



## [2.8.9](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.8...v2.8.9) (2023-03-09)


### Bug Fixes

* css build ([2882a6b](https://github.com/hemengke1997/use-antd-resizable-header/commit/2882a6b7ff7c37f8bfd86c6215f4bcaec04efb76))



## [2.8.8](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.7...v2.8.8) (2023-03-08)


### Bug Fixes

* exports ([629b9e0](https://github.com/hemengke1997/use-antd-resizable-header/commit/629b9e0deabbb26114692934f6ce7be8e43143e9))
* only storage string `title` ([1dc047d](https://github.com/hemengke1997/use-antd-resizable-header/commit/1dc047d92dd29aed83a54cce9cf5f1a6c5a8a48f)), closes [#43](https://github.com/hemengke1997/use-antd-resizable-header/issues/43)
* test ([faca77f](https://github.com/hemengke1997/use-antd-resizable-header/commit/faca77f57b373aa31dcf271bd8efe6cc4fdf9a67))



## [2.8.7](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.6...v2.8.7) (2023-02-01)



## [2.8.6](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.5...v2.8.6) (2023-02-01)


### Bug Fixes

* storage cache not working ([a8057f3](https://github.com/hemengke1997/use-antd-resizable-header/commit/a8057f3c40198b984e2b00f78759fe2d19afcb9d))



## [2.8.5](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.4...v2.8.5) (2023-01-11)


### Bug Fixes

* `resizable-handler` z-index compatible with antd ([e2f8997](https://github.com/hemengke1997/use-antd-resizable-header/commit/e2f8997c33850870ff036560eb92ef80c855ac99))



## [2.8.4](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.3...v2.8.4) (2023-01-11)


### Bug Fixes

* dynamic columns & table blink ([ce4ab41](https://github.com/hemengke1997/use-antd-resizable-header/commit/ce4ab410111c4aa276933eb2dfc800b53181739d)), closes [#38](https://github.com/hemengke1997/use-antd-resizable-header/issues/38)



## [2.8.3](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.2...v2.8.3) (2023-01-10)


### Bug Fixes

* `mergeColumns` edge case ([aaec764](https://github.com/hemengke1997/use-antd-resizable-header/commit/aaec7643603699560deaca1e69ea321da6ad6cad)), closes [#37](https://github.com/hemengke1997/use-antd-resizable-header/issues/37)



## [2.8.2](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.1...v2.8.2) (2023-01-10)


### Bug Fixes

* local columns is undefined at first render ([aeca034](https://github.com/hemengke1997/use-antd-resizable-header/commit/aeca03440f63b0230b07aae689531eb9a3ecaca8))



## [2.8.1](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.8.0...v2.8.1) (2023-01-06)


### Bug Fixes

* `defaultWidth` not work ([886899f](https://github.com/hemengke1997/use-antd-resizable-header/commit/886899f9249580b79db7fb397241d28f879c817f))



# [2.8.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.7.3...v2.8.0) (2023-01-06)


### Features

* support cache children column width ([c562c5c](https://github.com/hemengke1997/use-antd-resizable-header/commit/c562c5ceb88e68a6325836f28d7881d291921908))



## [2.7.3](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.7.1...v2.7.3) (2023-01-05)


### Bug Fixes

* husky script ([e4df7d3](https://github.com/hemengke1997/use-antd-resizable-header/commit/e4df7d3682f1791c089a4ff4a2e084f7bf7a4790))



## [2.7.1](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.7.0...v2.7.1) (2023-01-05)


### Bug Fixes

* defaultValue not work ([91d8b3f](https://github.com/hemengke1997/use-antd-resizable-header/commit/91d8b3f2caac6689cad2c0a9aab9c3d6afc1197e))



# [2.7.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.6.3...v2.7.0) (2023-01-04)


### Bug Fixes

* publish config ([ff4bb1c](https://github.com/hemengke1997/use-antd-resizable-header/commit/ff4bb1c50ea7fd4ea1dc88658898274ecf03c35e))



## [2.6.3](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.6.2...v2.6.3) (2023-01-04)



## [2.6.2](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.6.1...v2.6.2) (2023-01-04)


### Bug Fixes

* deps ([be75cf8](https://github.com/hemengke1997/use-antd-resizable-header/commit/be75cf8f686b1daa4e9f6516d9ce4135d0403dba))



## [2.6.1](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.6.0...v2.6.1) (2023-01-04)



# [2.6.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.5.0...v2.6.0) (2023-01-04)


### Bug Fixes

* resizable box overflow(unset) lead to table overflow ([523a7fc](https://github.com/hemengke1997/use-antd-resizable-header/commit/523a7fceead98ec266ec67b4c32434bed9a49480))



# [2.5.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.4.0...v2.5.0) (2022-09-15)


### Bug Fixes

* warning ([61378d1](https://github.com/hemengke1997/use-antd-resizable-header/commit/61378d1e66132b4ffe177a38af19334aa0333e94))


### Features

* ✨ support `onResizeStart` & `onResizeEnd` callback ([0e363da](https://github.com/hemengke1997/use-antd-resizable-header/commit/0e363da97ef866abceeba45a949bdf33933be1eb)), closes [#21](https://github.com/hemengke1997/use-antd-resizable-header/issues/21)



# [2.4.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.3.4...v2.4.0) (2022-07-06)


### Features

* 修复 hideInTable 导致的 tableWidth 计算为 0 问题 ([f570c08](https://github.com/hemengke1997/use-antd-resizable-header/commit/f570c08cb1427f23549d2a79dc5e6e3dc2f898c3))



## [2.3.4](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.3.3...v2.3.4) (2022-05-16)



## [2.3.3](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.3.2...v2.3.3) (2022-05-16)



## [2.3.2](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.3.1...v2.3.2) (2022-05-16)



## [2.3.1](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.3.0...v2.3.1) (2022-05-16)



# [2.3.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.2.0...v2.3.0) (2022-05-16)


### Bug Fixes

* script npm ([b302b70](https://github.com/hemengke1997/use-antd-resizable-header/commit/b302b70522af0111c36e5d9e3380fff23adce2a7))
* typo error ([6dadb9e](https://github.com/hemengke1997/use-antd-resizable-header/commit/6dadb9e154e19a17b149343dda00130da1308534))
* workflows ([8757c75](https://github.com/hemengke1997/use-antd-resizable-header/commit/8757c750dcf1e81a41231a4679b1a51b2a1a4764))


### Features

* github workflow ([47a9cf9](https://github.com/hemengke1997/use-antd-resizable-header/commit/47a9cf924f41da02985135fd1a29ac99a009d174))



# [2.2.0](https://github.com/hemengke1997/use-antd-resizable-header/compare/7877183aa2184eb5ab82b917e625d3de68fb6a15...v2.2.0) (2022-05-13)


### Bug Fixes

* async columns ([7877183](https://github.com/hemengke1997/use-antd-resizable-header/commit/7877183aa2184eb5ab82b917e625d3de68fb6a15))
* column中有副作用时render问题 [#7](https://github.com/hemengke1997/use-antd-resizable-header/issues/7) ([274a973](https://github.com/hemengke1997/use-antd-resizable-header/commit/274a973c182d06ac4d8d580f686a943f97a52786))
* dynamic columns ([0e55add](https://github.com/hemengke1997/use-antd-resizable-header/commit/0e55add15626f5c2faa030caa62871f0fcf44b47))
* header click event ([28d79c2](https://github.com/hemengke1997/use-antd-resizable-header/commit/28d79c2a2bfc627d41515a8be67426f5559dec96))
* hooks render warning ([b70409e](https://github.com/hemengke1997/use-antd-resizable-header/commit/b70409ecb2c98e0d6cbb6bff6d43568759f73acd))
* last column cannot set width ([a872c43](https://github.com/hemengke1997/use-antd-resizable-header/commit/a872c4329ca3d949a5cae6f1c79b28ec04ebacfb))
* localColumns reset when resizableColumns length = 0 ([7e255cb](https://github.com/hemengke1997/use-antd-resizable-header/commit/7e255cb82e0cfb8c6b2d405fc653611440ce65d4))
* no render when columns prop is not reactive ([480bdd3](https://github.com/hemengke1997/use-antd-resizable-header/commit/480bdd3c52f0d7ad9c1619dd781d26144ba87f83))
* proTable 支持 hideInTable 列，目前计算 tableWidth 没有剔除 hideInTable 列 ([a13f1bb](https://github.com/hemengke1997/use-antd-resizable-header/commit/a13f1bb0593299c9041566b5aaee655d939661fc))
* react-hook render warning ([1de569b](https://github.com/hemengke1997/use-antd-resizable-header/commit/1de569bbf8739f05dc87a6243794d6c5278c4799))
* remove exports ([a1adc49](https://github.com/hemengke1997/use-antd-resizable-header/commit/a1adc49c19149037b6e575bb3995e1abde8bc572))
* remove less ([fa65e33](https://github.com/hemengke1997/use-antd-resizable-header/commit/fa65e33dcbdb66fdc7ceeee5ac9d641337da07d2))
* render order warning ([3f49017](https://github.com/hemengke1997/use-antd-resizable-header/commit/3f49017b00d9e0e8669f75d6e8703d1cea9a5b9d))
* resetColumns clear widthCache ([7dbb709](https://github.com/hemengke1997/use-antd-resizable-header/commit/7dbb709074732dee5fd313a36e7f644be1481444))
* rules-of-hooks ([7fcc8d6](https://github.com/hemengke1997/use-antd-resizable-header/commit/7fcc8d67416016a285f7b5a2807fb6bc81603c8b))
* trigger remount when columns change ([e8c96e1](https://github.com/hemengke1997/use-antd-resizable-header/commit/e8c96e1849b17edbf961d1c8c9b70d1e061553a3))
* useFunction ([cc4df33](https://github.com/hemengke1997/use-antd-resizable-header/commit/cc4df3365bfd982cbf1e307e2871f8c907fcbc12))
* useGetDataindexColumns render bug ([c5502b2](https://github.com/hemengke1997/use-antd-resizable-header/commit/c5502b2635bf8b5f364047619a1ccb16131b739e))
* useGetDataindexColumns render bug ([627a00f](https://github.com/hemengke1997/use-antd-resizable-header/commit/627a00fa27c0b380403f65b7eb8de8f7259d10ce))
* useGetDataindexColumns render bug ([0046af4](https://github.com/hemengke1997/use-antd-resizable-header/commit/0046af40f470efedb58563f6d0c6c9cab4a0732f))
* useGetDataindexColumns render bug ([e40f422](https://github.com/hemengke1997/use-antd-resizable-header/commit/e40f4222f71c023af1c9c3427c50ae107a63beec))
* warning when column is undefined ([dd511d5](https://github.com/hemengke1997/use-antd-resizable-header/commit/dd511d5d80a10199a0977981b7cd78695d24eae8))


### Features

* add cacheOption ([da9a659](https://github.com/hemengke1997/use-antd-resizable-header/commit/da9a6591caec2b1612d8eee6354c10bb2dcbad43))
* add column width cache to aviod width reset after render ([7f73ec9](https://github.com/hemengke1997/use-antd-resizable-header/commit/7f73ec99df09f8ef368390a5c1049382ba199287))
* cannot drag the last column ([de124c8](https://github.com/hemengke1997/use-antd-resizable-header/commit/de124c8d43828d938782118b9aa5d3f2da0c6b31))
* deepcompare column prop to avoid endless loop ([21ee389](https://github.com/hemengke1997/use-antd-resizable-header/commit/21ee389693de0de96ded7e339cff51f943b291d4))
* ellipsis title ([065fbc8](https://github.com/hemengke1997/use-antd-resizable-header/commit/065fbc8fd9f2e467f6e4269885ba0874a1d22b2d))
* ignore empty object column ([65ccaf4](https://github.com/hemengke1997/use-antd-resizable-header/commit/65ccaf433040e825e6e3b0d90339818516da612a))
* replace npm download link ([967db98](https://github.com/hemengke1997/use-antd-resizable-header/commit/967db9862a673e788141ece38f091dc82b01cbbc))
* replace npm download link ([5618d11](https://github.com/hemengke1997/use-antd-resizable-header/commit/5618d11399ebaafb11b9c54f2fb0f2a636b3cab9))
* trigger mount when window resize ([83d2d87](https://github.com/hemengke1997/use-antd-resizable-header/commit/83d2d870e53c8e31db9cfdcedbd8c9714c69ea69))
* trigger mount when window resize ([017aeab](https://github.com/hemengke1997/use-antd-resizable-header/commit/017aeab5160bd9b20f5360a626a9eb47cf9b520f))
* use postcss ([2011f93](https://github.com/hemengke1997/use-antd-resizable-header/commit/2011f932f44b0f0e92be5ea5157edc36d7a0597e))
* 新增拖拽宽度保存至本地功能 ([c717369](https://github.com/hemengke1997/use-antd-resizable-header/commit/c717369d2f4f8d1123eb1b0142b197b590ec7986))
* 自由设置不可拖动列，支持最后一列可拖动 ([34a1189](https://github.com/hemengke1997/use-antd-resizable-header/commit/34a118937cef0c7c024c9a04bd20cc02c878ea39))


### Performance Improvements

* code perf ([d8c91f8](https://github.com/hemengke1997/use-antd-resizable-header/commit/d8c91f81e2aa691c6174f6fc26a95a92b97cecb0))
* eslintrc ([32e68ee](https://github.com/hemengke1997/use-antd-resizable-header/commit/32e68ee921c1dfb217059663a7700fdb7f90e731))
* rename some function ([2c80499](https://github.com/hemengke1997/use-antd-resizable-header/commit/2c804999e6791d9cecfb3fd5b29420e9bf5c8fde))
* useSafeState ([cde740d](https://github.com/hemengke1997/use-antd-resizable-header/commit/cde740da24fb67b4aef6fe7b4d95f10a87546569))



