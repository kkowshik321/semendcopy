import React, { memo, useEffect, useRef } from 'react'

function levelClass(level) {
  if (!level) return ''
  return `log-item--${level}`
}

function LogItem({ log, focused, tabIndex }) {
  const ref = useRef(null)

  useEffect(() => {
    if (focused && ref.current) ref.current.focus()
  }, [focused])

  return (
    <div
      ref={ref}
      className={`log-item ${levelClass(log.level)}`}
      role="listitem"
      tabIndex={tabIndex}
      aria-label={`${log.level} at ${log.ts}: ${log.message}`}
    >
      <div className="log-item__meta">
        <span className="log-item__ts">{new Date(log.ts).toLocaleTimeString()}</span>
        <span className="log-item__level">{log.level}</span>
        <span className="log-item__user">{log.meta?.user}</span>
      </div>
      <div className="log-item__msg">{log.message}</div>
    </div>
  )
}

export default memo(LogItem)
