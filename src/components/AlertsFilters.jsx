import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { buttonVariants } from '@/components/ui/button'
import { SEVERITIES } from '@/hooks/useAlertStream'

export function AlertsFilters({ 
    selectedSeverity, 
    onSeverityChange,
}) {
  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: 'outline' })}>
        {' '}
        {selectedSeverity ?? 'All severities'}{' '}
      </PopoverTrigger>

      <PopoverContent>
        {SEVERITIES.map((severity) => (
          <button
            key={severity}
            type="button"
            onClick={() => onSeverityChange(severity)}
          >
            {severity}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
