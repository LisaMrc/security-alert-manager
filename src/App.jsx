import './App.css'
import React, { useState } from 'react'
import { useAlertStream } from './hooks/useAlertStream'
import { AlertsTable } from './components/AlertsTable'
import { AlertDetailsPanel } from './components/AlertDetailsPanel'
import { Navbar } from './components/Navbar'
import { AlertsFilters } from './components/AlertsFilters'

export default function App() {
  const { alerts, updateAlertStatus } = useAlertStream()
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState(null)

  function handleRowClick(alert) {
    setSelectedAlert(alert)
    setPanelOpen(true)
  }

  return (
    <div>
      <Navbar />

      <AlertsFilters
        selectedSeverity={selectedSeverity}
        onSeverityChange={setSelectedSeverity}
      />

      <AlertsTable
        alerts={alerts}
        onRowClick={handleRowClick}
        selectedSeverity={selectedSeverity}
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
