import { useThemeStore } from './useThemeStore';
import { Switch } from '../Switch';

export function ThemeSwitch() {
   const { theme, setTheme } = useThemeStore();
   const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
   const handleThemeChange = (checked: boolean) => {
      setTheme(checked ? 'dark' : 'light');
   };

   return (
      <div className="flex items-center gap-3 p-2">
         <Switch
            size="md"
            checked={isDark}
            onChange={handleThemeChange}
            trackColorOn="bg-gray-600"
            trackColorOff="bg-sky-200"
            checkedIcon={
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#434343"
               >
                  <path d="M483-172q-128.33 0-218.17-89.83Q175-351.67 175-480q0-113 71.5-197.5T425-783q-14 28-22 59t-8 64q0 111.67 78.17 189.83Q551.33-392 663-392q33 0 64-8t58-22q-20 107-104.5 178.5T483-172Z" />
               </svg>
            }
            uncheckedIcon={
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#EAC452"
               >
                  <path d="M466-738v-128h28v128h-28Zm206 86-19-19 89-93 21 21-91 91Zm66 186v-28h128v28H738ZM466-94v-127h28v127h-28ZM290-653l-94-89 22-20 91 90-19 19Zm452 457-89-93 19-18 90 89-20 22ZM94-466v-28h128v28H94Zm123 270-19-22 89-89 10 10 11 10-91 91Zm130-151q-55-55-55-133t55-133q55-55 133-55t133 55q55 55 55 133t-55 133q-55 55-133 55t-133-55Z" />
               </svg>
            }
         />
      </div>
   );
}
