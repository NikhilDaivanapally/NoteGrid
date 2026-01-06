"use client";

import { useEffect, RefObject, useRef } from "react";

type Props = {
  ref: RefObject<HTMLDivElement | null>;
  hasMore?: boolean;
  isFetching?: boolean;
  onLoadMore: () => void;
  offset?: number;
};

export function useInfiniteScroll({
  ref,
  hasMore,
  isFetching,
  onLoadMore,
  offset = 120,
}: Props) {
  const loadingRef = useRef(false);

  // Release lock when fetch completes
  useEffect(() => {
    if (!isFetching) {
      loadingRef.current = false;
    }
  }, [isFetching]);

  // Scroll-based loading
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (!hasMore) return;
      if (loadingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = el;

      if (scrollTop + clientHeight >= scrollHeight - offset) {
        loadingRef.current = true;
        onLoadMore();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [ref, hasMore, onLoadMore, offset]);

  // Auto-fill logic
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!hasMore) return;
    if (isFetching) return;
    if (loadingRef.current) return;

    const { scrollHeight, clientHeight } = el;

    // If content does not overflow auto load more
    if (scrollHeight <= clientHeight + offset) {
      loadingRef.current = true;
      onLoadMore();
    }
  }, [ref, hasMore, isFetching, onLoadMore, offset]);
}
