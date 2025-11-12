import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Shield,
  Zap,
  Target,
  IndianRupee,
  Settings,
  Copy,
  Star,
  BarChart3,
  Cpu,
  LineChart,
  Bot
} from "lucide-react";
import { KeyboardEvent, useMemo, useState } from "react";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface PlantUserDashboardProps {
  onViewChange: (view: string) => void;
  onCopyAndImplement?: (bpData: any) => void;
  monthlyCount?: number;
  ytdCount?: number;
  recentSubmissions?: { title: string; category: string; date: string; questions?: number; benchmarked?: boolean }[];
  leaderboard?: { plant: string; totalPoints: number; breakdown: { type: "Origin" | "Copier"; points: number; date: string; bpTitle: string }[] }[];
  copySpread?: { bp: string; origin: string; copies: { plant: string; date: string }[] }[];
}

const PlantUserDashboard = ({ onViewChange, onCopyAndImplement, monthlyCount, ytdCount, recentSubmissions, leaderboard, copySpread }: PlantUserDashboardProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedBP, setSelectedBP] = useState<any>(null);
  const [bpSpreadOpen, setBpSpreadOpen] = useState(false);
  const [bpSpreadBP, setBpSpreadBP] = useState<string | null>(null);
  const [bpSpreadRows, setBpSpreadRows] = useState<{ plant: string; date: string }[]>([]);
  const [lbDrillOpen, setLbDrillOpen] = useState(false);
  const [lbDrillPlant, setLbDrillPlant] = useState<string | null>(null);
  const [lbDrillData, setLbDrillData] = useState<{
    copied: { title: string; points: number; date: string }[];
    copiedCount: number;
    copiedPoints: number;
    originated: { title: string; copies: number; points: number }[];
    originatedCount: number;
    originatedPoints: number;
  } | null>(null);
  const [ytdDialogOpen, setYtdDialogOpen] = useState(false);

  const ytdPractices = useMemo(() => {
    const fallbackPractices = [
      { title: "Automated Quality Inspection System", category: "Quality", date: "2024-01-15", questions: 2, benchmarked: true },
      { title: "Energy Efficient Cooling Process", category: "Cost", date: "2024-01-12", questions: 0, benchmarked: true },
      { title: "Safety Protocol for Chemical Handling", category: "Safety", date: "2024-01-10", questions: 1, benchmarked: false },
      { title: "Production Line Optimization", category: "Productivity", date: "2024-01-08", questions: 3, benchmarked: false },
    ];
    const source = (recentSubmissions && recentSubmissions.length > 0) ? recentSubmissions : fallbackPractices;
    return source.map((practice) => ({
      ...practice,
      benchmarked: practice.benchmarked ?? false,
    }));
  }, [recentSubmissions]);

  const handleYtdCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setYtdDialogOpen(true);
    }
  };

  const handleCopyImplement = (bp: any) => {
    setSelectedBP(bp);
    setShowConfirmDialog(true);
  };

  // Base leaderboard to keep the table sizable; merge dynamic updates into this
  const baseLeaderboard = useMemo(() => ([
    { 
      plant: "Greater Noida (Ecotech 1)", 
      totalPoints: 36, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-02-12", bpTitle: "Digital Production Control Tower" },
        { type: "Copier", points: 5, date: "2025-02-20", bpTitle: "Assembly Line Cobots" },
        { type: "Origin", points: 10, date: "2025-01-15", bpTitle: "Automated Quality Inspection" },
        { type: "Copier", points: 5, date: "2025-03-10", bpTitle: "Safety Protocol for Chemical Handling" },
        { type: "Origin", points: 6, date: "2025-03-18", bpTitle: "Waste Reduction Initiative" }
      ]
    },
    { 
      plant: "Kanchipuram", 
      totalPoints: 28, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-05-20", bpTitle: "IoT Sensor Implementation" },
        { type: "Copier", points: 5, date: "2025-04-12", bpTitle: "Digital Production Control Tower" },
        { type: "Copier", points: 5, date: "2025-05-05", bpTitle: "Assembly Line Cobots" },
        { type: "Origin", points: 8, date: "2025-03-25", bpTitle: "Lean Packaging Redesign" }
      ]
    },
    { 
      plant: "Rajpura", 
      totalPoints: 26, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-02-28", bpTitle: "Green Energy Dashboard" },
        { type: "Copier", points: 5, date: "2025-03-22", bpTitle: "ELG Compliance Monitoring Program" },
        { type: "Origin", points: 6, date: "2025-01-30", bpTitle: "Smart Inventory Tagging" },
        { type: "Copier", points: 5, date: "2025-04-18", bpTitle: "Assembly Line Cobots" }
      ]
    },
    { 
      plant: "Shahjahanpur", 
      totalPoints: 22, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-06-14", bpTitle: "Digital Production Control Tower" },
        { type: "Copier", points: 5, date: "2025-05-04", bpTitle: "IoT Sensor Implementation" },
        { type: "Copier", points: 5, date: "2025-02-15", bpTitle: "Waste Reduction Initiative" },
        { type: "Origin", points: 2, date: "2025-03-02", bpTitle: "Visual Management Boards" }
      ]
    },
    { 
      plant: "Supa", 
      totalPoints: 20, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-03-10", bpTitle: "Safety Protocol for Chemical Handling" },
        { type: "Copier", points: 5, date: "2025-02-25", bpTitle: "Digital Production Control Tower" },
        { type: "Copier", points: 5, date: "2025-04-05", bpTitle: "IoT Sensor Implementation" }
      ]
    },
    { 
      plant: "Ranjangaon", 
      totalPoints: 19, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-04-08", bpTitle: "Production Line Optimization" },
        { type: "Copier", points: 5, date: "2025-04-22", bpTitle: "Assembly Line Cobots" },
        { type: "Copier", points: 4, date: "2025-05-26", bpTitle: "ELG Compliance Monitoring Program" }
      ]
    },
    { 
      plant: "Ponneri", 
      totalPoints: 18, 
      breakdown: [
        { type: "Origin", points: 10, date: "2025-02-09", bpTitle: "ELG Compliance Monitoring Program" },
        { type: "Copier", points: 5, date: "2025-03-18", bpTitle: "Waste Reduction Initiative" },
        { type: "Copier", points: 3, date: "2025-05-12", bpTitle: "Safety Protocol for Chemical Handling" }
      ]
    }
  ]), []);

  const mergedLeaderboard = useMemo(() => {
    if (!leaderboard || leaderboard.length === 0) return baseLeaderboard;
    const overrideByPlant = new Map(leaderboard.map((r) => [r.plant, r] as const));
    const merged = baseLeaderboard.map((base) => {
      const o = overrideByPlant.get(base.plant);
      return o ? { ...base, totalPoints: o.totalPoints, breakdown: o.breakdown } : base;
    });
    // Append any dynamic rows not present in base
    leaderboard.forEach((row) => {
      if (!merged.find((r) => r.plant === row.plant)) merged.push(row);
    });
    return merged;
  }, [baseLeaderboard, leaderboard]);

  const confirmCopyImplement = () => {
    // Prepare the data for pre-filling the form
    if (selectedBP && onCopyAndImplement) {
      onCopyAndImplement({
        title: selectedBP.title,
        category: selectedBP.category,
        problemStatement: selectedBP.problemStatement || "",
        solution: selectedBP.solution || "",
        originPlant: selectedBP.plant,
      });
    }
    setShowConfirmDialog(false);
    setSelectedBP(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Actions */}
      <div className="lg:col-span-3">
        <Card className="bg-gradient-hero text-primary-foreground shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Greater Noida (Ecotech 1)</h2>
                <p className="text-primary-foreground/80">Manufacturing Excellence Portal</p>
              </div>
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => {
                  // This will trigger handleViewChange in Index.tsx which clears formPreFillData
                  onViewChange("add-practice");
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Best Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Overview */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Monthly Progress (Uploaded BP's)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-baseline justify-between">
            <div className="text-4xl font-bold text-primary">{monthlyCount ?? 8}</div>
            <p className="text-sm text-muted-foreground">Practices in {new Date().toLocaleString('default', { month: 'long' })}</p>
          </div>
          <Progress value={66} className="w-full mt-2" />
          <div className="flex justify-end">
            <p className="text-xs text-muted-foreground">Target: 12 practices/month</p>
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-card cursor-pointer transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        role="button"
        tabIndex={0}
        onClick={() => setYtdDialogOpen(true)}
        onKeyDown={handleYtdCardKeyDown}
        aria-label="View year-to-date best practices"
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>YTD Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold text-primary">{ytdCount ?? 53}</div>
            <p className="text-sm text-muted-foreground">Total Submitted (YTD)</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Click to view the yearly breakdown of BP's</p>
        </CardContent>
      </Card>
      </div>

      {/* Category Wise Breakdown */}
      <div className="lg:col-span-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Category Wise BP's</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-category-safety/10 to-category-safety/5 p-4 rounded-lg border border-category-safety/20">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-category-safety" />
                  <div>
                    <p className="font-semibold text-category-safety">Safety</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-quality/10 to-category-quality/5 p-4 rounded-lg border border-category-quality/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-category-quality" />
                  <div>
                    <p className="font-semibold text-category-quality">Quality</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-productivity/10 to-category-productivity/5 p-4 rounded-lg border border-category-productivity/20">
                <div className="flex items-center space-x-3">
                  <Zap className="h-8 w-8 text-category-productivity" />
                  <div>
                    <p className="font-semibold text-category-productivity">Productivity</p>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-cost/10 to-category-cost/5 p-4 rounded-lg border border-category-cost/20">
                <div className="flex items-center space-x-3">
                  <IndianRupee className="h-8 w-8 text-category-cost" />
                  <div>
                    <p className="font-semibold text-category-cost">Cost</p>
                    <p className="text-2xl font-bold">6</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200/80">
                <div className="flex items-center space-x-3">
                  <Cpu className="h-8 w-8 text-indigo-500" />
                  <div>
                    <p className="font-semibold text-indigo-600">Digitalisation</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200/80">
                <div className="flex items-center space-x-3">
                  <LineChart className="h-8 w-8 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-emerald-600">ELG</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200/80">
                <div className="flex items-center space-x-3">
                  <Bot className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="font-semibold text-amber-600">Automation</p>
                    <p className="text-2xl font-bold">7</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-other/10 to-category-other/5 p-4 rounded-lg border border-category-other/20">
                <div className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-category-other" />
                  <div>
                    <p className="font-semibold text-category-other">Other</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={ytdDialogOpen} onOpenChange={setYtdDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Year-to-Date Best Practices</AlertDialogTitle>
            <AlertDialogDescription>
              Overview of all practices submitted this year and their benchmark status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2 pr-4">Practice</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4 text-center">Benchmark</th>
                  <th className="py-2 pr-4 text-center">Q&A</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ytdPractices.map((practice, index) => (
                  <tr key={`${practice.title}-${index}`} className="hover:bg-accent/50">
                    <td className="py-2 pr-4 font-medium">{practice.title}</td>
                    <td className="py-2 pr-4">{practice.category}</td>
                    <td className="py-2 pr-4">{practice.date}</td>
                    <td className="py-2 pr-4 text-center">
                      <Badge
                        variant="outline"
                        className={
                          practice.benchmarked
                            ? "bg-success/10 text-success border-success"
                            : "bg-muted/50 text-muted-foreground"
                        }
                      >
                        {practice.benchmarked ? "Benchmarked" : "Not Benchmarked"}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4 text-center">
                      {practice.questions ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => setYtdDialogOpen(false)}>
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    {/* KPI: BP Copy Spread */}
    <div className="lg:col-span-3">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Benchmark BP Copy Spread</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const rows = copySpread ?? [
              {
                bp: "Digital Production Control Tower",
                origin: "Greater Noida (Ecotech 1)",
                copies: [
                  { plant: "Kanchipuram", date: "2025-02-18" },
                  { plant: "Shahjahanpur", date: "2025-02-24" },
                ],
              },
              {
                bp: "Assembly Line Cobots",
                origin: "Ranjangaon",
                copies: [
                  { plant: "Greater Noida (Ecotech 1)", date: "2025-04-20" },
                  { plant: "Rajpura", date: "2025-04-28" },
                ],
              },
              {
                bp: "ELG Compliance Monitoring Program",
                origin: "Ponneri",
                copies: [
                  { plant: "Greater Noida (Ecotech 1)", date: "2025-02-18" },
                  { plant: "Rajpura", date: "2025-03-05" },
                  { plant: "Ranjangaon", date: "2025-05-26" },
                ],
              },
            ];

            return (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2">BP Name</th>
                      <th className="py-2">Origin Plant</th>
                      <th className="py-2">Replicated to Plant (No's)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rows.map((row) => (
                      <tr
                        key={row.bp}
                        className="hover:bg-accent/50 cursor-pointer"
                        onClick={() => {
                          setBpSpreadBP(row.bp);
                          setBpSpreadRows(row.copies);
                          setBpSpreadOpen(true);
                        }}
                      >
                        <td className="py-2 font-medium">{row.bp}</td>
                        <td className="py-2">{row.origin}</td>
                        <td className="py-2">{row.copies.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}

          <AlertDialog open={bpSpreadOpen} onOpenChange={setBpSpreadOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {bpSpreadBP ? `${bpSpreadBP} - Copied by Plants` : "Copied by Plants"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Only benchmarked BPs can be copied. List shows plants and dates of copy.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-1">Plant</th>
                      <th className="py-1">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {bpSpreadRows.map((r, idx) => (
                      <tr key={idx}>
                        <td className="py-1">{r.plant}</td>
                        <td className="py-1">{r.date}</td>
                      </tr>
                    ))}
                    {bpSpreadRows.length === 0 && (
                      <tr>
                        <td className="py-1 text-muted-foreground" colSpan={2}>No copies yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction onClick={() => setBpSpreadOpen(false)}>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>

      {/* Status Overview removed */}

      {/* Monthly Cost Savings & Stars */}
      <div className="lg:col-span-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Monthly Cost Savings & Stars</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              // Mock data for monthly cost savings and stars
              const monthlyData = [
                { month: "Jan", costSavings: 12.5, stars: 2 },
                { month: "Feb", costSavings: 15.2, stars: 3 },
                { month: "Mar", costSavings: 18.7, stars: 4 },
                { month: "Apr", costSavings: 14.3, stars: 2 },
                { month: "May", costSavings: 16.8, stars: 3 },
                { month: "Jun", costSavings: 20.1, stars: 4 },
                { month: "Jul", costSavings: 17.5, stars: 3 },
                { month: "Aug", costSavings: 19.2, stars: 4 },
                { month: "Sep", costSavings: 22.4, stars: 5 },
                { month: "Oct", costSavings: 18.9, stars: 3 },
                { month: "Nov", costSavings: 21.3, stars: 4 },
                { month: "Dec", costSavings: 24.7, stars: 5 },
              ];

              const currentMonth = monthlyData[monthlyData.length - 1];
              const ytdSavings = monthlyData.reduce((sum, month) => sum + month.costSavings, 0);
              const ytdStars = monthlyData.reduce((sum, month) => sum + month.stars, 0);

              return (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-700">₹{currentMonth.costSavings}L</div>
                        <p className="text-sm text-green-600">This Month Savings</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">₹{ytdSavings.toFixed(1)}L</div>
                        <p className="text-sm text-blue-600">YTD Savings</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-700">{ytdStars}</div>
                        <p className="text-sm text-yellow-600">Total Stars Earned</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Chart */}
                  <ChartContainer
                    config={{
                      costSavings: { label: "Cost Savings (₹L)", color: "hsl(var(--success))" },
                      stars: { label: "Stars Earned", color: "hsl(var(--warning))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-md">
                                <div className="grid gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
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
                                        {entry.dataKey === 'costSavings' ? 'Cost Savings' : 'Stars'}: {entry.value}
                                        {entry.dataKey === 'costSavings' ? 'L' : ''}
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
                      <Bar yAxisId="left" dataKey="costSavings" fill="var(--color-costSavings)" />
                      <Bar yAxisId="right" dataKey="stars" fill="var(--color-stars)" />
                    </BarChart>
                  </ChartContainer>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Recent Benchmark BPs */}
      <div className="lg:col-span-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span>Recent Benchmark BPs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Digital Production Control Tower", 
                  plant: "Greater Noida (Ecotech 1)", 
                  category: "Digitalisation", 
                  benchmarked: "4 hours ago",
                  savings: "₹1.6L monthly",
                  problemStatement: "Fragmented data across production systems slowed response times to downtime events.",
                  solution: "Deployed a centralized control tower integrating machine data, quality dashboards, and maintenance alerts for real-time decision making."
                },
                { 
                  title: "Assembly Line Cobots", 
                  plant: "Ranjangaon", 
                  category: "Automation", 
                  benchmarked: "2 days ago",
                  savings: "25% cycle time reduction",
                  problemStatement: "Manual fastening tasks were causing ergonomic issues and inconsistent torque quality.",
                  solution: "Implemented collaborative robots with vision guidance to execute fastening and inspection while operators focus on quality verification."
                },
                { 
                  title: "ELG Compliance Monitoring Program", 
                  plant: "Ponneri", 
                  category: "ELG", 
                  benchmarked: "3 days ago",
                  savings: "₹0.8L compliance cost reduction",
                  problemStatement: "Manual compliance tracking risked missed deadlines and reactive responses to regulatory changes.",
                  solution: "Rolled out an ELG framework with digital trackers, automated alerts, and centralized documentation workflows."
                }
              ].map((bp, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{bp.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {bp.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{bp.plant}</span>
                      <span className="text-xs text-muted-foreground">• {bp.benchmarked}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Expected Savings: {bp.savings}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onViewChange("profile")}>
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleCopyImplement(bp)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy & Implement
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <div className="lg:col-span-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Your Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(recentSubmissions ?? [
                { title: "Automated Quality Inspection System", category: "Quality", date: "2024-01-15", questions: 2, benchmarked: true },
                { title: "Energy Efficient Cooling Process", category: "Cost", date: "2024-01-12", questions: 0, benchmarked: true },
                { title: "Safety Protocol for Chemical Handling", category: "Safety", date: "2024-01-10", questions: 1, benchmarked: false },
                { title: "Production Line Optimization", category: "Productivity", date: "2024-01-08", questions: 3, benchmarked: false }
              ]).map((practice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                     onClick={() => onViewChange("practice-list")}>
                  <div className="flex-1">
                    <h4 className="font-medium">{practice.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {practice.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{practice.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {practice.questions && practice.questions > 0 && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {practice.questions} Q&A
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark BP Leaderboard */}
      <div className="lg:col-span-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Benchmark BP Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const leaderboardData = mergedLeaderboard;
              return (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Total points earned through benchmark BPs (Origin: 10 points, Copier: 5 points)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-muted-foreground">
                          <th className="py-1">Rank</th>
                          <th className="py-1">Plant</th>
                          <th className="py-1 text-center pl-2">Total Points</th>
                          <th className="py-1 text-center pl-1">Breakdown</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {leaderboardData.map((entry, index) => (
                          <tr
                            key={entry.plant}
                            className="hover:bg-accent/50 cursor-pointer"
                            onClick={() => {
                              const asCopier = entry.breakdown.filter((b) => b.type === "Copier");
                              const copiedCount = asCopier.length;
                              const copiedPoints = asCopier.reduce((s, b) => s + (b.points || 0), 0);

                              const asOrigin = entry.breakdown.filter((b) => b.type === "Origin");
                              const perBPMap = new Map<string, { title: string; copies: number; points: number }>();
                              asOrigin.forEach((b) => {
                                const prev = perBPMap.get(b.bpTitle) || { title: b.bpTitle, copies: 0, points: 0 };
                                prev.copies += 1;
                                prev.points += b.points || 0;
                                perBPMap.set(b.bpTitle, prev);
                              });
                              const originated = Array.from(perBPMap.values());
                              const originatedCount = originated.length;
                              const originatedPoints = originated.reduce((s, r) => s + r.points, 0);

                              setLbDrillPlant(entry.plant);
                              setLbDrillData({
                                copied: asCopier.map((c) => ({ title: c.bpTitle, points: c.points, date: c.date })),
                                copiedCount,
                                copiedPoints,
                                originated,
                                originatedCount,
                                originatedPoints,
                              });
                              setLbDrillOpen(true);
                            }}
                          >
                            <td className="py-1 font-medium">
                              {index === 0 && <Badge variant="outline" className="bg-primary/10 text-primary text-xs px-1 py-0">#1</Badge>}
                              {index === 1 && <Badge variant="outline" className="bg-secondary/10 text-secondary text-xs px-1 py-0">#2</Badge>}
                              {index === 2 && <Badge variant="outline" className="bg-accent/10 text-accent-foreground text-xs px-1 py-0">#3</Badge>}
                              {index > 2 && <span className="text-muted-foreground text-xs">#{index + 1}</span>}
                            </td>
                            <td className="py-1 font-medium text-xs">{entry.plant}</td>
                            <td className="py-1 text-center pl-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary text-xs px-1 py-0">
                                {entry.totalPoints}
                              </Badge>
                            </td>
                            <td className="py-1 text-center pl-1">
                              <div className="text-xs text-muted-foreground">
                                <div className="text-xs">{entry.breakdown.length} entries</div>
                                <div className="mt-0.5 space-y-0.5">
                                  {entry.breakdown.slice(0, 2).map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-center gap-1">
                                      <Badge variant="outline" className={
                                        item.type === "Origin" 
                                          ? "bg-success/10 text-success border-success text-xs px-1 py-0" 
                                          : "bg-primary/10 text-primary border-primary text-xs px-1 py-0"
                                      }>
                                        {item.type}: {item.points}
                                      </Badge>
                                      <span className="text-xs">{item.bpTitle}</span>
                                    </div>
                                  ))}
                                  {entry.breakdown.length > 2 && (
                                    <div className="text-xs text-muted-foreground text-center">
                                      +{entry.breakdown.length - 2} more...
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Drilldown */}
      <AlertDialog open={lbDrillOpen} onOpenChange={setLbDrillOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {lbDrillPlant ? `${lbDrillPlant} - Benchmark Points Breakdown` : "Benchmark Points Breakdown"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Only benchmarked BPs can be copied. Summary below reflects copies and originated benchmarked BPs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium mb-1">BPs Copied by This Plant</div>
                <div>Count: <span className="font-semibold">{lbDrillData?.copiedCount ?? 0}</span></div>
                <div>Points: <span className="font-semibold">{lbDrillData?.copiedPoints ?? 0}</span></div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium mb-1">Benchmarked BPs (Originated)</div>
                <div>Count: <span className="font-semibold">{lbDrillData?.originatedCount ?? 0}</span></div>
                <div>Points: <span className="font-semibold">{lbDrillData?.originatedPoints ?? 0}</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium mb-2">Copied by This Plant (Details)</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-1">BP Title</th>
                        <th className="py-1">Points</th>
                        <th className="py-1">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {(lbDrillData?.copied ?? []).map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-1">{row.title}</td>
                          <td className="py-1">{row.points}</td>
                          <td className="py-1">{row.date}</td>
                        </tr>
                      ))}
                      {(!lbDrillData || lbDrillData.copied.length === 0) && (
                        <tr>
                          <td className="py-1 text-muted-foreground" colSpan={3}>No copied entries</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Benchmarked BPs (Details)</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-1">BP Title</th>
                        <th className="py-1">Copies</th>
                        <th className="py-1">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {(lbDrillData?.originated ?? []).map((row) => (
                        <tr key={row.title}>
                          <td className="py-1">{row.title}</td>
                          <td className="py-1">{row.copies}</td>
                          <td className="py-1">{row.points}</td>
                        </tr>
                      ))}
                      {(!lbDrillData || lbDrillData.originated.length === 0) && (
                        <tr>
                          <td className="py-1 text-muted-foreground" colSpan={3}>No originated benchmarked BPs</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => setLbDrillOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Copy & Implement Best Practice</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to copy and implement "{selectedBP?.title}" from {selectedBP?.plant}?
              <br /><br />
              <strong>Points System:</strong>
              <br />• {selectedBP?.plant} will receive 10 points (Origin)
              <br />• Your plant will receive 5 points (copier)
              <br /><br />
              This action will add this practice to your plant's implementation list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCopyImplement}>
              Copy & Implement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlantUserDashboard;