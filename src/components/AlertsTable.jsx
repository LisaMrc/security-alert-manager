import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, slice } from "react";

const severityStyles = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const statusStyles = {
  active: "bg-blue-100 text-blue-700",
  banned: "bg-red-100 text-red-700",
  ignored: "bg-slate-100 text-slate-500",
};

function formatDate(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AlertsTable({ alerts, onRowClick }) {
  // Sorting - didn't use TanStackTable to prevent over-engineering
  const [sortConfig, setSortConfig] = useState({ key: "timestamp", direction: "desc" });

  function handleSort(key) {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  const sortedAlerts = [...alerts].sort((a, b) => {
    const { key, direction } = sortConfig;
    const factor = direction === "asc" ? 1 : -1;
    if (a[key] < b[key]) return -1 * factor;
    if (a[key] > b[key]) return 1 * factor;
    return 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead onClick={() => handleSort("severity")} className="cursor-pointer">
            Severity {sortConfig.key === "severity" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead>Threat type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>IP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedAlerts.map((alert) => (
          <TableRow key={alert.id} onClick={() => onRowClick(alert)} className="cursor-pointer">
            <TableCell className="font-medium">{alert.id.slice(0, 8)}</TableCell>
            <TableCell>
              <Badge className={severityStyles[alert.severity]}>{alert.severity}</Badge>
            </TableCell>
            <TableCell>{alert.threat_type}</TableCell>
            <TableCell>
              <Badge className={statusStyles[alert.status]}>{alert.status}</Badge>
            </TableCell>
            <TableCell>{formatDate(alert.timestamp)}</TableCell>
            <TableCell className="font-mono">{alert.ip}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{alerts.length} alerts</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
