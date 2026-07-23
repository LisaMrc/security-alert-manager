import { useState, useEffect } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchIpInfo } from "@/lib/ipinfo"

export function AlertDetailsPanel({ alert, open, onOpenChange, onUpdateStatus }) {
  const [ipInfo, setIpInfo] = useState(null)
  const [loadingInfo, setLoadingInfo] = useState(false)
  const [infoError, setInfoError] = useState(null)
  const [actionLoading, setActionLoading] = useState(null) // "ban" | "ignore" | null

  useEffect(() => {
    if (!alert || !open) return
    setIpInfo(null)
    setInfoError(null)
    setLoadingInfo(true)

    fetchIpInfo(alert.ip)
      .then(setIpInfo)
      .catch((err) => setInfoError(err.message))
      .finally(() => setLoadingInfo(false))
  }, [alert, open])

  function handleAction(status, label) {
    setActionLoading(label)
    setTimeout(() => {
      onUpdateStatus(alert.id, status)
      setActionLoading(null)
      onOpenChange(false)
    }, 600) // simule un appel réseau ; remplace par un vrai await si tu branches un backend
  }

  if (!alert) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="w-96">
        <DrawerHeader>
          <DrawerTitle>Alert {alert.id.slice(0, 8)}</DrawerTitle>
          <DrawerDescription>{alert.threat_type}</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">IP address</p>
            <p className="font-mono">{alert.ip}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Severity</p>
            <Badge>{alert.severity}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge>{alert.status}</Badge>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Geolocation & ISP</p>

            {loadingInfo && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}

            {infoError && (
              <p className="text-sm text-destructive">
                Failed to load IP info: {infoError}
              </p>
            )}

            {ipInfo && !loadingInfo && (
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">City:</span> {ipInfo.city || "Unknown"}</p>
                <p><span className="text-muted-foreground">Country:</span> {ipInfo.country || "Unknown"}</p>
                <p><span className="text-muted-foreground">ISP/Org:</span> {ipInfo.org || "Unknown"}</p>
              </div>
            )}
          </div>
        </div>

        <DrawerFooter>
          <Button
            variant="destructive"
            disabled={!!actionLoading}
            onClick={() => handleAction("banned", "ban")}
          >
            {actionLoading === "ban" ? "Banning..." : "Ban IP"}
          </Button>
          <Button
            variant="outline"
            disabled={!!actionLoading}
            onClick={() => handleAction("ignored", "ignore")}
          >
            {actionLoading === "ignore" ? "Ignoring..." : "Ignore alert"}
          </Button>
          <DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}