import { createContext, useContext, useEffect, useState } from "react";


export const ThemeContext = createContext(null);
const THEME_KEY = 'theme';

export const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || 'light')

    useEffect(()=>{
        localStorage.setItem(THEME_KEY, theme);
    },[theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);