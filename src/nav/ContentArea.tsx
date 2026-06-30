import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ContentArea.module.css'

/**
 * Wraps the routed page body. On every route change it shows a loader
 * *scoped to this region only* — the surrounding GlobalNav shell never
 * unmounts or reloads. This is the key difference from a full page refresh:
 * the nav stays put, only the panel under the active tab swaps.
 *
 * The async delay here is a stand-in for a real data fetch. Replace
 * `simulateFetch` with your actual loader (React Query, route loaders, etc.)
 * and the same UX holds.
 */
function simulateFetch(): Promise<void> {
  return new Promise(resolve => {
    const ms = 350 + Math.random() * 300
    setTimeout(resolve, ms)
  })
}

export default function ContentArea({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    // Skip the very first paint so the initial load doesn't double-flash.
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    let active = true
    setLoading(true)
    simulateFetch().then(() => {
      if (active) setLoading(false)
    })
    return () => {
      active = false
    }
  }, [location.pathname])

  return (
    <div className={styles.area}>
      {children}
      {loading && (
        <div className={styles.overlay} role="status" aria-live="polite">
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles.srOnly}>Loading…</span>
        </div>
      )}
    </div>
  )
}
