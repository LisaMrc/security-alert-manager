import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AlertsFilters({
  label,
  allLabel,
  filterKey,
  value,
  options,
  onChange,
}) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        {value ?? allLabel}
      </PopoverTrigger>

      <PopoverContent className="w-48 p-1 flex flex-col gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn('justify-start', value === null && 'bg-accent')}
          onClick={() => onChange(filterKey, null)}
        >
          {allLabel}
        </Button>

        {options.map((option) => (
          <Button
            key={option}
            variant="ghost"
            size="sm"
            className={cn('justify-start', value === option && 'bg-accent')}
            onClick={() => onChange(filterKey, option)}
          >
            {option}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
