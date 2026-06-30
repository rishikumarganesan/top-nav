import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import GlobalNav from './nav/GlobalNav'
import PlaceholderPage from './pages/PlaceholderPage'
import styles from './App.module.css'

export default function App() {
  return (
    <HashRouter>
      <GlobalNav />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/dynamic-pricing/pricing-dashboard" replace />} />

          {/* Dynamic Pricing */}
          <Route path="/dynamic-pricing/pricing-dashboard" element={<PlaceholderPage title="Pricing Dashboard" />} />
          <Route path="/dynamic-pricing/pricing-dashboard/listing/:id" element={<PlaceholderPage title="Pricing Dashboard — Listing Detail" listingView />} />
          <Route path="/dynamic-pricing/multi-calendar" element={<PlaceholderPage title="Multi-Calendar" />} />
          <Route path="/dynamic-pricing/manage-listings" element={<PlaceholderPage title="Manage Listings" />} />
          <Route path="/dynamic-pricing/customizations" element={<PlaceholderPage title="Customizations" />} />

          {/* Portfolio Analytics */}
          <Route path="/portfolio-analytics/kpi-historic-reports" element={<PlaceholderPage title="KPI & Historic Reports" />} />
          <Route path="/portfolio-analytics/pacing-reports" element={<PlaceholderPage title="Pacing Reports" />} />
          <Route path="/portfolio-analytics/owner-analytics" element={<PlaceholderPage title="Owner Analytics" />} />
          <Route path="/portfolio-analytics/booking-reports" element={<PlaceholderPage title="Booking Reports" />} />
          <Route path="/portfolio-analytics/report-builder" element={<PlaceholderPage title="Report Builder" />} />
          <Route path="/portfolio-analytics/popular-reports" element={<PlaceholderPage title="Popular Reports" />} />

          {/* Market Research */}
          <Route path="/market-research/market-dashboard" element={<PlaceholderPage title="Market Dashboard" />} />
          <Route path="/market-research/revenue-estimator" element={<PlaceholderPage title="Revenue Estimator" />} />

          {/* Listing Optimizer */}
          <Route path="/listing-optimizer" element={<PlaceholderPage title="Listing Optimizer" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </HashRouter>
  )
}
