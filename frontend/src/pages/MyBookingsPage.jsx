import { useState } from 'react'
import { getBookingsByEmail } from '../api/client'

function MyBookingsPage() {
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email')
      return
    }

    try {
      setLoading(true)
      const data = await getBookingsByEmail(email)
      setBookings(data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page bookings-page">
      <p className="eyebrow">Booking Lookup</p>
      <h2>My Bookings</h2>

      <form className="filters" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Fetch</button>
      </form>

      {loading && <p className="status">Loading bookings...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && bookings.length === 0 && <p className="status">No bookings found.</p>}

      <div className="grid">
        {bookings.map((booking) => (
          <article className="card booking-card" key={booking._id}>
            <h3>{booking.expert?.name || 'Expert'}</h3>
            <p className="meta">
              <strong>Date:</strong> {booking.date}
            </p>
            <p className="meta">
              <strong>Time:</strong> {booking.timeSlot}
            </p>
            <p className="meta">
              <strong>Status:</strong> {booking.status}
            </p>
            {booking.notes && (
              <p className="meta">
                <strong>Notes:</strong> {booking.notes}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default MyBookingsPage
