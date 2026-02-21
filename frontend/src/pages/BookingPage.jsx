import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createBooking, getExpertById } from '../api/client'
import useAsyncData from '../components/useAsyncData'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  timeSlot: '',
  notes: '',
}

function BookingPage() {
  const { expertId } = useParams()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { data: expert, loading, error, reload } = useAsyncData(() => getExpertById(expertId), [expertId])

  const timeSlots = useMemo(() => {
    if (!form.date || !expert?.availableSlotsByDate) return []
    const found = expert.availableSlotsByDate.find((row) => row.date === form.date)
    return found ? found.slots : []
  }, [form.date, expert])

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Valid email is required'
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required'
    if (!form.date) nextErrors.date = 'Date is required'
    if (!form.timeSlot) nextErrors.timeSlot = 'Time slot is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'date') {
      setForm((prev) => ({ ...prev, date: value, timeSlot: '' }))
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')

    if (!validate()) return

    try {
      setSubmitting(true)
      await createBooking({
        expertId,
        ...form,
      })
      setSubmitMessage('Booking created successfully.')
      setForm(initialForm)
      await reload()
    } catch (err) {
      setSubmitMessage(err.response?.data?.message || 'Failed to create booking')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="status">Loading booking form...</p>
  if (error) return <p className="status error">{error}</p>

  return (
    <section className="page booking-page">
      <p className="eyebrow">Secure Your Slot</p>
      <h2>Book Session with {expert?.name}</h2>

      <form className="form booking-form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} />
          {errors.name && <small className="error">{errors.name}</small>}
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={onChange} />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </label>

        <label>
          Date
          <select name="date" value={form.date} onChange={onChange}>
            <option value="">Select a date</option>
            {expert?.availableSlotsByDate?.map((group) => (
              <option key={group.date} value={group.date}>
                {group.date}
              </option>
            ))}
          </select>
          {errors.date && <small className="error">{errors.date}</small>}
        </label>

        <label>
          Time Slot
          <select name="timeSlot" value={form.timeSlot} onChange={onChange}>
            <option value="">Select a slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.time} value={slot.time} disabled={slot.booked}>
                {slot.time} {slot.booked ? '(Booked)' : ''}
              </option>
            ))}
          </select>
          {errors.timeSlot && <small className="error">{errors.timeSlot}</small>}
        </label>

        <label>
          Notes
          <textarea name="notes" value={form.notes} onChange={onChange} rows="4" />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>

      {submitMessage && <p className="status">{submitMessage}</p>}
    </section>
  )
}

export default BookingPage
