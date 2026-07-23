import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { buttonVariants } from '@/components/ui/button'

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
      <PopoverTrigger className={buttonVariants({ variant: 'outline' })}>
        {value ?? allLabel}
      </PopoverTrigger>

      <PopoverContent>
        <button type="button" onClick={() => onChange(filterKey, null)}>
          {allLabel}
        </button>

        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(filterKey, option)}
          >
            {option}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
