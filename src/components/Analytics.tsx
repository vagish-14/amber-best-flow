import { useMemo, useState, type KeyboardEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import { Pie, PieChart, Cell, BarChart, XAxis, YAxis, CartesianGrid, Bar, Label, LabelList } from "recharts";
import { formatCurrency } from "@/lib/utils";

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

  // Toggle state for Yearly Analytics - only for HQ admin
  const [yearlyViewMode, setYearlyViewMode] = useState<"yearly" | "currentMonth">("yearly");

  // Yearly plant-wise data (total BPs submitted by each plant for the year)
  const yearlyPlantData = plantStats.map(plant => ({
    plant: plantShortLabel[plant.name] || plant.name,
    fullName: plant.name,
    submitted: plant.submitted
  }));

  // Current month plant-wise data (BPs submitted by each plant in current month)
  const currentMonthPlantData = [
    { plant: plantShortLabel["Greater Noida (Ecotech 1)"] || "Greater Noida", fullName: "Greater Noida (Ecotech 1)", submitted: 3 },
    { plant: plantShortLabel["Kanchipuram"] || "Kanchipuram", fullName: "Kanchipuram", submitted: 2 },
    { plant: plantShortLabel["Rajpura"] || "Rajpura", fullName: "Rajpura", submitted: 2 },
    { plant: plantShortLabel["Shahjahanpur"] || "Shahjahanpur", fullName: "Shahjahanpur", submitted: 1 },
    { plant: plantShortLabel["Supa"] || "Supa", fullName: "Supa", submitted: 1 },
    { plant: plantShortLabel["Ranjangaon"] || "Ranjangaon", fullName: "Ranjangaon", submitted: 2 },
    { plant: plantShortLabel["Ponneri"] || "Ponneri", fullName: "Ponneri", submitted: 1 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center"><BarChart3 className="h-6 w-6 mr-2 text-primary" /> Component Division Overview</h1>
          <p className="text-muted-foreground mt-1">
            {userRole === "plant" ? "Greater Noida (Ecotech 1) performance" : "Company-wide metrics and per-plant breakdown"}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      {/* Company-wide yearly bar chart */}
      <Card className="shadow-soft hover:shadow-medium transition-smooth border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center"><BarChart3 className="h-5 w-5 text-primary mr-2" /> Yearly Analytics</CardTitle>
            {userRole === "hq" && (
              <ToggleGroup 
                type="single" 
                value={yearlyViewMode} 
                onValueChange={(value) => {
                  if (value === "yearly" || value === "currentMonth") {
                    setYearlyViewMode(value);
                  }
                }}
                className="border rounded-md"
              >
                <ToggleGroupItem value="yearly" aria-label="Yearly view" className="px-4">
                  Yearly
                </ToggleGroupItem>
                <ToggleGroupItem value="currentMonth" aria-label="Current month view" className="px-4">
                  Current Month
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              submitted: { label: "Submitted", color: "hsl(var(--primary))" },
            }}
            className="h-[300px] w-full"
          >
            <BarChart 
              data={yearlyViewMode === "yearly" ? yearlyPlantData : currentMonthPlantData}
              margin={{ top: 24, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientSubmitted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="plant" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, 'dataMax + 1']} allowDecimals={false} />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <div className="font-semibold">{data.fullName || data.plant}</div>
                        <div className="text-sm text-muted-foreground">
                          BPs Submitted: <span className="font-medium text-foreground">{data.submitted}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="submitted" fill="url(#gradientSubmitted)" radius={[8, 8, 0, 0]}>
                <LabelList dataKey="submitted" position="top" className="text-xs fill-current" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Yearly Cost Savings (Company-wide) */}
      <Card className="shadow-soft hover:shadow-medium transition-smooth border border-border/50">
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
                  <span className="font-medium text-foreground">Company YTD: {formatCurrency(totalYtd, 0)}</span>
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
                    <defs>
                      <linearGradient id="gradientSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="plant" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <div className="font-semibold">{data.fullName || data.plant}</div>
                              <div className="text-sm text-muted-foreground">
                                YTD Savings: <span className="font-medium text-foreground">{formatCurrency(data.savings, 0)}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="savings" fill="url(#gradientSavings)" radius={[8, 8, 0, 0]} />
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
        { title: "ESG Compliance Monitoring", savings: 4.6, benchmarked: true },
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

const formatLakh = (n: number) => formatCurrency(n, 1);
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
        {/* Plant-wise Donut Charts - Premium Modern Design */}
        {userRole === "hq" && (() => {
          // Premium soft muted color palette - gentle pastels that harmonize
          const COLOR_PALETTE = [
            { 
              name: "Soft Teal",
              base: "hsl(180, 40%, 55%)",      // Muted teal
              light: "hsl(180, 35%, 70%)",     // Light teal
              fade: "hsla(180, 40%, 55%, 0.3)" // Faded for gradient end
            },
            { 
              name: "Warm Coral",
              base: "hsl(15, 45%, 58%)",       // Soft coral
              light: "hsl(15, 40%, 72%)",      // Light coral
              fade: "hsla(15, 45%, 58%, 0.3)"
            },
            { 
              name: "Golden Amber",
              base: "hsl(38, 50%, 60%)",       // Gentle gold
              light: "hsl(38, 45%, 75%)",     // Light gold
              fade: "hsla(38, 50%, 60%, 0.3)"
            },
            { 
              name: "Lavender Mist",
              base: "hsl(270, 35%, 62%)",      // Soft lavender
              light: "hsl(270, 30%, 75%)",    // Light lavender
              fade: "hsla(270, 35%, 62%, 0.3)"
            },
            { 
              name: "Sage Green",
              base: "hsl(150, 35%, 55%)",      // Muted sage
              light: "hsl(150, 30%, 70%)",     // Light sage
              fade: "hsla(150, 35%, 55%, 0.3)"
            },
            { 
              name: "Dusty Rose",
              base: "hsl(340, 40%, 60%)",      // Soft rose
              light: "hsl(340, 35%, 73%)",     // Light rose
              fade: "hsla(340, 40%, 60%, 0.3)"
            },
            { 
              name: "Sky Blue",
              base: "hsl(200, 45%, 58%)",      // Gentle sky blue
              light: "hsl(200, 40%, 72%)",     // Light sky blue
              fade: "hsla(200, 45%, 58%, 0.3)"
            }
          ];

          const currentMonthData = plantCostData.map((p, idx) => ({
            name: plantShortLabel[p.name] ?? p.name,
            fullName: p.name,
            value: p.currentMonth,
            colorIndex: idx % COLOR_PALETTE.length,
            color: COLOR_PALETTE[idx % COLOR_PALETTE.length]
          }));

          const lastMonthData = plantCostData.map((p, idx) => ({
            name: plantShortLabel[p.name] ?? p.name,
            fullName: p.name,
            value: p.lastMonth,
            colorIndex: idx % COLOR_PALETTE.length,
            color: COLOR_PALETTE[idx % COLOR_PALETTE.length]
          }));

          const yearlyData = plantCostData.map((p, idx) => ({
            name: plantShortLabel[p.name] ?? p.name,
            fullName: p.name,
            value: p.ytdTillLastMonth,
            colorIndex: idx % COLOR_PALETTE.length,
            color: COLOR_PALETTE[idx % COLOR_PALETTE.length]
          }));

          const currentMonthTotal = currentMonthData.reduce((sum, item) => sum + item.value, 0);
          const lastMonthTotal = lastMonthData.reduce((sum, item) => sum + item.value, 0);
          const yearlyTotal = yearlyData.reduce((sum, item) => sum + item.value, 0);

          // Modular Premium Donut Chart Component
          const renderDonutChart = (
            data: typeof currentMonthData, 
            total: number, 
            title: string, 
            chartId: string
          ) => {
            const [activeIndex, setActiveIndex] = useState<number | null>(null);

            return (
              <div className="relative w-full">
                <ChartContainer
                  config={{
                    value: { label: "Savings", color: "hsl(var(--primary))" },
                  }}
                  className="h-[450px] w-full"
                >
                  <PieChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                    <defs>
                      {/* Drop shadow filter for depth effect */}
                      <filter id={`dropshadow-${chartId}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="0" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      
                      {/* Gradient definitions for each slice - faded from solid to transparent */}
                      {data.map((entry, index) => {
                        return (
                          <linearGradient 
                            key={`gradient-${chartId}-${index}`} 
                            id={`gradient-${chartId}-${index}`} 
                            x1="0%" 
                            y1="0%" 
                            x2="100%" 
                            y2="100%"
                          >
                            <stop offset="0%" stopColor={entry.color.base} stopOpacity={1} />
                            <stop offset="70%" stopColor={entry.color.light} stopOpacity={0.9} />
                            <stop offset="100%" stopColor={entry.color.fade} stopOpacity={0.4} />
                          </linearGradient>
                        );
                      })}
                    </defs>
                    
                    {/* Premium styled tooltip */}
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const percent = ((data.value / total) * 100).toFixed(1);
                          return (
                            <div className="rounded-xl border border-border/50 bg-background/95 backdrop-blur-sm p-4 shadow-xl">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2.5">
                                  <div 
                                    className="w-3.5 h-3.5 rounded-full shadow-sm" 
                                    style={{ backgroundColor: data.color.base }}
                                  />
                                  <span className="font-semibold text-sm text-foreground">
                                    {data.fullName || data.name}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-2xl font-bold text-primary">
                                    {formatLakh(data.value)}
                                  </span>
                                  <span className="text-xs font-medium text-muted-foreground">
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
                    
                    {/* Donut Pie with premium styling, labels, and center total */}
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      label={({ percent, midAngle, innerRadius, outerRadius, cx, cy }) => {
                        // Show percentage labels outside the donut chart
                        if (percent < 0.03) return null; // Hide for very small slices
                        
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 22; // Position labels further from the donut
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="hsl(var(--foreground))"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="12"
                            fontWeight="600"
                            className="pointer-events-none"
                            style={{
                              textShadow: '0 1px 3px rgba(255,255,255,0.95), 0 0 1px rgba(0,0,0,0.1)'
                            }}
                          >
                            {`${(percent * 100).toFixed(1)}%`}
                          </text>
                        );
                      }}
                      labelLine={false}
                      outerRadius={110}
                      innerRadius={70}
                      paddingAngle={2}
                      cornerRadius={4}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                      animationEasing="ease-in-out"
                      isAnimationActive={true}
                      activeIndex={activeIndex ?? undefined}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#gradient-${chartId}-${index})`}
                          stroke="#ffffff"
                          strokeWidth={2}
                          style={{
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            filter: `url(#dropshadow-${chartId})`,
                            transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                            transformOrigin: 'center',
                            opacity: activeIndex !== null && activeIndex !== index ? 0.6 : 1
                          }}
                        />
                      ))}
                      {/* Centered label - Total INSIDE the donut hole - as child of Pie */}
                      <Label
                        position="center"
                        content={(props: any) => {
                          const { viewBox } = props;
                          if (!viewBox || viewBox.cx === undefined || viewBox.cy === undefined) {
                            return null;
                          }
                          const { cx, cy } = viewBox;
                          
                          return (
                            <g>
                              {/* Background circle - fits inside the donut hole (innerRadius is 70) */}
                              <circle
                                cx={cx}
                                cy={cy}
                                r="62"
                                fill="hsl(var(--background))"
                                opacity="0.98"
                                stroke="hsl(var(--border))"
                                strokeWidth="1.5"
                              />
                              {/* Total value - large and bold, perfectly centered */}
                              <text
                                x={cx}
                                y={cy - 6}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="hsl(var(--foreground))"
                                fontSize="28"
                                fontWeight="700"
                                className="font-bold pointer-events-none"
                              >
                                {formatLakh(total)}
                              </text>
                              {/* Title below total */}
                              <text
                                x={cx}
                                y={cy + 14}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="hsl(var(--muted-foreground))"
                                fontSize="13"
                                fontWeight="500"
                                className="font-medium pointer-events-none"
                              >
                                {title}
                              </text>
                            </g>
                          );
                        }}
                      />
                    </Pie>
                    
                  </PieChart>
                </ChartContainer>
              </div>
            );
          };

          // Get unique plants with their colors for the shared legend
          const uniquePlants = currentMonthData.map((entry, index) => ({
            name: entry.fullName || entry.name,
            shortName: entry.name,
            color: entry.color
          }));

          return (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Current Month Savings</h3>
                  {renderDonutChart(currentMonthData, currentMonthTotal, "Current Month", "current")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Last Month Savings</h3>
                  {renderDonutChart(lastMonthData, lastMonthTotal, "Last Month", "last")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Yearly Savings (YTD)</h3>
                  {renderDonutChart(yearlyData, yearlyTotal, "Yearly (YTD)", "yearly")}
                </div>
              </div>
              
              {/* Single shared legend - horizontal straight line, shown once with percentages */}
              <div className="mt-8 flex justify-center">
                <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    {uniquePlants.map((plant, index) => {
                      // Calculate percentage from current month data
                      const plantData = currentMonthData.find(p => (p.fullName || p.name) === plant.name);
                      const percent = plantData ? ((plantData.value / currentMonthTotal) * 100).toFixed(1) : '0.0';
                      
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2.5 px-4 py-2 rounded-lg hover:bg-background transition-colors"
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm border border-border/30"
                            style={{ backgroundColor: plant.color.base }}
                          />
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">
                            {plant.shortName}
                          </span>
                          <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                            ({percent}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
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
                      <td className="py-2 pr-4">{formatCurrency(entry.totalSavings, 1)}</td>
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
                                  {formatCurrency(practice.savings, 1)}{practice.benchmarked ? " • Benchmarked" : ""}
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


