import React, { ThHTMLAttributes } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import classnames from 'classnames';

import './index.css';

type ComponentProp = {
  onResize: (width: number) => void;
  onMount: (width: number) => void;
  triggerRender: number;
  width: number;
  minWidth: number;
  maxWidth: number;
  titleTip?: string;
} & ThHTMLAttributes<HTMLTableCellElement>;

const ResizableHeader: React.FC<ComponentProp> = (props) => {
  const {
    width,
    minWidth,
    maxWidth,
    onResize,
    onMount,
    triggerRender,
    className,
    style,
    titleTip,
    onClick,
    children,
    rowSpan,
    colSpan,
    ...rest
  } = props;

  const thRef = React.useRef<HTMLTableHeaderCellElement>(null);

  const [resizeWidth, setResizeWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (width) {
      setResizeWidth(width);
      onMount?.(width);
    }
  }, [triggerRender]);

  React.useEffect(() => {
    if (width) {
      setResizeWidth(width);
    }
  }, [width]);

  if (!width || Number.isNaN(Number(width))) {
    return (
      <th
        {...rest}
        style={style}
        className={className}
        title={titleTip}
        onClick={onClick}
        rowSpan={rowSpan}
        colSpan={colSpan}
      >
        <span title={titleTip}>{children}</span>
      </th>
    );
  }

  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : '';
    document.body.style.pointerEvents = active ? 'none' : '';
    document.documentElement.style.cursor = active ? 'col-resize' : '';
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
    <th
      className={classnames(className, 'resizable-container')}
      style={style}
      ref={thRef}
      onClick={onClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      <Resizable
        className="resizable-box"
        width={resizeWidth}
        minConstraints={[minWidth, 0]}
        maxConstraints={[maxWidth, 0]}
        height={0}
        handle={
          <div
            className="resizable-handler"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="resizable-line"></div>
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResizeStart={onStart}
        onResize={onSelfResize}
        onResizeStop={onStop}
      >
        <div style={{ width: resizeWidth, height: '100%' }}></div>
      </Resizable>
      <div {...rest} className="resizable-title" title={titleTip}>
        {children}
      </div>
    </th>
  );
};

export default React.memo(ResizableHeader);
