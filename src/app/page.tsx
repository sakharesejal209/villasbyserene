'use client';

import { useThemeContext } from '@/context/ThemeContext';
import Button from '@mui/material/Button';


const Page = () => {

 const { mode, toggleTheme } = useThemeContext();

  return (
   <div>
    <div>
      <h1>Hello from HomePage</h1>
      <Button variant="contained" onClick={toggleTheme}>
        Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </div>
   </div>
  )
}

export default Page