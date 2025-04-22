'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  children: ReactNode; // L'élément qui déclenche l'affichage du popover
  content: ReactNode;  // Le contenu à afficher dans le popover
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Positionnement du popover
  offset?: [number, number]; // Décalage par rapport à l'élément déclencheur [horizontal, vertical]
}

const PopoverBottom: React.FC<PopoverProps> = ({ children, content, placement = 'bottom', offset = [0, 8] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);
  const togglePopover = () => setIsOpen(!isOpen);

  // Ferme le popover lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && popoverRef.current && triggerRef.current &&
          !popoverRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Gestion de la position du popover
  useEffect(() => {
    if (isOpen && popoverRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const [offsetX, offsetY] = offset;

      let top: number | undefined;
      let left: number | undefined;

      switch (placement) {
        case 'top':
          top = triggerRect.top - popoverRect.height - offsetY;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + offsetX;
          break;
        case 'bottom':
          top = triggerRect.bottom + offsetY;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + offsetX;
          break;
        case 'left':
          left = triggerRect.left - popoverRect.width - offsetX;
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + offsetY;
          break;
        case 'right':
          left = triggerRect.right + offsetX;
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + offsetY;
          break;
        default: // bottom
          top = triggerRect.bottom + offsetY;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + offsetX;
      }

      // Ajustement pour rester dans la fenêtre
      if (top !== undefined) {
        if (top < 0) top = offsetY;
        else if (top + popoverRect.height > viewportHeight) top = viewportHeight - popoverRect.height - offsetY;
      }
      if (left !== undefined) {
        if (left < 0) left = offsetX;
        else if (left + popoverRect.width > viewportWidth) left = viewportWidth - popoverRect.width - offsetX;
      }

      popoverRef.current.style.top = `${top}px`;
      popoverRef.current.style.left = `${left}px`;
    }
  }, [isOpen, placement, offset]);

  return (
    <div ref={triggerRef} style={{ display: 'inline-block' }}>
      <div onClick={togglePopover}>
        {children}
      </div>
      {isOpen && popoverRef.current && createPortal(
        <div
          ref={popoverRef}
          style={{
            position: 'fixed',
            zIndex: 10,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </div>
  );
};

export default PopoverBottom;