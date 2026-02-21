import { Link, Route, Routes } from 'react-router-dom'
import ExpertListPage from './pages/ExpertListPage'
import ExpertDetailPage from './pages/ExpertDetailPage'
import BookingPage from './pages/BookingPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <p className="eyebrow">Consultancy Portal</p>
          <h1>Expert Session Booking</h1>
        </div>
        <nav className="main-nav">
          <Link to="/">Experts</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ExpertListPage />} />
          <Route path="/experts/:id" element={<ExpertDetailPage />} />
          <Route path="/book/:expertId" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
