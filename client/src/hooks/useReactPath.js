import { useEffect, useState } from "react";

const useReactPath = () => {
  const [path, setPath] = useState(window.location.pathname);
  const listenToPopstate = () => {
    setPath(window.location.pathname);
  };
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
};

export default useReactPath;
