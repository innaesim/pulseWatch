import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MetricCard } from "@/components/ui/metric-card"
import { ProcessTable } from "@/components/ProcessTable"
import { SystemCharts } from "@/components/SystemCharts"
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle, 
  LogOut,
  RefreshCw,
  Bell,
  Shield,
  Activity
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const generateMetricData = () => ({
  cpu: Math.random() * 80 + 10,
  memory: Math.random() * 70 + 20,
  disk: Math.random() * 40 + 45,
  network: Math.random() * 60 + 15,
})

const Dashboard = () => {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState(generateMetricData())
  const [alerts, setAlerts] = useState<Array<{id: string, message: string, type: "warning" | "critical"}>>([])
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const newMetrics = generateMetricData()
      setMetrics(newMetrics)
      setLastUpdate(new Date())

      const newAlerts: Array<{id: string, message: string, type: "warning" | "critical"}> = []
      
      if (newMetrics.cpu > 75) {
        newAlerts.push({
          id: "cpu-critical",
          message: `CPU usage critical: ${newMetrics.cpu.toFixed(1)}%`,
          type: "critical"
        })
      } else if (newMetrics.cpu > 60) {
        newAlerts.push({
          id: "cpu-warning",
          message: `CPU usage high: ${newMetrics.cpu.toFixed(1)}%`,
          type: "warning"
        })
      }

      if (newMetrics.memory > 65) {
        newAlerts.push({
          id: "memory-critical",
          message: `Memory usage critical: ${newMetrics.memory.toFixed(1)}%`,
          type: "critical"
        })
      }

      setAlerts(newAlerts)

      newAlerts.forEach(alert => {
        if (alert.type === "critical") {
          toast({
            title: "Critical Alert",
            description: alert.message,
            variant: "destructive",
          })
        }
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/")
  }

  const getMetricStatus = (value: number, type: "cpu" | "memory" | "disk" | "network") => {
    const thresholds = {
      cpu: { warning: 60, critical: 75 },
      memory: { warning: 50, critical: 65 },
      disk: { warning: 80, critical: 90 },
      network: { warning: 70, critical: 85 }
    }
    
    const threshold = thresholds[type]
    if (value >= threshold.critical) return "critical"
    if (value >= threshold.warning) return "warning"
    return "healthy"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Monitor className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">System Monitor</h1>
                <p className="text-sm text-muted-foreground">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.location.reload()}
                className="hover:bg-accent/20"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/20"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                {alerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-xs text-destructive-foreground font-bold">
                      {alerts.length}
                    </span>
                  </div>
                )}
              </div>
              
              <ThemeToggle />
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert 
                key={alert.id} 
                variant={alert.type === "critical" ? "destructive" : "default"}
                className="animate-slide-up border-l-4"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {alert.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* System Metrics */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">System Metrics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="CPU Usage"
              value={metrics.cpu}
              icon={<Cpu className="h-5 w-5" />}
              status={getMetricStatus(metrics.cpu, "cpu")}
              trend={Math.random() * 10 - 5}
            />
            
            <MetricCard
              title="Memory Usage"
              value={metrics.memory}
              icon={<Monitor className="h-5 w-5" />}
              status={getMetricStatus(metrics.memory, "memory")}
              trend={Math.random() * 8 - 4}
            />
            
            <MetricCard
              title="Disk Usage"
              value={metrics.disk}
              icon={<HardDrive className="h-5 w-5" />}
              status={getMetricStatus(metrics.disk, "disk")}
              trend={Math.random() * 3}
            />
            
            <MetricCard
              title="Network Activity"
              value={metrics.network}
              unit=" MB/s"
              icon={<Wifi className="h-5 w-5" />}
              status={getMetricStatus(metrics.network, "network")}
              trend={Math.random() * 15 - 7.5}
            />
          </div>
        </section>

        {/* Charts */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Performance Analytics</h2>
          </div>
          
          <SystemCharts />
        </section>

        {/* Process Table */}
        <section>
          <ProcessTable />
        </section>
      </main>
    </div>
  )
}

export default Dashboard