import { useEffect, useRef } from "react";

export function useScrollToBottom(): [
  React.RefObject<HTMLDivElement | null>,
  React.RefObject<HTMLDivElement | null>
] {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerObserverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerObserverRef.current;

    if (container) {
      const observer = new MutationObserver(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  return [containerObserverRef, messagesEndRef];
}
