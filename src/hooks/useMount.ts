import { useRef, useCallback, useEffect } from "react";

export const useMount = () => {
  const mountedRef = useRef(false);
  const getMountedState = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return getMountedState;
};
