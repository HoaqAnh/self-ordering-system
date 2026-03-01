import React, { useEffect, useState, useCallback } from 'react';
import { Button } from './Button';

export interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   children: React.ReactNode;
   size?: 'sm' | 'md' | 'lg';
   fullScreenOnMobile?: boolean;
   confirmText?: string;
   onConfirm?: () => void;
   cancelText?: string;
   isConfirmLoading?: boolean;
   confirmVariant?: 'primary' | 'danger';
}

export const Modal: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   title,
   children,
   size = 'md',
   fullScreenOnMobile = false,
   confirmText = 'Confirm',
   onConfirm,
   cancelText = 'Cancel',
   isConfirmLoading = false,
   confirmVariant = 'primary',
}) => {
   const [isMounted, setIsMounted] = useState(false);
   const [isAnimating, setIsAnimating] = useState(false);

   const handleClose = useCallback(() => {
      if (isConfirmLoading) return;
      onClose();
   }, [isConfirmLoading, onClose]);

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         event.key === 'Escape' && handleClose();
      };

      isOpen && window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [isOpen, handleClose]);

   useEffect(() => {
      if (isOpen) {
         setIsMounted(true);
         document.body.style.overflow = 'hidden';

         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               setIsAnimating(true);
            });
         });
      } else {
         setIsAnimating(false);
         document.body.style.overflow = 'unset';

         const timer = setTimeout(() => setIsMounted(false), 200);
         return () => clearTimeout(timer);
      }
   }, [isOpen]);

   if (!isMounted) return null;

   const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-[560px]',
      lg: 'max-w-3xl',
   };

   const modalAnimation = `${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 sm:translate-y-0'}`;
   const backgroundAnimation = `${isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`;
   const backgroundStyle = `fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-200 ease-out`;
   const mobileStyle = `${fullScreenOnMobile ? 'w-full h-full max-h-screen rounded-none sm:h-auto sm:w-auto sm:rounded-[28px]' : 'max-h-[calc(100vh-48px)] rounded-[28px]'}`;
   const modalStyle = `bg-surface text-surface-foreground shadow-lg flex flex-col ${sizes[size]} w-full ${mobileStyle} transition-all duration-200 ease-out transform ${modalAnimation}`;

   return (
      <div
         className={`${backgroundStyle} ${backgroundAnimation}`}
         onClick={handleClose}
         aria-modal="true"
         role="dialog"
      >
         <div onClick={(e) => e.stopPropagation()} className={`${modalStyle}`}>
            <div className="relative flex items-center justify-center pt-6 px-6 pb-4 min-h-[72px]">
               {title && <h2 className="text-xl font-normal text-center px-10">{title}</h2>}
            </div>
            <div className="flex-1 px-6 overflow-y-auto text-muted-foreground text-sm">{children}</div>
            <div className="flex justify-end gap-2 px-6 py-6 pt-6 mt-auto">
               {cancelText && (
                  <Button variant="text" size="sm" onClick={handleClose} disabled={isConfirmLoading}>
                     {cancelText}
                  </Button>
               )}
               {onConfirm && confirmText && (
                  <Button variant={confirmVariant} size="sm" onClick={onConfirm} isLoading={isConfirmLoading}>
                     {confirmText}
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
};
