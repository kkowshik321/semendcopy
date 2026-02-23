import React, { useMemo } from 'react'

export default function Summary({ logs = [], filteredCount = 0 }) {
  const totals = useMemo(() => {
    const t = { info: 0, warn: 0, error: 0, alert: 0, highlight: 0 }
    for (const l of logs) {
      if (t[l.level] !== undefined) t[l.level]++
    }
    return t
  }, [logs])

  return (
    <div className="summary" role="region" aria-label="Log summary">
      <div className="summary-row"><strong>Total:</strong> {logs.length}</div>
      <div className="summary-row"><strong>Filtered:</strong> {filteredCount}</div>
      <div className="summary-row summary-levels">
        <span className="lv info">Info: {totals.info}</span>
        <span className="lv warn">Warn: {totals.warn}</span>
        <span className="lv error">Error: {totals.error}</span>
        <span className="lv alert">Alert: {totals.alert}</span>
        <span className="lv highlight">Highlight: {totals.highlight}</span>
      </div>
    </div>
  )
}
