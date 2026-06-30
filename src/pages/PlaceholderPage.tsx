import { useNavigate } from 'react-router-dom'
import styles from './PlaceholderPage.module.css'

type Props = {
  title: string
  /** When true, renders as a single-listing detail view (triggers Row 3) */
  listingView?: boolean
}

const MOCK_LISTINGS = [
  { id: '1', name: 'Sea Facing Costal Get Away' },
  { id: '2', name: 'Mountain Retreat Cabin' },
  { id: '3', name: 'Downtown City Loft' },
]

export default function PlaceholderPage({ title, listingView }: Props) {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.sub}>
        {listingView
          ? 'You are viewing a single listing — Row 3 (context bar) is active above.'
          : `This is the ${title} page. Navigation works without a full reload.`}
      </p>

      {!listingView && title === 'Pricing Dashboard' && (
        <div className={styles.listingGrid}>
          <p className={styles.gridHint}>Click a listing to see Row 3 (context bar):</p>
          {MOCK_LISTINGS.map(l => (
            <button
              key={l.id}
              className={styles.listingCard}
              onClick={() => navigate(`/dynamic-pricing/pricing-dashboard/listing/${l.id}`)}
            >
              <i className="fa-solid fa-house" style={{ color: '#7A7A7A', marginRight: 8 }} />
              {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
