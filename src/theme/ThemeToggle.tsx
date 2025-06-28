// src/theme/ThemeToggle.tsx
const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

// Example usage: attach to a button
export default function ThemeToggleButton() {
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}