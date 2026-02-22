export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   variant?: 'primary' | 'secondary';
}

export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
   const baseStyle = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200';
   const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
   };

   return (
      <button className={`${baseStyle} ${variants[variant]}`} {...props}>
         {children}
      </button>
   );
};
