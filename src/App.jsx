import './App.css'
import React, { useState } from 'react'
import { useAlertStream } from './hooks/useAlertStream'
import { AlertsTable } from './components/AlertsTable'
import { AlertDetailsPanel } from './components/AlertDetailsPanel'
import { Navbar } from './components/Navbar'
import { AlertsFilters } from './components/AlertsFilters'

import { SEVERITIES, THREAT_TYPES, IPS } from '@/hooks/useAlertStream'
import {STATUSES} from '@/components/AlertsTable'

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

      <AlertsTable
        alerts={alerts}
        onRowClick={handleRowClick}
        filters={filters}
      />

      <AlertDetailsPanel
        alert={selectedAlert}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onUpdateStatus={updateAlertStatus}
      />
    </div>
  )
}
