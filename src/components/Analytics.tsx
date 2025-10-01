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

      {/* Cost Analysis - Savings (not profit) */}
      <CostAnalysis userRole={userRole} />
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

// ---------------- Cost Analysis (Savings) ----------------
type Division = "RAC" | "Component";

type PlantCost = {
  name: string;
  division: Division;
  lastMonth: number; // savings last month (in lakhs ₹)
  currentMonth: number; // savings current month (in lakhs ₹)
  ytdTillLastMonth: number; // savings YTD till last month (in lakhs ₹)
};

const plantCostData: PlantCost[] = [
  { name: "Plant 1 - Gurgaon", division: "RAC", lastMonth: 12.5, currentMonth: 14.0, ytdTillLastMonth: 78.0 },
  { name: "Plant 2 - Chennai", division: "Component", lastMonth: 9.0, currentMonth: 9.8, ytdTillLastMonth: 65.5 },
  { name: "Plant 3 - Pune", division: "RAC", lastMonth: 15.2, currentMonth: 16.0, ytdTillLastMonth: 88.7 },
  { name: "Plant 4 - Kolkata", division: "Component", lastMonth: 7.3, currentMonth: 8.1, ytdTillLastMonth: 54.2 },
];

const formatLakh = (n: number) => `₹${n.toFixed(1)}L`;
const pctChange = (current: number, last: number) => (last === 0 ? 0 : ((current - last) / last) * 100);

const CostAnalysis = ({ userRole }: { userRole: "plant" | "hq" }) => {
  // Filter by role (plant users see only their plant's savings)
  const visible = userRole === "plant" ? plantCostData.filter(p => p.name === "Plant 1 - Gurgaon") : plantCostData;

  // Aggregate division and company totals
  const byDivision = visible.reduce(
    (acc, p) => {
      const key = p.division;
      acc[key].lastMonth += p.lastMonth;
      acc[key].currentMonth += p.currentMonth;
      acc[key].ytdTillLastMonth += p.ytdTillLastMonth;
      return acc;
    },
    {
      RAC: { lastMonth: 0, currentMonth: 0, ytdTillLastMonth: 0 },
      Component: { lastMonth: 0, currentMonth: 0, ytdTillLastMonth: 0 },
    } as Record<Division, { lastMonth: number; currentMonth: number; ytdTillLastMonth: number }>
  );

  const companyTotals = visible.reduce(
    (acc, p) => {
      acc.lastMonth += p.lastMonth;
      acc.currentMonth += p.currentMonth;
      acc.ytdTillLastMonth += p.ytdTillLastMonth;
      return acc;
    },
    { lastMonth: 0, currentMonth: 0, ytdTillLastMonth: 0 }
  );

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Cost Analysis (Savings)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Division-wise grouped bar chart (savings) */}
        {userRole === "hq" && (
          <ChartContainer
            config={{
              last: { label: "Last Month Savings", color: "hsl(var(--warning))" },
              current: { label: "Current Month Savings", color: "hsl(var(--success))" },
              ytd: { label: "YTD till last month (Savings)", color: "hsl(var(--primary))" },
            }}
          >
            <BarChart
              data={[
                { division: "RAC", last: byDivision.RAC.lastMonth, current: byDivision.RAC.currentMonth, ytd: byDivision.RAC.ytdTillLastMonth },
                { division: "Component", last: byDivision.Component.lastMonth, current: byDivision.Component.currentMonth, ytd: byDivision.Component.ytdTillLastMonth },
                { division: "Total", last: companyTotals.lastMonth, current: companyTotals.currentMonth, ytd: companyTotals.ytdTillLastMonth },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="division" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="last" fill="var(--color-last)" />
              <Bar dataKey="current" fill="var(--color-current)" />
              <Bar dataKey="ytd" fill="var(--color-ytd)" />
            </BarChart>
          </ChartContainer>
        )}

        {/* Division-wise savings table */}
        {userRole === "hq" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Division</th>
                  <th className="py-2">Last Month Savings</th>
                  <th className="py-2">Current Month Savings</th>
                  <th className="py-2">YTD till last month</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-accent/50">
                  <td className="py-2 font-medium">RAC</td>
                  <td className="py-2">{formatLakh(byDivision.RAC.lastMonth)}</td>
                  <td className="py-2">{formatLakh(byDivision.RAC.currentMonth)}</td>
                  <td className="py-2">{formatLakh(byDivision.RAC.ytdTillLastMonth)}</td>
                </tr>
                <tr className="hover:bg-accent/50">
                  <td className="py-2 font-medium">Component</td>
                  <td className="py-2">{formatLakh(byDivision.Component.lastMonth)}</td>
                  <td className="py-2">{formatLakh(byDivision.Component.currentMonth)}</td>
                  <td className="py-2">{formatLakh(byDivision.Component.ytdTillLastMonth)}</td>
                </tr>
                <tr className="hover:bg-accent/50">
                  <td className="py-2 font-medium">Total</td>
                  <td className="py-2">{formatLakh(companyTotals.lastMonth)}</td>
                  <td className="py-2">{formatLakh(companyTotals.currentMonth)}</td>
                  <td className="py-2">{formatLakh(companyTotals.ytdTillLastMonth)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Plant-wise savings bar chart */}
        <ChartContainer
          config={{
            last: { label: "Last Month Savings", color: "hsl(var(--warning))" },
            current: { label: "Current Month Savings", color: "hsl(var(--success))" },
          }}
        >
          <BarChart data={visible.map(p => ({ plant: p.name.replace("Plant ", "P"), last: p.lastMonth, current: p.currentMonth }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="plant" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="last" fill="var(--color-last)" />
            <Bar dataKey="current" fill="var(--color-current)" />
          </BarChart>
        </ChartContainer>

        {/* Plant-wise table (exact savings figures) */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Plant</th>
                {userRole === "hq" && <th className="py-2">Division</th>}
                <th className="py-2">Last Month Savings</th>
                <th className="py-2">Current Month Savings</th>
                <th className="py-2">YTD till last month</th>
                <th className="py-2">% vs last month</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visible.map((p) => (
                <tr key={p.name} className="hover:bg-accent/50">
                  <td className="py-2 font-medium">{p.name}</td>
                  {userRole === "hq" && <td className="py-2">{p.division}</td>}
                  <td className="py-2">{formatLakh(p.lastMonth)}</td>
                  <td className="py-2">{formatLakh(p.currentMonth)}</td>
                  <td className="py-2">{formatLakh(p.ytdTillLastMonth)}</td>
                  <td className="py-2">
                    <Badge
                      variant="outline"
                      className={
                        pctChange(p.currentMonth, p.lastMonth) >= 0
                          ? "bg-success/10 text-success border-success"
                          : "bg-destructive/10 text-destructive border-destructive"
                      }
                    >
                      {pctChange(p.currentMonth, p.lastMonth).toFixed(1)}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};


