import { useLayoutEffect } from 'react';

const getBodyElement = () => window.document.body;
const getScrollBarWidth = () => {
  return window.innerWidth - document.body.offsetWidth;
};

export const useBlockBodyScroll = () => {
  useLayoutEffect(() => {
    const body = getBodyElement();
    const defaultOverflow = body.style.overflow;
    const defaultPaddingRight = body.style.paddingRight;
    const scrollBarWidth = getScrollBarWidth();

    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      body.style.overflow = defaultOverflow;
      body.style.paddingRight = defaultPaddingRight;
    };
  }, []);
};
