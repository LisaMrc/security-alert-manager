import "./App.css";
import Navbar from "./components/Navbar";
import { AlertsTable } from "./components/Table";
import { useAlertStream } from "./hooks/useAlertStream";

export default function App() {
  const { alerts, updateAlertStatus } = useAlertStream();

  return (
    <div>
      <Navbar />
      <AlertsTable alerts={alerts} onUpdateStatus={updateAlertStatus} />
    </div>
  );
}
