import React, { useCallback, useEffect, useRef, useState } from 'react'
import LogItem from './LogItem'

// Simple performant list renderer with focus management and minimal re-renders
export default function LogList({ logs = [] }) {
  const containerRef = useRef(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    // reset focus when data changes drastically
    setFocusedIndex(-1)
  }, [logs.length])

  const onKeyDown = useCallback((e) => {
    if (!containerRef.current) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((i) => Math.min(i + 1, logs.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((i) => Math.max(i - 1, 0))
    }
  }, [logs.length])

  useEffect(() => {
    const root = containerRef.current
    root && root.addEventListener('keydown', onKeyDown)
    return () => root && root.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      className="log-list"
      ref={containerRef}
      tabIndex={0}
      role="list"
      aria-label={`Activity log list, ${logs.length} items`}
    >
      {logs.length === 0 && <div className="empty">No log entries</div>}
      {logs.map((log, idx) => (
        <LogItem
          key={log.id}
          log={log}
          focused={idx === focusedIndex}
          tabIndex={idx === focusedIndex ? 0 : -1}
        />
      ))}
    </div>
  )
}
