import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number
  unit?: string
  icon: ReactNode
  trend?: number
  status: "healthy" | "warning" | "critical"
  className?: string
}

const getStatusClasses = (status: "healthy" | "warning" | "critical") => {
  switch (status) {
    case "healthy":
      return "metric-card-success"
    case "warning":
      return "metric-card-warning"
    case "critical":
      return "metric-card-danger"
    default:
      return ""
  }
}

const getProgressClasses = (status: "healthy" | "warning" | "critical") => {
  switch (status) {
    case "healthy":
      return "progress-success"
    case "warning":
      return "progress-warning"
    case "critical":
      return "progress-danger"
    default:
      return "bg-primary"
  }
}

const getStatusColor = (status: "healthy" | "warning" | "critical") => {
  switch (status) {
    case "healthy":
      return "text-success"
    case "warning":
      return "text-warning"
    case "critical":
      return "text-destructive"
    default:
      return "text-primary"
  }
}

export function MetricCard({ 
  title, 
  value, 
  unit = "%", 
  icon, 
  trend, 
  status, 
  className 
}: MetricCardProps) {
  return (
    <Card className={cn(
      "metric-card transition-all duration-300 hover:shadow-medium group",
      getStatusClasses(status),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("transition-colors duration-300", getStatusColor(status))}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className={cn("text-2xl font-bold transition-colors duration-300", getStatusColor(status))}>
            {value.toFixed(1)}{unit}
          </div>
          {trend !== undefined && (
            <div className={cn(
              "text-xs flex items-center",
              trend > 0 ? "text-destructive" : trend < 0 ? "text-success" : "text-muted-foreground"
            )}>
              {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"} {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
        <div className="mt-3">
          <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500 rounded-full", getProgressClasses(status))}
              style={{ width: `${Math.min(value, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}