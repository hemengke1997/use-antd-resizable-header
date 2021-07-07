import React, { CSSProperties } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import classnames from 'classnames';
import 'react-resizable/css/styles.css';

import './index.less';

type ComponentProp = {
  width: number;
  onResize: (index: number) => (width: number) => void;
  classNames?: string;
  style?: CSSProperties;
  handlerClassName?: string;
  lineColor?: string;
  antdHeaderClassName?: string;
};

const AntdResizableHeader: React.FC<ComponentProp> = (props) => {
  const {
    width,
    onResize,
    style,
    classNames,
    handlerClassName,
    lineColor,
    antdHeaderClassName,
    ...rest
  } = props;

  const [resizeWidth, setResizeWidth] = React.useState<number>(width);

  if (!width) {
    return <th {...rest}></th>;
  }

  const setBodyUserSelect = (canSelect: boolean) => {
    document.body.style.userSelect = canSelect ? '' : 'none';
  };

  const onStart = (_: any, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width);
    setBodyUserSelect(false);
  };

  const onSelfResize = (_: any, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width);
  };

  const onStop = () => {
    if (width <= 0) return;
    onResize(width);
    setBodyUserSelect(true);
  };

  return (
    <th className={classnames(classNames, 'resizable-container')}>
      <Resizable
        className="resizable-box"
        width={resizeWidth}
        height={0}
        handle={
          <div
            className={classnames(handlerClassName, 'resizable-handler')}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="resizable-line" style={{ backgroundColor: lineColor }}></div>
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResizeStart={onStart}
        onResize={onSelfResize}
        onResizeStop={onStop}
      >
        <div className="resizable-fake-box"></div>
      </Resizable>
      <div {...rest} className={classnames(antdHeaderClassName)}></div>
    </th>
  );
};

export default React.memo(AntdResizableHeader);
