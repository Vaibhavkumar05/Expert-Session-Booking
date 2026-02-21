import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getExpertById } from '../api/client'
import socket from '../api/socket'
import useAsyncData from '../components/useAsyncData'

function ExpertDetailPage() {
  const { id } = useParams()
  const { data: expert, loading, error, reload, setData } = useAsyncData(() => getExpertById(id), [id])

  useEffect(() => {
    if (!id) return undefined

    socket.emit('joinExpertRoom', id)

    const handleSlotBooked = ({ expertId, date, timeSlot }) => {
      if (expertId !== id) return

      setData((prev) => {
        if (!prev) return prev

        const next = { ...prev }
        next.availableSlotsByDate = prev.availableSlotsByDate.map((group) => {
          if (group.date !== date) return group

          return {
            ...group,
            slots: group.slots.map((slot) =>
              slot.time === timeSlot ? { ...slot, booked: true } : slot,
            ),
          }
        })

        return next
      })
    }

    socket.on('slotBooked', handleSlotBooked)

    return () => {
      socket.emit('leaveExpertRoom', id)
      socket.off('slotBooked', handleSlotBooked)
    }
  }, [id, setData])

  if (loading) return <p className="status">Loading expert details...</p>
  if (error) return <p className="status error">{error}</p>
  if (!expert) return null

  return (
    <section className="page detail-page">
      <div className="detail-head">
        <p className="eyebrow">Expert Profile</p>
        <h2>{expert.name}</h2>
      </div>
      <p className="meta">
        <strong>Category:</strong> {expert.category}
      </p>
      <p className="meta">
        <strong>Experience:</strong> {expert.experience} years
      </p>
      <p className="meta">
        <strong>Rating:</strong> {expert.rating} / 5
      </p>
      <p className="bio">{expert.bio}</p>

      <h3>Available Time Slots</h3>
      <div className="slot-groups">
        {expert.availableSlotsByDate?.map((group) => (
          <div className="slot-group" key={group.date}>
            <h4>{group.date}</h4>
            <div className="slots">
              {group.slots.map((slot) => (
                <span className={`slot ${slot.booked ? 'booked' : 'open'}`} key={slot.time}>
                  {slot.time} {slot.booked ? '(Booked)' : '(Available)'}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="actions">
        <Link to={`/book/${expert._id}`}>Book Session</Link>
        <button onClick={reload}>Refresh</button>
      </div>
    </section>
  )
}

export default ExpertDetailPage
