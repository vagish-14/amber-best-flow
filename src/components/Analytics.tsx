import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Factory, DollarSign } from "lucide-react";
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
  { name: "Plant 1 - Gurgaon", submitted: 23 },
  { name: "Plant 2 - Chennai", submitted: 18 },
  { name: "Plant 3 - Pune", submitted: 31 },
  { name: "Plant 4 - Kolkata", submitted: 15 },
  { name: "Plant 5 - Mumbai", submitted: 22 },
  { name: "Plant 6 - Delhi", submitted: 19 },
  { name: "Plant 7 - Bangalore", submitted: 25 },
  { name: "Plant 8 - Hyderabad", submitted: 17 },
  { name: "Plant 9 - Ahmedabad", submitted: 20 },
  { name: "Plant 10 - Jaipur", submitted: 16 },
  { name: "Plant 11 - Lucknow", submitted: 21 },
  { name: "Plant 12 - Indore", submitted: 18 },
  { name: "Plant 13 - Bhopal", submitted: 14 },
  { name: "Plant 14 - Patna", submitted: 19 },
  { name: "Plant 15 - Bhubaneswar", submitted: 17 },
];

const total = plantStats.reduce(
  (acc, p) => ({
    submitted: acc.submitted + (p.submitted || 0),
  }),
  { submitted: 0 }
);

const Analytics = ({ userRole, onBack }: AnalyticsProps) => {
  const plantsToShow = userRole === "plant" ? plantStats.filter(p => p.name === "Plant 1 - Gurgaon") : plantStats;

  // Company-wide monthly data (demo). In real app, fetch/compute from API.
  const monthlyData = [
    { month: "Jan", submitted: 20 },
    { month: "Feb", submitted: 22 },
    { month: "Mar", submitted: 24 },
    { month: "Apr", submitted: 26 },
    { month: "May", submitted: 28 },
    { month: "Jun", submitted: 25 },
    { month: "Jul", submitted: 27 },
    { month: "Aug", submitted: 29 },
    { month: "Sep", submitted: 30 },
    { month: "Oct", submitted: 32 },
    { month: "Nov", submitted: 31 },
    { month: "Dec", submitted: 33 },
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
          <CardContent className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <MetricCard label="Submitted" value={total.submitted} />
          </CardContent>
        </Card>
      )}


      {/* Company-wide yearly bar chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center"><BarChart3 className="h-5 w-5 text-primary mr-2" /> Yearly Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              submitted: { label: "Submitted", color: "hsl(var(--primary))" },
            }}
            className="h-[300px] w-full"
          >
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="submitted" fill="var(--color-submitted)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Yearly Cost Savings (Company-wide) */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center"><DollarSign className="h-5 w-5 text-primary mr-2" /> Yearly Cost Savings</CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            // Plant-wise YTD savings (in ₹ lakhs) - demo values for all 15 plants
            const plantSavings = [
              { plant: "Plant 1 - Gurgaon", savings: 112 },
              { plant: "Plant 2 - Chennai", savings: 205 },
              { plant: "Plant 3 - Pune", savings: 72 },
              { plant: "Plant 4 - Kolkata", savings: 48 },
              { plant: "Plant 5 - Mumbai", savings: 89 },
              { plant: "Plant 6 - Delhi", savings: 156 },
              { plant: "Plant 7 - Bangalore", savings: 134 },
              { plant: "Plant 8 - Hyderabad", savings: 67 },
              { plant: "Plant 9 - Ahmedabad", savings: 98 },
              { plant: "Plant 10 - Jaipur", savings: 45 },
              { plant: "Plant 11 - Lucknow", savings: 78 },
              { plant: "Plant 12 - Indore", savings: 123 },
              { plant: "Plant 13 - Bhopal", savings: 56 },
              { plant: "Plant 14 - Patna", savings: 87 },
              { plant: "Plant 15 - Bhubaneswar", savings: 92 },
            ];
            const totalYtd = plantSavings.reduce((a, b) => a + b.savings, 0);
            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Plant-wise YTD savings • ₹ lakhs</span>
                  <span className="font-medium text-foreground">Company YTD: ₹{totalYtd.toFixed(0)}L</span>
                </div>
                <ChartContainer 
                  config={{ savings: { label: "YTD Savings", color: "hsl(var(--success))" } }}
                  className="h-[300px] w-full"
                >
                  <BarChart data={plantSavings.map(p => ({ 
                    plant: p.plant.replace("Plant ", "P").replace(" - Gurgaon", "").replace(" - Chennai", "").replace(" - Pune", "").replace(" - Kolkata", "").replace(" - Mumbai", "").replace(" - Delhi", "").replace(" - Bangalore", "").replace(" - Hyderabad", "").replace(" - Ahmedabad", "").replace(" - Jaipur", "").replace(" - Lucknow", "").replace(" - Indore", "").replace(" - Bhopal", "").replace(" - Patna", "").replace(" - Bhubaneswar", ""),
                    fullName: p.plant,
                    savings: p.savings 
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="plant" />
                    <YAxis />
                    <ChartTooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-md">
                              <div className="grid gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    {data.fullName || label}
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {label}
                                  </span>
                                </div>
                                {payload.map((entry, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <div 
                                      className="h-2 w-2 rounded-full" 
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-[0.70rem] text-muted-foreground">
                                      {entry.dataKey}: {entry.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="savings" fill="var(--color-savings)" />
                  </BarChart>
                </ChartContainer>
              </div>
            );
          })()}
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
  { name: "Plant 5 - Mumbai", division: "RAC", lastMonth: 11.8, currentMonth: 12.5, ytdTillLastMonth: 72.3 },
  { name: "Plant 6 - Delhi", division: "Component", lastMonth: 13.2, currentMonth: 14.1, ytdTillLastMonth: 81.5 },
  { name: "Plant 7 - Bangalore", division: "RAC", lastMonth: 10.5, currentMonth: 11.2, ytdTillLastMonth: 68.9 },
  { name: "Plant 8 - Hyderabad", division: "Component", lastMonth: 8.7, currentMonth: 9.3, ytdTillLastMonth: 56.7 },
  { name: "Plant 9 - Ahmedabad", division: "RAC", lastMonth: 14.1, currentMonth: 15.0, ytdTillLastMonth: 85.2 },
  { name: "Plant 10 - Jaipur", division: "Component", lastMonth: 6.8, currentMonth: 7.4, ytdTillLastMonth: 48.9 },
  { name: "Plant 11 - Lucknow", division: "RAC", lastMonth: 9.9, currentMonth: 10.6, ytdTillLastMonth: 63.4 },
  { name: "Plant 12 - Indore", division: "Component", lastMonth: 12.3, currentMonth: 13.1, ytdTillLastMonth: 76.8 },
  { name: "Plant 13 - Bhopal", division: "RAC", lastMonth: 7.6, currentMonth: 8.2, ytdTillLastMonth: 52.1 },
  { name: "Plant 14 - Patna", division: "Component", lastMonth: 10.4, currentMonth: 11.1, ytdTillLastMonth: 67.3 },
  { name: "Plant 15 - Bhubaneswar", division: "RAC", lastMonth: 11.1, currentMonth: 11.8, ytdTillLastMonth: 69.7 },
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


