import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendIndicatorProps {
  value: number
  label?: string
  reverseColors?: boolean
  className?: string
}

export function TrendIndicator({ value, label, reverseColors = false, className }: TrendIndicatorProps) {
  const isPositive = value > 0
  const isNeutral = value === 0

  const getColorClass = () => {
    if (isNeutral) return "text-text-secondary"

    if (reverseColors) {
      return isPositive ? "text-[#fe6d73]" : "text-[#17c3b2]"
    } else {
      return isPositive ? "text-[#17c3b2]" : "text-[#fe6d73]"
    }
  }

  return (
    <div className={cn("flex items-center gap-1 text-sm", getColorClass(), className)}>
      {isNeutral ? (
        <Minus className="h-4 w-4" />
      ) : isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      <span>
        {value > 0 ? "+" : ""}
        {value}% {label || ""}
      </span>
    </div>
  )
}
