import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for charts
const timeSeriesData = [
  { time: "10:00", cpu: 25, memory: 45, network: 30 },
  { time: "10:05", cpu: 35, memory: 48, network: 40 },
  { time: "10:10", cpu: 42, memory: 52, network: 35 },
  { time: "10:15", cpu: 58, memory: 46, network: 55 },
  { time: "10:20", cpu: 45, memory: 58, network: 42 },
  { time: "10:25", cpu: 38, memory: 55, network: 38 },
  { time: "10:30", cpu: 52, memory: 62, network: 48 },
  { time: "10:35", cpu: 48, memory: 59, network: 52 },
  { time: "10:40", cpu: 41, memory: 54, network: 45 },
  { time: "10:45", cpu: 36, memory: 51, network: 41 },
]

const diskData = [
  { name: "Used", value: 68, color: "hsl(var(--chart-disk))" },
  { name: "Free", value: 32, color: "hsl(var(--muted))" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-medium">
        <p className="text-sm font-medium mb-2">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey.toUpperCase()}: ${entry.value}%`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function SystemCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance Over Time */}
      <Card className="metric-card lg:col-span-2">
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="hsl(var(--chart-cpu))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-cpu))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-cpu))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="hsl(var(--chart-memory))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-memory))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-memory))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="hsl(var(--chart-network))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-network))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-network))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-cpu"></div>
              <span className="text-sm text-muted-foreground">CPU Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-memory"></div>
              <span className="text-sm text-muted-foreground">Memory Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-network"></div>
              <span className="text-sm text-muted-foreground">Network Activity</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disk Usage */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>Disk Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={diskData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {diskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, ""]}
                labelFormatter={() => ""}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <div className="text-2xl font-bold text-chart-disk">68%</div>
            <div className="text-sm text-muted-foreground">Used: 340 GB / 500 GB</div>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>System Health Score</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="hsl(var(--success))"
                strokeWidth="8"
                fill="none"
                strokeDasharray="314"
                strokeDashoffset="94"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">85</div>
                <div className="text-xs text-muted-foreground">Healthy</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}