import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExperts } from '../api/client'
import useAsyncData from '../components/useAsyncData'

function ExpertListPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const limit = 6

  const query = useMemo(() => ({ search, category, page, limit }), [search, category, page])

  const { data, loading, error, reload } = useAsyncData(() => getExperts(query), [query])

  const experts = data?.data ?? []
  const pagination = data?.pagination
  const categories = [...new Set((data?.data ?? []).map((item) => item.category))]

  const onFilterChange = (value) => {
    setCategory(value)
    setPage(1)
  }

  const onSearchSubmit = (event) => {
    event.preventDefault()
    setPage(1)
    reload()
  }

  return (
    <section className="page page-list">
      <div className="hero">
        <div>
          <p className="eyebrow">Discover Specialists</p>
          <h2>Find an Expert</h2>
        </div>
        {pagination && <p className="hero-meta">{pagination.total} experts available</p>}
      </div>

      <form className="filters" onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select value={category} onChange={(event) => onFilterChange(event.target.value)}>
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">Apply</button>
      </form>

      {loading && <p className="status">Loading experts...</p>}
      {error && (
        <p className="status error">
          Failed to load experts: {error}. <button onClick={reload}>Retry</button>
        </p>
      )}

      {!loading && !error && experts.length === 0 && <p className="status">No experts found.</p>}

      <div className="grid">
        {experts.map((expert) => (
          <article className="card expert-card" key={expert._id}>
            <h3>{expert.name}</h3>
            <p className="meta">
              <strong>Category:</strong> {expert.category}
            </p>
            <p className="meta">
              <strong>Experience:</strong> {expert.experience} years
            </p>
            <p className="meta">
              <strong>Rating:</strong> {expert.rating} / 5
            </p>
            <Link className="text-link" to={`/experts/${expert._id}`}>
              View Details
            </Link>
          </article>
        ))}
      </div>

      {pagination && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default ExpertListPage
