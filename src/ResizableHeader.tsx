import React from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import classnames from 'classnames';

import './index.less';

type ComponentProp = {
  onResize: (index: number) => (width: number) => void;
  handlerClassName?: string;
  lineColor?: string;
};

const AntdResizableHeader: React.FC<ComponentProp & any> = (props) => {
  const { width, onResize, handlerClassName, lineColor, className, style, ...rest } = props;

  const [resizeWidth, setResizeWidth] = React.useState<number>(width);

  if (!width || Number.isNaN(Number(width))) {
    return <th {...rest} style={style} className={className}></th>;
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
    if (resizeWidth <= 0) return;
    onResize(resizeWidth);
    setBodyUserSelect(true);
  };

  return (
    <th className={classnames(className, 'resizable-container')} style={style}>
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
        <div style={{ width: resizeWidth, height: '100%' }}></div>
      </Resizable>
      <div {...rest}></div>
    </th>
  );
};

export default React.memo(AntdResizableHeader);
