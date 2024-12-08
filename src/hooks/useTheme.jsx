import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}

// import { useState, useEffect } from 'react';

// export function useTheme() {
//   const [theme, setTheme] = useState(() => {
//     // Get the saved theme from localStorage or use system preference as a fallback
//     const saved = localStorage.getItem('theme');
//     return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
//   });

//   // Effect to synchronize the theme with `localStorage` and apply it to the document body
//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     document.body.setAttribute('data-theme', theme); // Apply to the body for consistent styling
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//     console.log('theme',theme)
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   };

//   return { theme, toggleTheme };
// }