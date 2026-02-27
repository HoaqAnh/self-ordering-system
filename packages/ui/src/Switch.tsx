import React, { forwardRef } from 'react';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
   checked: boolean;
   onChange: (checked: boolean) => void;
   size?: 'sm' | 'md' | 'lg';
   checkedIcon?: React.ReactNode;
   uncheckedIcon?: React.ReactNode;
   trackColorOn?: string;
   trackColorOff?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
   (
      {
         checked,
         onChange,
         size = 'md',
         disabled,
         checkedIcon,
         uncheckedIcon,
         trackColorOn = 'bg-blue-600',
         trackColorOff = 'bg-gray-200 dark:bg-gray-600',
         ...props
      },
      ref
   ) => {
      const sizes = {
         sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4.5', defaultPos: 'translate-x-0.5' },
         md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5.5', defaultPos: 'translate-x-0.5' },
         lg: { track: 'w-14 h-8', thumb: 'w-7 h-7', translate: 'translate-x-6.5', defaultPos: 'translate-x-0.5' },
      };

      const currentSize = sizes[size];
      const classButton = `relative inline-flex flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer`;
      const classSpan = `grid place-items-center transform rounded-full bg-white shadow transition duration-200 ease-in-out overflow-hidden ${currentSize.thumb} ${checked ? currentSize.translate : currentSize.defaultPos}`;
      const classChecked = `transition-opacity duration-200 flex items-center justify-center w-full h-full ${checked ? 'opacity-100' : 'opacity-0 hidden'}`;
      const classUnchecked = `transition-opacity duration-200 flex items-center justify-center w-full h-full ${!checked ? 'opacity-100' : 'opacity-0 hidden'}`;

      return (
         <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            ref={ref}
            onClick={() => !disabled && onChange(!checked)}
            className={`${classButton} ${currentSize.track} ${checked ? trackColorOn : trackColorOff} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            {...props}
         >
            <span className="sr-only">Toggle Switch</span>
            <span className={`${classSpan}`}>
               <span className={`${classChecked}`}>{checkedIcon}</span>
               <span className={`${classUnchecked}`}>{uncheckedIcon}</span>
            </span>
         </button>
      );
   }
);

Switch.displayName = 'Switch';
