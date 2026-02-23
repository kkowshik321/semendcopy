import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Filters from '../components/Filters'
import LogList from '../components/LogList'
import Summary from '../components/Summary'

const LEVELS = ['info', 'warn', 'error', 'alert', 'highlight']

function makeLog(id = 0) {
  const level = LEVELS[Math.floor(Math.random() * LEVELS.length)]
  return {
    id: `${Date.now()}-${id}`,
    ts: new Date().toISOString(),
    level,
    message: `Sample ${level} message #${id}`,
    meta: { user: `user${(id % 20) + 1}`, path: `/app/route/${id % 10}` },
  }
}

export default function ActivityDashboard() {
  const { category = 'all' } = useParams()
  const [logs, setLogs] = useState(() => {
    // seed with a moderate number of logs for demo
    const seed = []
    for (let i = 0; i < 200; i++) seed.push(makeLog(i))
    return seed
  })

  const bufferRef = useRef([])
  const timerRef = useRef(null)

  // controlled filters
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('')

  // simulate incoming logs and batch updates for performance
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      bufferRef.current.push(makeLog(i++))
      // flush every 200ms
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          const toAdd = bufferRef.current.splice(0)
          setLogs((prev) => {
            // keep a capped history for demo; in production use virtualization
            const merged = prev.concat(toAdd)
            return merged.length > 20000 ? merged.slice(-15000) : merged
          })
          clearTimeout(timerRef.current)
          timerRef.current = null
        }, 200)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [])

  const onSearchChange = useCallback((value) => setSearch(value), [])
  const onLevelChange = useCallback((value) => setLevelFilter(value), [])

  const filtered = useMemo(() => {
    let items = logs
    if (category && category !== 'all') {
      items = items.filter((l) => l.level === category || (category === 'errors' && l.level === 'error'))
    }
    if (levelFilter) items = items.filter((l) => l.level === levelFilter)
    if (search) {
      const q = search.toLowerCase()
      items = items.filter((l) => l.message.toLowerCase().includes(q) || l.meta.user.toLowerCase().includes(q))
    }
    // render most recent first
    return items.slice().reverse()
  }, [logs, search, levelFilter, category])

  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-left">
        <h2 id="dashboard-title">Activity Log — {category}</h2>
        <Filters
          search={search}
          onSearchChange={onSearchChange}
          level={levelFilter}
          onLevelChange={onLevelChange}
        />
        <Summary logs={logs} filteredCount={filtered.length} />
      </div>

      <div className="dashboard-right">
        <LogList logs={filtered} />
      </div>
    </section>
  )
}
