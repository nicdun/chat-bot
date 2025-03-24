import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Store the previous value of a variable. See: See: https://dev.to/mcavaliere/comparing-previous-useeffect-values-in-react-2o4g
export function usePrevious<T>(value: T) {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
