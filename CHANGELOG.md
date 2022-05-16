# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.3.3](https://github.com/hemengke1997/use-antd-resizable-header/compare/v2.3.2...v2.3.3) (2022-05-16)

## 2.2.0 (2022-05-13)


### Features

* 新增拖拽宽度保存至本地功能 ([c717369](https://github.com/hemengke1997/use-antd-resizable-header/commit/c717369d2f4f8d1123eb1b0142b197b590ec7986))
* 自由设置不可拖动列，支持最后一列可拖动 ([34a1189](https://github.com/hemengke1997/use-antd-resizable-header/commit/34a118937cef0c7c024c9a04bd20cc02c878ea39))
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
