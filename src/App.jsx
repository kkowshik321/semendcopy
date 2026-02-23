import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ActivityDashboard from './pages/ActivityDashboard'
import './App.css'

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Activity Log — Dashboard</h1>
        <nav className="app-nav" aria-label="Main navigation">
          <Link to="/logs/all" className="nav-link">All</Link>
          <Link to="/logs/errors" className="nav-link">Errors</Link>
          <Link to="/logs/alerts" className="nav-link">Alerts</Link>
          <Link to="/logs/highlighted" className="nav-link">Highlights</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/logs/all" replace />} />
          <Route path="/logs/:category" element={<ActivityDashboard />} />
        </Routes>
      </main>
    </div>
  )
}
