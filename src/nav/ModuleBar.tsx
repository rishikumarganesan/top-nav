import type { NavModule } from './navConfig'
import styles from './ModuleBar.module.css'

// PriceLabs logo – placeholder SVG until the real asset is supplied
function PlLogo() {
  return (
    <svg
      width="77"
      height="22"
      viewBox="0 0 77 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PriceLabs"
    >
      <circle cx="11" cy="11" r="10" fill="#F37579" />
      <text x="25" y="15" fill="#fff" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="600">
        PriceLabs
      </text>
    </svg>
  )
}

type Props = {
  modules: NavModule[]
  activeModuleId: string
  onModuleClick: (id: string) => void
}

export default function ModuleBar({ modules, activeModuleId, onModuleClick }: Props) {
  return (
    <div className={styles.bar} role="menubar" aria-label="Module navigation">
      <div className={styles.logo} aria-hidden="true">
        <PlLogo />
      </div>

      <ul className={styles.list} role="none">
        {modules.map(mod => {
          const isActive = mod.id === activeModuleId
          return (
            <li key={mod.id} role="none">
              <button
                role="menuitem"
                type="button"
                className={`${styles.item} ${isActive ? styles.active : ''}`}
                onClick={() => onModuleClick(mod.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <i
                  className={`fa-solid fa-${mod.icon} ${styles.moduleIcon}`}
                  aria-hidden="true"
                />
                <span className={styles.moduleLabel}>{mod.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
