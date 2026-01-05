import './App.css'
import { useTheme } from "./components/providers/ThemeProvider";

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <button onClick={toggleTheme}>
                {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </>
    )
}

export default App