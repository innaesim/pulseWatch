import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, AlertTriangle } from "lucide-react"

interface Process {
  pid: number
  name: string
  cpuUsage: number
  memoryUsage: number
  status: "running" | "stopped" | "warning" | "critical"
  user: string
}

// Mock data for demonstration
const mockProcesses: Process[] = [
  { pid: 1234, name: "chrome", cpuUsage: 15.2, memoryUsage: 8.4, status: "running", user: "admin" },
  { pid: 5678, name: "node", cpuUsage: 45.7, memoryUsage: 12.1, status: "warning", user: "admin" },
  { pid: 9012, name: "firefox", cpuUsage: 8.3, memoryUsage: 6.2, status: "running", user: "user" },
  { pid: 3456, name: "docker", cpuUsage: 78.9, memoryUsage: 24.6, status: "critical", user: "root" },
  { pid: 7890, name: "vscode", cpuUsage: 12.5, memoryUsage: 4.8, status: "running", user: "admin" },
  { pid: 2468, name: "postgres", cpuUsage: 23.1, memoryUsage: 16.3, status: "running", user: "postgres" },
  { pid: 1357, name: "nginx", cpuUsage: 3.2, memoryUsage: 1.9, status: "running", user: "www-data" },
  { pid: 8024, name: "redis", cpuUsage: 5.8, memoryUsage: 3.4, status: "running", user: "redis" },
  { pid: 4680, name: "mysql", cpuUsage: 67.3, memoryUsage: 18.7, status: "critical", user: "mysql" },
  { pid: 9753, name: "apache", cpuUsage: 19.4, memoryUsage: 7.2, status: "warning", user: "www-data" }
]

export function ProcessTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterThreshold, setFilterThreshold] = useState<string>("all")

  const filteredProcesses = useMemo(() => {
    return mockProcesses.filter(process => {
      const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           process.pid.toString().includes(searchTerm)
      
      const matchesStatus = filterStatus === "all" || process.status === filterStatus
      
      const matchesThreshold = filterThreshold === "all" ||
        (filterThreshold === "high-cpu" && process.cpuUsage > 50) ||
        (filterThreshold === "high-memory" && process.memoryUsage > 15) ||
        (filterThreshold === "critical" && (process.cpuUsage > 70 || process.memoryUsage > 20))
      
      return matchesSearch && matchesStatus && matchesThreshold
    })
  }, [searchTerm, filterStatus, filterThreshold])

  const getRowClass = (process: Process) => {
    if (process.status === "critical" || process.cpuUsage > 70 || process.memoryUsage > 20) {
      return "bg-destructive/5 border-l-4 border-l-destructive/50"
    }
    if (process.status === "warning" || process.cpuUsage > 50 || process.memoryUsage > 15) {
      return "bg-warning/5 border-l-4 border-l-warning/50"
    }
    return "hover:bg-muted/30"
  }

  const getCpuCellClass = (usage: number) => {
    if (usage > 70) return "text-destructive font-semibold"
    if (usage > 50) return "text-warning font-medium"
    return "text-foreground"
  }

  const getMemoryCellClass = (usage: number) => {
    if (usage > 20) return "text-destructive font-semibold"
    if (usage > 15) return "text-warning font-medium"
    return "text-foreground"
  }

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Running Processes</span>
          <Badge variant="secondary" className="text-xs">
            {filteredProcesses.length} of {mockProcesses.length}
          </Badge>
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by process name or PID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50 border-border/60 focus:border-primary/50"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40 bg-background/50 border-border/60">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="stopped">Stopped</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterThreshold} onValueChange={setFilterThreshold}>
            <SelectTrigger className="w-full sm:w-40 bg-background/50 border-border/60">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Processes</SelectItem>
              <SelectItem value="high-cpu">High CPU (&gt;50%)</SelectItem>
              <SelectItem value="high-memory">High Memory (&gt;15%)</SelectItem>
              <SelectItem value="critical">Critical (&gt;70%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-20">PID</TableHead>
                <TableHead>Process Name</TableHead>
                <TableHead className="w-24 text-center">CPU %</TableHead>
                <TableHead className="w-24 text-center">Memory %</TableHead>
                <TableHead className="w-24 text-center">Status</TableHead>
                <TableHead className="w-24">User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.map((process) => (
                <TableRow 
                  key={process.pid} 
                  className={`transition-colors duration-200 ${getRowClass(process)}`}
                >
                  <TableCell className="font-mono text-sm">
                    {process.pid}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <span>{process.name}</span>
                      {(process.cpuUsage > 70 || process.memoryUsage > 20) && (
                        <AlertTriangle className="h-4 w-4 text-destructive animate-pulse-slow" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={`text-center ${getCpuCellClass(process.cpuUsage)}`}>
                    {process.cpuUsage.toFixed(1)}%
                  </TableCell>
                  <TableCell className={`text-center ${getMemoryCellClass(process.memoryUsage)}`}>
                    {process.memoryUsage.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={process.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {process.user}
                  </TableCell>
                </TableRow>
              ))}
              {filteredProcesses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No processes found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}