export function AlertsCounter({ count }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t bg-gray-100 px-8 py-2 text-lg text-muted-foreground">
      {count} alert(s)
    </div>
  )
}