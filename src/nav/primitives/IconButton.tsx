import styles from './IconButton.module.css'

type Props = {
  icon: string
  title: string
  onClick?: () => void
}

export default function IconButton({ icon, title, onClick }: Props) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      type="button"
      title={title}
      aria-label={title}
    >
      <i className={`fa-solid fa-${icon}`} aria-hidden="true" />
    </button>
  )
}
