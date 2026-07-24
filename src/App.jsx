import { Toaster } from '@/components/ui/sonner'
import { IPS, SEVERITIES, THREAT_TYPES } from '@/hooks/useAlertStream'
import { STATUSES } from '@/lib/alertStyles'
import { useState } from 'react'
import './App.css'
import { AlertDetailsPanel } from './components/AlertDetailsPanel'
import { AlertsCounter } from './components/AlertsCounter'
import { AlertsFilters } from './components/AlertsFilters'
import { AlertsTable } from './components/AlertsTable'
import { Navbar } from './components/Navbar'
import { useAlertStream } from './hooks/useAlertStream'

export default function App() {
  const { alerts, updateAlertStatus } = useAlertStream()

  //   Panel
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  function handleRowClick(alert) {
    setSelectedAlert(alert)
    setPanelOpen(true)
  }

  //   Filters
  const [filters, setFilters] = useState({
    severity: null,
    ip: null,
    threat_type: null,
    status: null,
  })

  function handleFilterChange(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div>
      <Navbar />
      <div className="px-8 py-6 flex flex-col gap-6 pb-16">
        <div className="flex gap-3">
          <AlertsFilters
            label="Severity"
            allLabel="All severities"
            filterKey="severity"
            value={filters.severity}
            options={SEVERITIES}
            onChange={handleFilterChange}
          />

          <AlertsFilters
            label="Threat type"
            allLabel="All threat types"
            filterKey="threat_type"
            value={filters.threat_type}
            options={THREAT_TYPES}
            onChange={handleFilterChange}
          />

          <AlertsFilters
            label="IP"
            allLabel="All IPs"
            filterKey="ip"
            value={filters.ip}
            options={IPS}
            onChange={handleFilterChange}
          />

          <AlertsFilters
            label="Status"
            allLabel="All statuses"
            filterKey="status"
            value={filters.status}
            options={STATUSES}
            onChange={handleFilterChange}
          />
        </div>

        <AlertsTable
          alerts={alerts}
          onRowClick={handleRowClick}
          filters={filters}
        />
      </div>

      {/* Elements out of the page flow */}
      <AlertsCounter count={alerts.length} />

      <AlertDetailsPanel
        alert={selectedAlert}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onUpdateStatus={updateAlertStatus}
      />

      <Toaster
        toastOptions={{
          classNames: {
            success: '!bg-white !text-green-600 !border-green-200',
            error: '!bg-white !text-red-600 !border-red-200',
            description: '!text-gray-600',
          },
        }}
      />
    </div>
  )
}
