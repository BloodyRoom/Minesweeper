import './App.css'
import { useTheme } from "./components/providers/ThemeProvider";

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="w-full h-full flex items-center justify-center">
                <button onClick={toggleTheme} className={"z-1"}>
                    {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
                </button>

                <img className={`absolute top-0 ${theme === "dark" ? "opacity-20" : "opacity-100"} z-0`} src={`https://picsum.photos/${window.innerWidth}/${window.innerHeight}/?blur&grayscale`} alt="backround"/>
            </div>
        </>
    )
}

export default App