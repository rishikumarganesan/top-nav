import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import type { NavSubtab, ActionItem } from './navConfig'
import Button from './primitives/Button'
import IconButton from './primitives/IconButton'
import BetaTag from './primitives/BetaTag'
import styles from './SubtabBar.module.css'

function ActionCluster({ actions }: { actions: ActionItem[] }) {
  return (
    <div className={styles.actions}>
      {actions.map((action, i) => {
        if (action.kind === 'button') {
          return (
            <Button
              key={i}
              label={action.label}
              icon={action.icon}
              variant={action.variant}
              dropdown={action.dropdown}
            />
          )
        }
        if (action.kind === 'icon-button') {
          return <IconButton key={i} icon={action.icon} title={action.title} />
        }
        if (action.kind === 'metadata') {
          return (
            <div key={i} className={styles.metaLabel}>
              <span className={styles.metaTop}>{action.topLabel}</span>
              <span className={styles.metaBottom}>{action.bottomLabel}</span>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

const MORE_BTN_WIDTH = 86 // px reserved for the "More ▾" control

/**
 * Measures the subtab row and returns the set of subtab ids that should be
 * collapsed into the "More" dropdown because they don't fit. The active subtab
 * is always kept in the visible row.
 */
function useSubtabOverflow(
  subtabs: NavSubtab[],
  activeSubtabId: string | undefined,
) {
  const navRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const [overflowIds, setOverflowIds] = useState<string[]>([])

  const measure = () => {
    const nav = navRef.current
    const list = listRef.current
    if (!nav || !list) return

    const bar = nav.parentElement // #subtab-bar
    if (!bar) return

    const barInner = bar.clientWidth - 24 // minus 0 12px padding
    const actionsW = actionsRef.current?.offsetWidth ?? 0

    const tabEls = Array.from(list.children) as HTMLElement[]
    const widths = tabEls.map(el => el.offsetWidth)
    const totalTabs = widths.reduce((a, b) => a + b, 0)

    // Everything fits → no overflow.
    if (totalTabs + actionsW + 12 <= barInner) {
      setOverflowIds([])
      return
    }

    const available = barInner - actionsW - 12 - MORE_BTN_WIDTH
    let used = 0
    let fit = 0
    for (const w of widths) {
      if (used + w <= available) {
        used += w
        fit++
      } else break
    }
    fit = Math.max(fit, 1)

    const visible = new Set<number>()
    for (let i = 0; i < fit; i++) visible.add(i)

    const activeIdx = subtabs.findIndex(s => s.id === activeSubtabId)
    if (activeIdx >= 0 && !visible.has(activeIdx)) {
      visible.delete(fit - 1) // free a slot for the active tab
      visible.add(activeIdx)
    }

    const overflow = subtabs.filter((_, i) => !visible.has(i)).map(s => s.id)
    setOverflowIds(overflow)
  }

  // Re-measure on layout (subtab/module change) and on resize.
  useLayoutEffect(() => {
    measure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtabs, activeSubtabId])

  useEffect(() => {
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtabs, activeSubtabId])

  return { navRef, listRef, actionsRef, overflowIds }
}

type Props = {
  subtabs: NavSubtab[]
  activeSubtabId: string | undefined
  onSubtabClick: (id: string) => void
}

export default function SubtabBar({ subtabs, activeSubtabId, onSubtabClick }: Props) {
  const activeSubtab = subtabs.find(s => s.id === activeSubtabId)
  const [menuOpen, setMenuOpen] = useState(false)
  const { navRef, listRef, actionsRef, overflowIds } = useSubtabOverflow(subtabs, activeSubtabId)

  const overflowSet = new Set(overflowIds)
  const overflowTabs = subtabs.filter(s => overflowSet.has(s.id))
  const overflowHasActive = overflowTabs.some(s => s.id === activeSubtabId)

  // Close the More menu on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${styles.moreWrap}`)) setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Collapse the menu whenever the visible selection changes.
  useEffect(() => setMenuOpen(false), [activeSubtabId, subtabs])

  return (
    <div className={styles.bar}>
      <nav ref={navRef} className={styles.nav} aria-label="Section navigation">
        <ul ref={listRef} className={styles.list} role="tablist">
          {subtabs.map(tab => {
            const isActive = tab.id === activeSubtabId
            const hidden = overflowSet.has(tab.id)
            return (
              <li key={tab.id} role="none" className={hidden ? styles.hiddenTab : undefined}>
                <button
                  role="tab"
                  type="button"
                  className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                  onClick={() => onSubtabClick(tab.id)}
                  aria-selected={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={hidden ? -1 : 0}
                >
                  <i className={`fa-regular fa-${tab.icon} ${styles.tabIcon}`} aria-hidden="true" />
                  <span className={styles.tabLabel}>{tab.label}</span>
                  {tab.beta && <BetaTag />}
                  {tab.labelDropdown && (
                    <i className="fa-solid fa-caret-down" aria-hidden="true" style={{ fontSize: 10, marginLeft: 2 }} />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {overflowTabs.length > 0 && (
          <div className={styles.moreWrap}>
            <button
              type="button"
              className={`${styles.moreBtn} ${overflowHasActive ? styles.moreActive : ''}`}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span>More</span>
              <span className={styles.countBadge}>{overflowTabs.length}</span>
              <i className="fa-solid fa-caret-down" aria-hidden="true" style={{ fontSize: 10 }} />
            </button>
            {menuOpen && (
              <div className={styles.moreMenu} role="menu">
                {overflowTabs.map(tab => {
                  const isActive = tab.id === activeSubtabId
                  return (
                    <button
                      key={tab.id}
                      role="menuitem"
                      type="button"
                      className={`${styles.moreItem} ${isActive ? styles.moreItemActive : ''}`}
                      onClick={() => {
                        onSubtabClick(tab.id)
                        setMenuOpen(false)
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <i className={`fa-regular fa-${tab.icon} ${styles.tabIcon}`} aria-hidden="true" />
                      <span>{tab.label}</span>
                      {tab.beta && <BetaTag />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </nav>

      {activeSubtab && activeSubtab.actions.length > 0 && (
        <div ref={actionsRef}>
          <ActionCluster actions={activeSubtab.actions} />
        </div>
      )}
    </div>
  )
}
