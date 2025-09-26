import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, CheckCircle, Clock, XCircle, Factory } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell, BarChart, XAxis, YAxis, CartesianGrid, Bar } from "recharts";

interface AnalyticsProps {
  userRole: "plant" | "hq";
  onBack: () => void;
}

const plantStats = [
  { name: "Plant 1 - Gurgaon", submitted: 23, approved: 19, pending: 3, rejected: 1 },
  { name: "Plant 2 - Chennai", submitted: 18, approved: 15, pending: 2, rejected: 1 },
  { name: "Plant 3 - Pune", submitted: 31, approved: 28, pending: 2, rejected: 1 },
  { name: "Plant 4 - Kolkata", submitted: 15, approved: 12, pending: 1, rejected: 2 },
];

const total = plantStats.reduce(
  (acc, p) => ({
    submitted: acc.submitted + p.submitted,
    approved: acc.approved + p.approved,
    pending: acc.pending + p.pending,
    rejected: acc.rejected + p.rejected,
  }),
  { submitted: 0, approved: 0, pending: 0, rejected: 0 }
);

const Analytics = ({ userRole, onBack }: AnalyticsProps) => {
  const plantsToShow = userRole === "plant" ? plantStats.filter(p => p.name === "Plant 1 - Gurgaon") : plantStats;

  // Company-wide monthly data (demo). In real app, fetch/compute from API.
  const monthlyData = [
    { month: "Jan", submitted: 20, approved: 16, pending: 3, rejected: 1 },
    { month: "Feb", submitted: 22, approved: 17, pending: 4, rejected: 1 },
    { month: "Mar", submitted: 24, approved: 18, pending: 4, rejected: 2 },
    { month: "Apr", submitted: 26, approved: 20, pending: 5, rejected: 1 },
    { month: "May", submitted: 28, approved: 22, pending: 4, rejected: 2 },
    { month: "Jun", submitted: 25, approved: 19, pending: 4, rejected: 2 },
    { month: "Jul", submitted: 27, approved: 21, pending: 4, rejected: 2 },
    { month: "Aug", submitted: 29, approved: 23, pending: 4, rejected: 2 },
    { month: "Sep", submitted: 30, approved: 24, pending: 4, rejected: 2 },
    { month: "Oct", submitted: 32, approved: 26, pending: 4, rejected: 2 },
    { month: "Nov", submitted: 31, approved: 25, pending: 4, rejected: 2 },
    { month: "Dec", submitted: 33, approved: 27, pending: 4, rejected: 2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center"><BarChart3 className="h-6 w-6 mr-2 text-primary" /> Analytics</h1>
          <p className="text-muted-foreground mt-1">
            {userRole === "plant" ? "Plant 1 - Gurgaon performance" : "Company-wide metrics and per-plant breakdown"}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      {/* Company Overview */}
      {userRole === "hq" && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="h-5 w-5 text-primary mr-2" /> Company Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard label="Submitted" value={total.submitted} />
            <MetricCard label="Approved" value={total.approved} icon={<CheckCircle className="h-4 w-4 text-success" />} />
            <MetricCard label="Pending" value={total.pending} icon={<Clock className="h-4 w-4 text-warning" />} />
            <MetricCard label="Rejected" value={total.rejected} icon={<XCircle className="h-4 w-4 text-destructive" />} />
          </CardContent>
        </Card>
      )}

      {/* Per-plant breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plantsToShow.map((p) => (
          <Card key={p.name} className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center"><Factory className="h-5 w-5 text-primary mr-2" /> {p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <MetricBadge label="Submitted" value={p.submitted} />
                <MetricBadge label="Approved" value={p.approved} tone="success" />
                <MetricBadge label="Pending" value={p.pending} tone="warning" />
                <MetricBadge label="Rejected" value={p.rejected} tone="destructive" />
              </div>

              {/* Pie chart for plant distribution */}
              <ChartContainer
                config={{
                  approved: { label: "Approved", color: "hsl(var(--success))" },
                  pending: { label: "Pending", color: "hsl(var(--warning))" },
                  rejected: { label: "Rejected", color: "hsl(var(--destructive))" },
                }}
                className="w-full aspect-[2/1]"
              >
                <PieChart>
                  <Pie
                    data={[
                      { name: "approved", value: p.approved, fill: "var(--color-approved)" },
                      { name: "pending", value: p.pending, fill: "var(--color-pending)" },
                      { name: "rejected", value: p.rejected, fill: "var(--color-rejected)" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    strokeWidth={2}
                  >
                    {[
                      { name: "approved", color: "var(--color-approved)" },
                      { name: "pending", color: "var(--color-pending)" },
                      { name: "rejected", color: "var(--color-rejected)" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company-wide yearly bar chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center"><BarChart3 className="h-5 w-5 text-primary mr-2" /> Yearly Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              submitted: { label: "Submitted", color: "hsl(var(--primary))" },
              approved: { label: "Approved", color: "hsl(var(--success))" },
              pending: { label: "Pending", color: "hsl(var(--warning))" },
              rejected: { label: "Rejected", color: "hsl(var(--destructive))" },
            }}
          >
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="submitted" fill="var(--color-submitted)" />
              <Bar dataKey="approved" fill="var(--color-approved)" />
              <Bar dataKey="pending" fill="var(--color-pending)" />
              <Bar dataKey="rejected" fill="var(--color-rejected)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const MetricCard = ({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) => (
  <Card className="shadow-card">
    <CardContent className="p-4 text-center">
      <div className="text-2xl font-bold text-primary flex items-center justify-center space-x-2">
        {icon}
        <span>{value}</span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

const MetricBadge = ({ label, value, tone }: { label: string; value: number; tone?: "success" | "warning" | "destructive" }) => {
  const toneClass =
    tone === "success"
      ? "bg-success/10 text-success border-success"
      : tone === "warning"
      ? "bg-warning/10 text-warning border-warning"
      : tone === "destructive"
      ? "bg-destructive/10 text-destructive border-destructive"
      : "bg-primary/10 text-primary border-primary";

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <span className="text-sm">{label}</span>
      <Badge variant="outline" className={toneClass}>{value}</Badge>
    </div>
  );
};

export default Analytics;


