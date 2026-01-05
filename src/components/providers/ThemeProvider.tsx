import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        if (savedTheme) {
            setThemeState(savedTheme);
            document.documentElement.dataset.theme = savedTheme;
        } else {
            const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

            const systemTheme: Theme = prefersDarkTheme ? "dark" : "light";
            setThemeState(prefersDarkTheme ? "dark" : "light");
            document.documentElement.dataset.theme = systemTheme;
        }
    }, [])

    const setTheme = (value: Theme) => {
        setThemeState(value);
        localStorage.setItem("theme", value);
        document.documentElement.dataset.theme = value;
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return ctx;
};