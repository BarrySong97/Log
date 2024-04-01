import { useState, useEffect, useRef, useCallback } from "react";

type ScrollTo = "top" | "bottom";

interface UseScrollFunctions {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  isAtTop: boolean;
  scrollTop: number;
  isAtBottom: boolean;
}

function useScrollFunctions(
  topThreshold = 150,
  bottomThreshold = 150
): UseScrollFunctions {
  const [isAtTop, setIsAtTop] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement!;
      if (element === null) return;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      setScrollTop(scrollTop);

      // 检查是否滚动到了顶部
      if (scrollTop < topThreshold) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }

      // 检查是否滚动到了底部

      if (scrollHeight - scrollTop - clientHeight < bottomThreshold) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return { scrollTop, scrollToTop, scrollToBottom, isAtTop, isAtBottom };
}

export default useScrollFunctions;
