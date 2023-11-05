import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, SetMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    SetMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return origin
};
