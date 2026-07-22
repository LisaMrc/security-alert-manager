import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: "8782",
    ip: "8.8.8.8",
    timestamp: "2026-01-12T11:00:00Z",
    severity: "high",
    threat_type: "Brute-Force SSH",
    status: "in_progress",
    is_read: false,
  },
  {
    id: "7878",
    ip: "8.8.8.8",
    timestamp: "2026-01-12T11:00:00Z",
    severity: "low",
    threat_type: "Security Breach",
    status: "backlog",
    is_read: false,
  },
  {
    id: "7839",
    ip: "8.8.8.8",
    timestamp: "2026-01-12T11:00:00Z",
    severity: "medium",
    threat_type: "Other",
    status: "todo",
    is_read: true,
  },
  {
    id: "5562",
    ip: "8.8.8.8",
    timestamp: "2026-01-12T11:00:00Z",
    severity: "critical",
    threat_type: "Other",
    status: "backlog",
    is_read: false,
  },
];

const severityStyles = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const statusLabels = {
  todo: "Todo",
  in_progress: "In Progress",
  backlog: "Backlog",
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

export function AlertsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Threat type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>IP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="font-medium">{alert.id}</TableCell>
            <TableCell>
              <Badge className={severityStyles[alert.severity]}>{alert.severity}</Badge>
            </TableCell>
            <TableCell>{alert.threat_type}</TableCell>
            <TableCell>{statusLabels[alert.status]}</TableCell>
            <TableCell>{formatDate(alert.timestamp)}</TableCell>
            <TableCell className="font-mono">{alert.ip}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{alerts.length} alertes</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
