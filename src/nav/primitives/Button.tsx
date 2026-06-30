import styles from './Button.module.css'

type Props = {
  label: string
  icon?: string
  variant?: 'primary' | 'secondary'
  dropdown?: boolean
  onClick?: () => void
}

export default function Button({ label, icon, variant = 'secondary', dropdown, onClick }: Props) {
  return (
    <button
      className={`${styles.btn} ${variant === 'primary' ? styles.primary : styles.secondary}`}
      onClick={onClick}
      type="button"
    >
      {icon && <i className={`fa-solid fa-${icon} ${styles.icon}`} aria-hidden="true" />}
      <span className={styles.label}>{label}</span>
      {dropdown && <i className="fa-solid fa-caret-down" aria-hidden="true" style={{ fontSize: 10 }} />}
    </button>
  )
}
