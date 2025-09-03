import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "running" | "stopped" | "warning" | "critical"
  children?: ReactNode
  className?: string
}

const getStatusClasses = (status: "running" | "stopped" | "warning" | "critical") => {
  switch (status) {
    case "running":
      return "status-healthy"
    case "warning":
      return "status-warning"
    case "critical":
    case "stopped":
      return "status-critical"
    default:
      return ""
  }
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-medium capitalize transition-colors duration-200",
        getStatusClasses(status),
        className
      )}
    >
      <div className={cn(
        "w-2 h-2 rounded-full mr-1.5",
        status === "running" ? "bg-success animate-pulse-slow" :
        status === "warning" ? "bg-warning animate-pulse-slow" :
        "bg-destructive animate-pulse-slow"
      )} />
      {children || status}
    </Badge>
  )
}