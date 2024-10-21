import { useState } from 'react';

export function useScrollLock() {
  const [scrollY, setScrollY] = useState(0);
  
  const modalBody = document.querySelector('.ant-modal-body');
  const modalContent = document.querySelector('.ant-modal-content');

  const disableScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.pointerEvents = 'none';
    modalBody && modalBody.classList.add('no-pointer-events');
    modalContent && modalContent.classList.add('no-pointer-events');
  };

  const enableScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';  // Reset the overflow
    window.scrollTo(0, scrollY);  // Restore the scroll position
    document.body.style.pointerEvents = '';
    modalBody && modalBody.classList.remove('no-pointer-events');
    modalContent && modalContent.classList.remove('no-pointer-events');
  };

  return { disableScroll, enableScroll };
}