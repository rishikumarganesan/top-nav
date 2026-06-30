import styles from './Toggle.module.css'

type Props = {
  checked: boolean
  onChange: (val: boolean) => void
  label: string
}

export default function Toggle({ checked, onChange, label }: Props) {
  return (
    <label className={styles.root}>
      <span className={`${styles.track} ${checked ? styles.on : styles.off}`}>
        <span className={`${styles.thumb} ${checked ? styles.thumbOn : ''}`} />
      </span>
      <input
        type="checkbox"
        role="switch"
        aria-checked={checked}
        className={styles.input}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className={styles.label}>{label}</span>
    </label>
  )
}
