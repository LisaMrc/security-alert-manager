import './App.css'
import { useState } from "react";
import { useAlertStream } from "./hooks/useAlertStream";
import { AlertsTable } from "./components/AlertsTable";
import { AlertDetailsPanel } from "./components/AlertDetailsPanel";
import { Navbar } from "./components/Navbar";


export default function App() {
  const { alerts, updateAlertStatus } = useAlertStream();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  function handleRowClick(alert) {
    setSelectedAlert(alert);
    setPanelOpen(true);
  }

  return (
    <div>
      <Navbar />
      <AlertsTable alerts={alerts} onRowClick={handleRowClick} />
      <AlertDetailsPanel
        alert={selectedAlert}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onUpdateStatus={updateAlertStatus}
      />
    </div>
  );
}
