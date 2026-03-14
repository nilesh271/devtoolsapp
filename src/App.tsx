import './App.css'
import { Routes, Route } from 'react-router-dom'
import useTheme from './hooks/useTheme'
import Header from './components/Header/Header'
import MaterialSidebar from './components/SideNavigation/SideNavigation'
import JsonFormatter from './pages/JsonFormatter'
import JwtDecoder from './pages/JwtDecoder'
import UuidGenerator from './pages/UuidGenerator'

function App() {
  // access hook to ensure initial theme application
  useTheme()

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <MaterialSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/tools/uuid" element={<UuidGenerator />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to DevTools</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Select a tool from the sidebar to get started.
      </p>
    </div>
  )
}

export default App
