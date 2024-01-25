import { useCallback, useEffect, useRef, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

export interface useOverflowDetectorProps {
  onChange?: (overflow: boolean) => void
}

export function useOverflowDetector(props: useOverflowDetectorProps) {
  const [overflow, setOverflow] = useState<boolean>(false)
  const ref = useRef<HTMLElement>()

  const updateState = useCallback(() => {
    if (ref.current === undefined) {
      return
    }
    const newState =
      ref.current.offsetWidth < ref.current.scrollWidth || ref.current.offsetHeight < ref.current.scrollHeight
    if (newState === overflow) {
      return
    }
    setOverflow(newState)
    if (props.onChange) {
      props.onChange(newState)
    }
  }, [ref.current, props.onChange, setOverflow, overflow])

  useResizeDetector({
    targetRef: ref as React.MutableRefObject<HTMLElement>,
    onResize: updateState,
  })

  useEffect(() => {
    updateState()
  })

  return {
    overflow,
    ref,
  }
}
