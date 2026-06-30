export type ActionItem =
  | { kind: 'button'; label: string; icon?: string; variant?: 'primary' | 'secondary'; dropdown?: boolean }
  | { kind: 'icon-button'; icon: string; title: string }
  | { kind: 'metadata'; topLabel: string; bottomLabel: string }

/** Row 3 – only the listing single-view variant is used as a full third row */
export type ContextBarConfig = {
  variant: 'listing'
}

export type NavSubtab = {
  id: string
  label: string
  icon: string
  beta?: boolean
  /** dropdown caret after label text (e.g. Popular Reports ▾) */
  labelDropdown?: boolean
  /** right-side action cluster shown in Row 2 */
  actions: ActionItem[]
  /** when present, Row 3 appears for this subtab's detail views */
  contextBar?: ContextBarConfig
}

export type NavModule = {
  id: string
  label: string
  /** FA6 Free icon name (without fa- prefix) */
  icon: string
  subtabs: NavSubtab[]
}

// ---------------------------------------------------------------------------
// Config data
// ---------------------------------------------------------------------------

export const navModules: NavModule[] = [
  {
    id: 'dynamic-pricing',
    label: 'Dynamic Pricing',
    icon: 'fire-flame-curved', // FA6 Free Solid ✓
    subtabs: [
      {
        id: 'pricing-dashboard',
        label: 'Pricing Dashboard',
        icon: 'dollar-sign',
        actions: [
          { kind: 'button', label: 'Add/Reconnect Listings', icon: 'circle-plus', variant: 'secondary' },
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
        contextBar: { variant: 'listing' },
      },
      {
        id: 'multi-calendar',
        label: 'Multi-Calendar',
        icon: 'calendar',
        actions: [
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'manage-listings',
        label: 'Manage Listings',
        icon: 'house',
        actions: [
          { kind: 'button', label: 'CSV', variant: 'secondary', dropdown: true },
          { kind: 'button', label: 'Filter Listings', icon: 'filter', variant: 'secondary' },
          { kind: 'button', label: 'Group Wizard', icon: 'wand-magic-sparkles', variant: 'secondary' },
          { kind: 'button', label: 'Add/Reconnect Listings', icon: 'circle-plus', variant: 'secondary' },
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'customizations',
        label: 'Customizations',
        icon: 'gear',
        actions: [
          { kind: 'button', label: 'Group Wizard', icon: 'wand-magic-sparkles', variant: 'secondary' },
          { kind: 'button', label: 'Bulk Update', variant: 'secondary', dropdown: true },
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
    ],
  },

  {
    id: 'portfolio-analytics',
    label: 'Portfolio Analytics',
    icon: 'chart-column', // TODO: icon – design uses FA Pro "chart-mixed"; substituted with FA Free "chart-column"
    subtabs: [
      {
        id: 'kpi-historic-reports',
        label: 'KPI & Historic Reports',
        icon: 'dollar-sign',
        actions: [
          { kind: 'icon-button', icon: 'arrows-rotate', title: 'Refresh' },
          { kind: 'button', label: 'Quick Filters', icon: 'filter', variant: 'secondary', dropdown: true },
          { kind: 'button', label: 'Filter Listings', icon: 'filter', variant: 'secondary' },
          { kind: 'button', label: 'Show for All Listings', variant: 'primary' },
          { kind: 'button', label: 'Download PDF', icon: 'cloud-arrow-down', variant: 'secondary' },
          { kind: 'icon-button', icon: 'ellipsis-vertical', title: 'More options' },
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'pacing-reports',
        label: 'Pacing Reports',
        icon: 'calendar',
        actions: [
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'owner-analytics',
        label: 'Owner Analytics',
        icon: 'house',
        beta: true,
        actions: [
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'booking-reports',
        label: 'Booking Reports',
        icon: 'gear',
        actions: [
          { kind: 'metadata', topLabel: 'Last Refreshed', bottomLabel: '10 hours ago' },
          { kind: 'icon-button', icon: 'arrows-rotate', title: 'Refresh' },
          { kind: 'button', label: 'Download', icon: 'cloud-arrow-down', variant: 'secondary' },
          { kind: 'icon-button', icon: 'ellipsis-vertical', title: 'More options' },
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'report-builder',
        label: 'Report Builder',
        icon: 'gear',
        actions: [
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'popular-reports',
        label: 'Popular Reports',
        icon: 'gear',
        labelDropdown: true,
        actions: [
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
    ],
  },

  {
    id: 'market-research',
    label: 'Market Research',
    icon: 'chart-column', // TODO: icon – design uses FA Pro "chart-mixed"
    subtabs: [
      {
        id: 'market-dashboard',
        label: 'Market Dashboard',
        icon: 'dollar-sign',
        actions: [
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
      {
        id: 'revenue-estimator',
        label: 'Revenue Estimator',
        icon: 'calendar',
        actions: [
          { kind: 'metadata', topLabel: '6 Tokens', bottomLabel: 'No Active Plan' },
          { kind: 'icon-button', icon: 'arrows-rotate', title: 'Refresh' },
          { kind: 'button', label: 'Manage Subscription', icon: 'cloud-arrow-down', variant: 'secondary' },
          { kind: 'button', label: 'Add a New Estimate', variant: 'primary' },
          { kind: 'icon-button', icon: 'circle-question', title: 'Help' },
        ],
      },
    ],
  },

  {
    id: 'listing-optimizer',
    label: 'Listing Optimizer',
    icon: 'chart-column', // TODO: icon – design uses FA Pro "chart-mixed"
    subtabs: [],
  },
]
