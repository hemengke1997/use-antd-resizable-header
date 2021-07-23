import React from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import classnames from 'classnames';

import './index.css';

type ComponentProp = {
  onResize: (width: number) => void;
  onMount: (width: number) => void;
  isLast: boolean;
  triggerMount: number;
  width: number;
  handlerClassName?: string;
  lineColor?: string;
} & Record<string, any>;

const AntdResizableHeader: React.FC<ComponentProp> = (props) => {
  const {
    width,
    onResize,
    onMount,
    isLast,
    triggerMount,
    handlerClassName,
    lineColor,
    className,
    style,
    ...rest
  } = props;

  const thRef = React.useRef<HTMLTableHeaderCellElement>(null);

  const [resizeWidth, setResizeWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (width && !isLast) {
      const domWidth = thRef.current?.getBoundingClientRect().width || width;
      const w = domWidth > width ? domWidth : width;
      setResizeWidth(w);
      onMount?.(w);
    }
  }, [triggerMount]);

  React.useEffect(() => {
    if (width) {
      setResizeWidth(width);
    }
  }, [width]);

  if (!width || Number.isNaN(Number(width)) || isLast) {
    return <th {...rest} style={style} className={className}></th>;
  }

  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : '';
    document.body.style.cursor = active ? 'col-resize' : '';
  };

  const onStart = (_: any, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width);
    setBodyStyle(true);
  };

  const onSelfResize = (_: any, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width);
  };

  const onStop = () => {
    if (resizeWidth <= 0) return;

    onResize(resizeWidth);
    setBodyStyle(false);
  };

  return (
    <th className={classnames(className, 'resizable-container')} style={style} ref={thRef}>
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
