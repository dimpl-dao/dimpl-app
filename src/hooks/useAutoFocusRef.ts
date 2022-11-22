import {useEffect, useRef} from 'react';

export default function useAutoFocusRef() {
  const autoFocusRef = useRef(null);
  useEffect(() => {
    // @ts-ignore
    autoFocusRef?.current?.focus();
  }, [autoFocusRef]);
  return autoFocusRef;
}
