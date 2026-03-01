import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: 'primary' | 'secondary' | 'danger' | 'text';
   cursor?: 'pointer' | 'not-allowed' | 'wait' | 'default';
   size?: 'sm' | 'md' | 'lg';
   isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      { children, variant = 'primary', cursor = 'pointer', size = 'md', className = '', disabled, isLoading, ...props },
      ref
   ) => {
      const baseStyle =
         'rounded-full font-medium transition-all duration-200 inline-flex items-center justify-center select-none';

      const variants = {
         primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm hover:shadow-md',
         secondary: 'bg-transparent text-primary border border-border hover:bg-primary/10 hover:border-primary',
         danger: 'bg-error text-error-foreground hover:opacity-90 shadow-sm hover:shadow-md',
         text: 'bg-transparent text-primary hover:bg-primary/10',
      };

      const sizes = {
         sm: 'px-4 py-1.5 text-sm',
         md: 'px-6 py-2 text-sm',
         lg: 'px-8 py-2.5 text-base',
      };

      const cursors = {
         pointer: 'cursor-pointer',
         'not-allowed': 'cursor-not-allowed',
         wait: 'cursor-wait',
         default: 'cursor-default',
      };

      let stateClass = cursors[cursor];
      if (isLoading) {
         stateClass = 'opacity-70 cursor-wait shadow-none hover:shadow-none';
      } else if (disabled) {
         stateClass =
            variant === 'text'
               ? 'opacity-50 cursor-not-allowed bg-transparent text-muted-foreground'
               : 'cursor-not-allowed shadow-none hover:shadow-none border-transparent bg-muted text-muted-foreground';
      }

      return (
         <button
            ref={ref}
            disabled={disabled || isLoading}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${stateClass} ${className}`}
            {...props}
         >
            {isLoading && (
               <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
               >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                     className="opacity-75"
                     fill="currentColor"
                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
               </svg>
            )}
            {children}
         </button>
      );
   }
);

Button.displayName = 'Button';
