import { createContext, useContext, useState } from "react";


export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false);

    const value = {
        darkMode, setDarkMode
    }

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}