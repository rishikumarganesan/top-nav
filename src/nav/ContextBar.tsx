import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toggle from './primitives/Toggle'
import Button from './primitives/Button'
import IconButton from './primitives/IconButton'
import styles from './ContextBar.module.css'

type ListingInfo = {
  title: string
  subtitle: string
}

type Props = {
  listing?: ListingInfo
  onBack?: () => void
}

const defaultListing: ListingInfo = {
  title: 'Sea Facing Costal Get Away',
  subtitle: '2 Bedroom | Menamkulam | Airbnb ID',
}

export default function ContextBar({ listing = defaultListing, onBack }: Props) {
  const navigate = useNavigate()
  const [syncEnabled, setSyncEnabled] = useState(false)

  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <div className={styles.bar} role="toolbar" aria-label="Listing context">
      <div className={styles.inner}>
        {/* Left: back + listing info */}
        <div className={styles.left}>
          <IconButton icon="arrow-left" title="Back to listings" onClick={handleBack} />
          <div className={styles.listingInfo}>
            <span className={styles.listingTitle}>{listing.title}</span>
            <span className={styles.listingSubtitle}>{listing.subtitle}</span>
          </div>
        </div>

        {/* Right: toggle + actions */}
        <div className={styles.right}>
          <Toggle
            checked={syncEnabled}
            onChange={setSyncEnabled}
            label="Enable Price Sync"
          />
          <Button label="Sync Now" variant="primary" />
          <IconButton icon="arrow-left" title="Previous listing" />
          <IconButton icon="arrow-right" title="Next listing" />
          <IconButton icon="circle-question" title="Help" />
        </div>
      </div>
    </div>
  )
}
