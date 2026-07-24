import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useState, useMemo } from 'react'
import { severityStyles, statusStyles, STATUSES } from '@/lib/alertStyles'

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function AlertsTable({ alerts, onRowClick, filters }) {
  //   Filtering
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === null) return true

        return alert[key] === value
      })
    })
  }, [alerts, filters])

  // Sorting - didn't use TanStackTable to prevent over-engineering
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'asc',
  })

  function handleSort(key) {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortedAlerts = useMemo(() => {
    return [...filteredAlerts].sort((a, b) => {
      const { key, direction } = sortConfig
      const factor = direction === 'asc' ? 1 : -1

      if (a[key] < b[key]) return -1 * factor
      if (a[key] > b[key]) return 1 * factor
      return 0
    })
  }, [filteredAlerts, sortConfig])

  function SortableHead({ label, sortKey, sortConfig, onSort }) {
    const isActive = sortConfig.key === sortKey
    return (
      <TableHead onClick={() => onSort(sortKey)} className="cursor-pointer">
        {label}
        <span className={`inline-block w-4 ${isActive ? '' : 'opacity-0'}`}>
          {sortConfig.direction === 'asc' ? '↑' : '↓'}
        </span>
      </TableHead>
    )
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <SortableHead
              label="Severity"
              sortKey="severity"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHead
              label="Threat type"
              sortKey="threat_type"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHead
              label="Status"
              sortKey="status"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHead
              label="Date"
              sortKey="timestamp"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHead
              label="IP"
              sortKey="ip"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedAlerts.map((alert) => (
            <TableRow
              key={alert.id}
              onClick={() => onRowClick(alert)}
              className="cursor-pointer animate-in fade-in duration-500"
            >
              <TableCell className="font-medium">
                {alert.id.slice(0, 8)}
              </TableCell>
              <TableCell>
                <Badge className={severityStyles[alert.severity]}>
                  {alert.severity}
                </Badge>
              </TableCell>
              <TableCell>{alert.threat_type}</TableCell>
              <TableCell>
                <Badge className={statusStyles[alert.status]}>
                  {alert.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(alert.timestamp)}</TableCell>
              <TableCell className="font-mono">{alert.ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
