import { useMemo, useState, type KeyboardEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Factory, IndianRupee } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell, BarChart, XAxis, YAxis, CartesianGrid, Bar, Label } from "recharts";

interface AnalyticsProps {
  userRole: "plant" | "hq";
  onBack: () => void;
}

const plantStats = [
  { name: "Greater Noida (Ecotech 1)", submitted: 26 },
  { name: "Kanchipuram", submitted: 21 },
  { name: "Rajpura", submitted: 24 },
  { name: "Shahjahanpur", submitted: 19 },
  { name: "Supa", submitted: 17 },
  { name: "Ranjangaon", submitted: 22 },
  { name: "Ponneri", submitted: 18 },
];

const plantShortLabel: Record<string, string> = {
  "Greater Noida (Ecotech 1)": "Greater Noida",
  "Kanchipuram": "Kanchipuram",
  "Rajpura": "Rajpura",
  "Shahjahanpur": "Shahjahanpur",
  "Supa": "Supa",
  "Ranjangaon": "Ranjangaon",
  "Ponneri": "Ponneri",
};

const total = plantStats.reduce(
  (acc, p) => ({
    submitted: acc.submitted + (p.submitted || 0),
  }),
  { submitted: 0 }
);

const Analytics = ({ userRole, onBack }: AnalyticsProps) => {
const plantsToShow = userRole === "plant" ? plantStats.filter(p => p.name === "Greater Noida (Ecotech 1)") : plantStats;

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
            {userRole === "plant" ? "Greater Noida (Ecotech 1) performance" : "Company-wide metrics and per-plant breakdown"}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      {/* Company Overview */}
      {userRole === "hq" && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="h-5 w-5 text-primary mr-2" /> Component Division Overview</CardTitle>
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
          <CardTitle className="flex items-center"><IndianRupee className="h-5 w-5 text-primary mr-2" /> Yearly Cost Savings</CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            // Plant-wise YTD savings (in ₹ lakhs) - demo values for all 15 plants
            const plantSavings = [
  { plant: "Greater Noida (Ecotech 1)", savings: 196 },
  { plant: "Kanchipuram", savings: 148 },
  { plant: "Rajpura", savings: 132 },
  { plant: "Shahjahanpur", savings: 104 },
  { plant: "Supa", savings: 96 },
  { plant: "Ranjangaon", savings: 118 },
  { plant: "Ponneri", savings: 107 },
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
                    plant: plantShortLabel[p.plant] ?? p.plant,
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
type Division = "Component";

type PlantCost = {
  name: string;
  division: Division;
  lastMonth: number; // savings last month (in lakhs ₹)
  currentMonth: number; // savings current month (in lakhs ₹)
  ytdTillLastMonth: number; // savings YTD till last month (in lakhs ₹)
};

const plantCostData: PlantCost[] = [
  { name: "Greater Noida (Ecotech 1)", division: "Component", lastMonth: 14.5, currentMonth: 15.8, ytdTillLastMonth: 92.3 },
  { name: "Kanchipuram", division: "Component", lastMonth: 10.2, currentMonth: 11.0, ytdTillLastMonth: 68.7 },
  { name: "Rajpura", division: "Component", lastMonth: 12.8, currentMonth: 13.6, ytdTillLastMonth: 81.4 },
  { name: "Shahjahanpur", division: "Component", lastMonth: 8.4, currentMonth: 9.1, ytdTillLastMonth: 56.2 },
  { name: "Supa", division: "Component", lastMonth: 9.9, currentMonth: 10.5, ytdTillLastMonth: 60.8 },
  { name: "Ranjangaon", division: "Component", lastMonth: 11.6, currentMonth: 12.4, ytdTillLastMonth: 74.1 },
  { name: "Ponneri", division: "Component", lastMonth: 10.8, currentMonth: 11.6, ytdTillLastMonth: 69.5 },
];

type PlantMonthlyBreakdown = {
  month: string;
  totalSavings: number;
  practices: { title: string; savings: number; benchmarked?: boolean }[];
};

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const monthsOfYear = Array.from(
  { length: currentMonthIndex + 1 },
  (_, index) => `${currentYear}-${String(index + 1).padStart(2, "0")}`
);

const plantMonthlySavings: Record<string, PlantMonthlyBreakdown[]> = {
  "Greater Noida (Ecotech 1)": [
    {
      month: `${currentYear}-01`,
      totalSavings: 14.0,
      practices: [
        { title: "Energy Efficient Cooling Process", savings: 5.2, benchmarked: true },
        { title: "Waste Reduction Initiative", savings: 3.8, benchmarked: true },
        { title: "Automated Quality Inspection System", savings: 5.0, benchmarked: false },
      ],
    },
    {
      month: `${currentYear}-02`,
      totalSavings: 12.5,
      practices: [
        { title: "Heat Exchanger Optimization", savings: 4.5 },
        { title: "Packaging Automation Upgrade", savings: 3.0 },
        { title: "Compressed Air Leak Fix Program", savings: 5.0, benchmarked: true },
      ],
    },
    {
      month: `${currentYear}-03`,
      totalSavings: 11.8,
      practices: [
        { title: "Paint Booth Recirculation", savings: 4.8 },
        { title: "Digital Maintenance Alerts", savings: 3.2 },
        { title: "Lean Warehouse Layout", savings: 3.8 },
      ],
    },
  ],
  "Kanchipuram": [
    {
      month: `${currentYear}-01`,
      totalSavings: 9.8,
      practices: [
        { title: "Digital Production Control Tower", savings: 4.1, benchmarked: true },
        { title: "Kaizen Idea Harvesting", savings: 2.7 },
        { title: "Waste Segregation & Recycling", savings: 3.0 },
      ],
    },
    {
      month: `${currentYear}-02`,
      totalSavings: 9.0,
      practices: [
        { title: "Boiler Condensate Recovery", savings: 3.5 },
        { title: "Inventory Accuracy Drive", savings: 2.4 },
        { title: "Assembly Line Ergonomics", savings: 3.1 },
      ],
    },
  ],
  "Rajpura": [
    {
      month: `${currentYear}-01`,
      totalSavings: 16.0,
      practices: [
        { title: "Assembly Line Cobots", savings: 6.3, benchmarked: true },
        { title: "Predictive Maintenance Analytics", savings: 4.9 },
        { title: "Green Packaging Initiative", savings: 4.8 },
      ],
    },
    {
      month: `${currentYear}-02`,
      totalSavings: 15.2,
      practices: [
        { title: "Compressed Air Optimization", savings: 5.2 },
        { title: "ELG Compliance Monitoring", savings: 4.6, benchmarked: true },
        { title: "Reflow Oven Efficiency", savings: 5.4 },
      ],
    },
  ],
};

const defaultMonthlyBreakdown: PlantMonthlyBreakdown[] = [
  {
    month: `${currentYear}-01`,
    totalSavings: 9.2,
    practices: [
      { title: "Continuous Improvement Blitz", savings: 3.0 },
      { title: "Utility Load Balancing", savings: 2.4 },
      { title: "Training Effectiveness Program", savings: 3.8 },
    ],
  },
  {
    month: `${currentYear}-02`,
    totalSavings: 8.6,
    practices: [
      { title: "Logistics Route Optimization", savings: 3.1 },
      { title: "Smart Lighting Retrofit", savings: 2.0 },
      { title: "Tooling Life Extension", savings: 3.5 },
    ],
  },
  {
    month: `${currentYear}-03`,
    totalSavings: 9.4,
    practices: [
      { title: "Energy Dashboard Upgrade", savings: 4.2, benchmarked: true },
      { title: "Supplier Collaboration Program", savings: 2.1 },
      { title: "Warehouse Slotting Optimization", savings: 3.1 },
    ],
  },
];

const formatLakh = (n: number) => `₹${n.toFixed(1)}L`;
const pctChange = (current: number, last: number) => (last === 0 ? 0 : ((current - last) / last) * 100);

const CostAnalysis = ({ userRole }: { userRole: "plant" | "hq" }) => {
  // Filter by role (plant users see only their plant's savings)
  const visible = userRole === "plant" ? plantCostData.filter(p => p.name === "Greater Noida (Ecotech 1)") : plantCostData;

  // Aggregate component division totals
  const componentTotals = visible.reduce(
    (acc, p) => {
      acc.lastMonth += p.lastMonth;
      acc.currentMonth += p.currentMonth;
      acc.ytdTillLastMonth += p.ytdTillLastMonth;
      return acc;
    },
    { lastMonth: 0, currentMonth: 0, ytdTillLastMonth: 0 }
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

  const [plantDetailOpen, setPlantDetailOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantCost | null>(null);

  const selectedPlantBreakdown = useMemo<PlantMonthlyBreakdown[]>(() => {
    const fillMissingMonths = (entries: PlantMonthlyBreakdown[]): PlantMonthlyBreakdown[] => {
      const monthMap = new Map(entries.map((entry) => [entry.month, entry]));
      return monthsOfYear.map((month) => {
        const match = monthMap.get(month);
        return match
          ? match
          : {
              month,
              totalSavings: 0,
              practices: [],
            };
      });
    };

    if (!selectedPlant) {
      return fillMissingMonths(defaultMonthlyBreakdown);
    }

    const plantEntries = plantMonthlySavings[selectedPlant.name] ?? defaultMonthlyBreakdown;
    return fillMissingMonths(plantEntries);
  }, [selectedPlant]);

  const handlePlantRowClick = (plant: PlantCost) => {
    setSelectedPlant(plant);
    setPlantDetailOpen(true);
  };

  const handlePlantRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, plant: PlantCost) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePlantRowClick(plant);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Cost Analysis (Savings)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Component Division Pie Chart */}
        {userRole === "hq" && (() => {
          const pieData = [
            { name: "Last Month Savings", value: componentTotals.lastMonth, color: "hsl(var(--warning))" },
            { name: "Current Month Savings", value: componentTotals.currentMonth, color: "hsl(var(--success))" },
            { name: "YTD till last month", value: componentTotals.ytdTillLastMonth, color: "hsl(var(--primary))" },
          ];
          
          const total = pieData.reduce((sum, item) => sum + item.value, 0);

          return (
            <ChartContainer
              config={{
                last: { label: "Last Month Savings", color: "hsl(var(--warning))" },
                current: { label: "Current Month Savings", color: "hsl(var(--success))" },
                ytd: { label: "YTD till last month (Savings)", color: "hsl(var(--primary))" },
              }}
              className="h-[450px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const percent = ((data.value / total) * 100).toFixed(1);
                      return (
                        <div className="rounded-lg border bg-background p-4 shadow-lg backdrop-blur-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: data.color }}
                              />
                              <span className="font-semibold text-sm">{data.name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-2xl font-bold text-primary">
                                {formatLakh(data.value)} ₹L
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {percent}% of total savings
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  labelLine={true}
                  label={({ name, percent, value }) => {
                    return `${(percent * 100).toFixed(1)}%`;
                  }}
                  outerRadius={140}
                  innerRadius={70}
                  paddingAngle={3}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={entry.color}
                      strokeWidth={2}
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Pie>
                {/* Center label showing total */}
                <text
                  x="50%"
                  y="42%"
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="24"
                  fontWeight="bold"
                  dominantBaseline="middle"
                >
                  {formatLakh(total)} ₹L
                </text>
                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="14"
                  dominantBaseline="middle"
                >
                  Total Savings
                </text>
              </PieChart>
            </ChartContainer>
          );
        })()}

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
                  <td className="py-2 font-medium">Component</td>
                  <td className="py-2">{formatLakh(componentTotals.lastMonth)}</td>
                  <td className="py-2">{formatLakh(componentTotals.currentMonth)}</td>
                  <td className="py-2">{formatLakh(componentTotals.ytdTillLastMonth)}</td>
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
              <tr
                key={p.name}
                className="hover:bg-accent/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                role="button"
                tabIndex={0}
                onClick={() => handlePlantRowClick(p)}
                onKeyDown={(event) => handlePlantRowKeyDown(event, p)}
              >
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

        <AlertDialog open={plantDetailOpen} onOpenChange={setPlantDetailOpen}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedPlant ? `${selectedPlant.name} – Monthly Savings & BPs` : "Plant Savings Details"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Breakdown of best practices uploaded each month and their contribution to savings (₹L).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-4">Month</th>
                    <th className="py-2 pr-4">Total Savings (₹L)</th>
                    <th className="py-2 pr-4">Best Practices</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedPlantBreakdown.map((entry) => (
                    <tr key={entry.month}>
                      <td className="py-2 pr-4 font-medium">
                        {new Date(entry.month + "-01").toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-2 pr-4">{entry.totalSavings.toFixed(1)}L</td>
                      <td className="py-2 pr-4">
                        {entry.practices.length > 0 ? (
                          <div className="space-y-1">
                            {entry.practices.map((practice, idx) => (
                              <div key={`${entry.month}-${idx}`} className="flex items-center justify-between">
                                <span>{practice.title}</span>
                                <Badge
                                  variant="outline"
                                  className={
                                    practice.benchmarked
                                      ? "bg-primary/10 text-primary border-primary"
                                      : "bg-muted/50 text-muted-foreground"
                                  }
                                >
                                  ₹{practice.savings.toFixed(1)}L{practice.benchmarked ? " • Benchmarked" : ""}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No best practices recorded.</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {selectedPlantBreakdown.length === 0 && (
                    <tr>
                      <td className="py-4 text-muted-foreground" colSpan={3}>
                        No savings data available for this plant.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={() => setPlantDetailOpen(false)}>
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};


