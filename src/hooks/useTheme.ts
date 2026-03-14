import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

/*
  Simple shared-theme hook: maintains a module-level theme value
  and updates all hook subscribers when toggled. This avoids
  separate state objects in every component.
*/

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
let currentTheme: Theme = 'light'
const listeners = new Set<React.Dispatch<React.SetStateAction<Theme>>>()

function applyTheme(theme: Theme) {
  const root = document.documentElement
  console.log('[applyTheme] setting theme to:', theme)
  if (theme === 'dark') {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }
  console.log('[applyTheme] classes now:', Array.from(root.classList))
  console.log('[applyTheme] dark class present?', root.classList.contains('dark'))
}

// initialize from storage or media query
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      currentTheme = stored as Theme
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark'
    }
  } catch {
    // ignore
  }
  console.log('[useTheme] initial theme', currentTheme)
  applyTheme(currentTheme)
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Apply theme to DOM on initial mount and when theme changes via state
  useLayoutEffect(() => {
    console.log('[useTheme] useLayoutEffect - applying theme:', theme)
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    // register listener for cross-component updates
    listeners.add(setTheme)
    return () => {
      listeners.delete(setTheme)
    }
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = currentTheme === 'dark' ? 'light' : 'dark'
    console.log('[useTheme] toggle called, switching to:', next)
    currentTheme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    // Notify all listeners to update their state
    listeners.forEach((ln) => ln(next))
  }, [])

  return { theme, toggle }
}
