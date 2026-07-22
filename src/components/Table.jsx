import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

export function AlertsTable({ alerts, onUpdateStatus }) {
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
