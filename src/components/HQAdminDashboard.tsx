import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Shield,
  Zap,
  Target,
  DollarSign,
  Settings,
  Users,
  BarChart3,
  AlertTriangle,
  Star
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface HQAdminDashboardProps {
  onViewChange: (view: string) => void;
}

const HQAdminDashboard = ({ onViewChange }: HQAdminDashboardProps) => {
  const [showDivisionSelector, setShowDivisionSelector] = useState(false);
  const [division, setDivision] = useState<"all" | "rac" | "component">("all");

  const plantData = [
    { name: "Plant 1 - Gurgaon", submitted: 23, approved: 19, pending: 3, rejected: 1 },
    { name: "Plant 2 - Chennai", submitted: 18, approved: 15, pending: 2, rejected: 1 },
    { name: "Plant 3 - Pune", submitted: 31, approved: 28, pending: 2, rejected: 1 },
    { name: "Plant 4 - Kolkata", submitted: 15, approved: 12, pending: 1, rejected: 2 },
    { name: "Plant 5 - Mumbai", submitted: 22, approved: 18, pending: 3, rejected: 1 },
    { name: "Plant 6 - Delhi", submitted: 19, approved: 16, pending: 2, rejected: 1 },
    { name: "Plant 7 - Bangalore", submitted: 25, approved: 21, pending: 3, rejected: 1 },
    { name: "Plant 8 - Hyderabad", submitted: 17, approved: 14, pending: 2, rejected: 1 },
    { name: "Plant 9 - Ahmedabad", submitted: 20, approved: 17, pending: 2, rejected: 1 },
    { name: "Plant 10 - Jaipur", submitted: 16, approved: 13, pending: 2, rejected: 1 },
    { name: "Plant 11 - Lucknow", submitted: 21, approved: 18, pending: 2, rejected: 1 },
    { name: "Plant 12 - Indore", submitted: 18, approved: 15, pending: 2, rejected: 1 },
    { name: "Plant 13 - Bhopal", submitted: 14, approved: 12, pending: 1, rejected: 1 },
    { name: "Plant 14 - Patna", submitted: 19, approved: 16, pending: 2, rejected: 1 },
    { name: "Plant 15 - Bhubaneswar", submitted: 17, approved: 14, pending: 2, rejected: 1 }
  ];

  // Division datasets (mocked per requirements)
  const [racPlants, setRacPlants] = useState<{ name: string; active: boolean }[]>([
    { name: "RAC - P1 Gurugram", active: true },
    { name: "RAC - P2 Chennai", active: true },
    { name: "RAC - P3 Pune", active: true },
    { name: "RAC - P4 Kolkata", active: true },
    { name: "RAC - P5 Mumbai", active: true },
    { name: "RAC - P6 delhi", active: false },
    { name: "RAC - P7 Bangalore", active: false },
    { name: "RAC - P8 Hyderabad", active: false },
  ]);
  const [componentPlants, setComponentPlants] = useState<{ name: string; active: boolean }[]>([
    { name: "Component - P9 Ahmedabad", active: true },
    { name: "Component - P10 Jaipur", active: true },
    { name: "Component - P11 Lucknow", active: true },
    { name: "Component - P12 indore", active: true },
    { name: "Component - P 13 Bhopal", active: false },
    { name: "Component - P 14 Patna", active: false },
    { name: "Component - P 15 bhubaneswar", active: false },
  ]);

  const { activeCount, inactiveCount, visiblePlants } = useMemo(() => {
    const dataset = division === "rac" ? racPlants : division === "component" ? componentPlants : [...racPlants, ...componentPlants];
    const active = dataset.filter((p) => p.active);
    const inactive = dataset.filter((p) => !p.active);
    return { activeCount: active.length, inactiveCount: inactive.length, visiblePlants: dataset };
  }, [division, racPlants, componentPlants]);

  const togglePlantActive = (name: string) => {
    if (division === "rac" || division === "all") {
      setRacPlants((prev) => prev.map((p) => (p.name === name ? { ...p, active: !p.active } : p)));
    }
    if (division === "component" || division === "all") {
      setComponentPlants((prev) => prev.map((p) => (p.name === name ? { ...p, active: !p.active } : p)));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* HQ Overview Header */}
      <div className="lg:col-span-4">
        <Card className="bg-gradient-hero text-primary-foreground shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">HQ Admin Dashboard</h2>
                <p className="text-primary-foreground/80">Amber Group - Best Practices Overview</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                  onClick={() => setShowDivisionSelector((v) => !v)}
                >
                  Active
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Division Selector */}
      {showDivisionSelector && (
        <div className="lg:col-span-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={division === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDivision("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={division === "rac" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDivision("rac")}
                  >
                    RAC
                  </Button>
                  <Button
                    variant={division === "component" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDivision("component")}
                  >
                    Component
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/10 text-success">Active: {activeCount}</Badge>
                  <Badge variant="outline" className="bg-muted/50 text-muted-foreground">Inactive: {inactiveCount}</Badge>
                </div>
              </div>

              {/* Active / Inactive lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-medium mb-2">Active Plants</p>
                  <div className="space-y-2">
                    {visiblePlants.filter(p => p.active).map((p) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <span>{p.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-success/10 text-success">Active</Badge>
                          <Button size="sm" variant="outline" onClick={() => togglePlantActive(p.name)}>Inactive</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium mb-2">Inactive Plants</p>
                  <div className="space-y-2">
                    {visiblePlants.filter(p => !p.active).map((p) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <span>{p.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-muted/50 text-muted-foreground">Inactive</Badge>
                          <Button size="sm" className="bg-success text-success-foreground" onClick={() => togglePlantActive(p.name)}>Active</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Key Metrics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Total Submissions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-primary">87</div>
          <p className="text-sm text-muted-foreground">This Month</p>
          <div className="mt-2">
            <Badge variant="outline" className="bg-success/10 text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23% vs last month
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>Approval Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-success">89%</div>
          <p className="text-sm text-muted-foreground">Average Across Plants</p>
          <Progress value={89} className="mt-3" />
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Active Plants</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-primary">15</div>
          <p className="text-sm text-muted-foreground">Contributing This Month</p>
          <div className="mt-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              100% Participation
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-warning" />
            <span>Pending Review</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-warning">5</div>
          <p className="text-sm text-muted-foreground">Awaiting Approval</p>
          <Button size="sm" className="mt-2 w-full">
            Review Now
          </Button>
        </CardContent>
      </Card>

      {/* Category Breakdown - Group Wide */}
      <div className="lg:col-span-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Group-wide Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-category-safety/10 to-category-safety/5 p-4 rounded-lg border border-category-safety/20">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-category-safety" />
                  <div>
                    <p className="font-semibold text-category-safety">Safety</p>
                    <p className="text-2xl font-bold">34</p>
                    <p className="text-xs text-muted-foreground">92% approved</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-quality/10 to-category-quality/5 p-4 rounded-lg border border-category-quality/20">
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-category-quality" />
                  <div>
                    <p className="font-semibold text-category-quality">Quality</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-xs text-muted-foreground">89% approved</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-productivity/10 to-category-productivity/5 p-4 rounded-lg border border-category-productivity/20">
                <div className="flex items-center space-x-3">
                  <Zap className="h-8 w-8 text-category-productivity" />
                  <div>
                    <p className="font-semibold text-category-productivity">Productivity</p>
                    <p className="text-2xl font-bold">19</p>
                    <p className="text-xs text-muted-foreground">84% approved</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-cost/10 to-category-cost/5 p-4 rounded-lg border border-category-cost/20">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-category-cost" />
                  <div>
                    <p className="font-semibold text-category-cost">Cost</p>
                    <p className="text-2xl font-bold">21</p>
                    <p className="text-xs text-muted-foreground">90% approved</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-category-other/10 to-category-other/5 p-4 rounded-lg border border-category-other/20">
                <div className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-category-other" />
                  <div>
                    <p className="font-semibold text-category-other">Other</p>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">88% approved</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plant-wise Performance */}
      <div className="lg:col-span-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span>Plant-wise Performance KPI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                approved: { label: "Approved", color: "hsl(var(--success))" },
                rejected: { label: "Rejected", color: "hsl(var(--destructive))" },
              }}
              className="h-[400px] w-full"
            >
              <BarChart data={plantData.map(p => ({ 
                plant: p.name.replace("Plant ", "P").replace(" - Gurgaon", "").replace(" - Chennai", "").replace(" - Pune", "").replace(" - Kolkata", "").replace(" - Mumbai", "").replace(" - Delhi", "").replace(" - Bangalore", "").replace(" - Hyderabad", "").replace(" - Ahmedabad", "").replace(" - Jaipur", "").replace(" - Lucknow", "").replace(" - Indore", "").replace(" - Bhopal", "").replace(" - Patna", "").replace(" - Bhubaneswar", ""),
                fullName: p.name,
                approved: p.approved, 
                rejected: p.rejected 
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
                <Bar dataKey="approved" fill="var(--color-approved)" />
                <Bar dataKey="rejected" fill="var(--color-rejected)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>


      {/* Benchmark BPs - This Month */}
      <div className="lg:col-span-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Benchmark BPs - This Month</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              // Mock benchmark BPs count for each plant this month
              const benchmarkBPs = [
                { plant: "Plant 1 - Gurgaon", benchmarkedBPs: 5 },
                { plant: "Plant 2 - Chennai", benchmarkedBPs: 8 },
                { plant: "Plant 3 - Pune", benchmarkedBPs: 3 },
                { plant: "Plant 4 - Kolkata", benchmarkedBPs: 2 },
                { plant: "Plant 5 - Mumbai", benchmarkedBPs: 6 },
                { plant: "Plant 6 - Delhi", benchmarkedBPs: 4 },
                { plant: "Plant 7 - Bangalore", benchmarkedBPs: 7 },
                { plant: "Plant 8 - Hyderabad", benchmarkedBPs: 3 },
                { plant: "Plant 9 - Ahmedabad", benchmarkedBPs: 5 },
                { plant: "Plant 10 - Jaipur", benchmarkedBPs: 2 },
                { plant: "Plant 11 - Lucknow", benchmarkedBPs: 4 },
                { plant: "Plant 12 - Indore", benchmarkedBPs: 3 },
                { plant: "Plant 13 - Bhopal", benchmarkedBPs: 1 },
                { plant: "Plant 14 - Patna", benchmarkedBPs: 4 },
                { plant: "Plant 15 - Bhubaneswar", benchmarkedBPs: 3 },
              ];
              return (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Number of benchmarked BPs per plant this month
                  </div>
                  <ChartContainer
                    config={{
                      benchmarkedBPs: { label: "Benchmarked BPs", color: "hsl(var(--primary))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <BarChart data={benchmarkBPs.map(p => ({ 
                      plant: p.plant.replace("Plant ", "P").replace(" - Gurgaon", "").replace(" - Chennai", "").replace(" - Pune", "").replace(" - Kolkata", "").replace(" - Mumbai", "").replace(" - Delhi", "").replace(" - Bangalore", "").replace(" - Hyderabad", "").replace(" - Ahmedabad", "").replace(" - Jaipur", "").replace(" - Lucknow", "").replace(" - Indore", "").replace(" - Bhopal", "").replace(" - Patna", "").replace(" - Bhubaneswar", ""),
                      fullName: p.plant,
                      benchmarkedBPs: p.benchmarkedBPs 
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
                      <Bar dataKey="benchmarkedBPs" fill="var(--color-benchmarkedBPs)" />
                    </BarChart>
                  </ChartContainer>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Recent Benchmark BPs */}
      <div className="lg:col-span-4">
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
                  title: "Energy Efficient Cooling Process", 
                  plant: "Plant 1 - Gurgaon", 
                  category: "Cost", 
                  benchmarked: "4 hours ago",
                  priority: "medium"
                },
                { 
                  title: "Production Line Optimization", 
                  plant: "Plant 3 - Pune", 
                  category: "Productivity", 
                  benchmarked: "2 days ago",
                  priority: "low"
                },
                { 
                  title: "Waste Reduction Initiative", 
                  plant: "Plant 5 - Mumbai", 
                  category: "Cost", 
                  benchmarked: "3 days ago",
                  priority: "medium"
                }
              ].map((bp, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                     onClick={() => onViewChange("practice-list")}>
                  <div className="flex-1">
                    <h4 className="font-medium">{bp.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {bp.category}
                    </Badge>
                      <span className="text-xs text-muted-foreground">{bp.plant}</span>
                      <span className="text-xs text-muted-foreground">• {bp.benchmarked}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={
                        bp.priority === "high" 
                          ? "bg-destructive/10 text-destructive border-destructive"
                          : bp.priority === "medium"
                          ? "bg-warning/10 text-warning border-warning"
                          : "bg-muted/50 text-muted-foreground"
                      }
                    >
                      {bp.priority} priority
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Star Ratings - Savings based (Monthly & YTD) */}
      <div className="lg:col-span-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span>Star Ratings (Savings)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              // Demo savings data (in lakhs ₹)
              const savings = [
                { name: "Plant 1 - Gurgaon", monthly: 9.2, ytd: 112.5 },
                { name: "Plant 2 - Chennai", monthly: 17.8, ytd: 205.0 },
                { name: "Plant 3 - Pune", monthly: 6.5, ytd: 72.0 },
                { name: "Plant 4 - Kolkata", monthly: 3.2, ytd: 48.0 },
              ];

              const getStars = (monthly: number, ytd: number) => {
                // Both monthly and yearly thresholds must be met for a band
                if (ytd > 200 && monthly > 16) return 5;
                if (ytd > 150 && ytd < 200 && monthly > 12 && monthly < 16) return 4;
                if (ytd > 100 && ytd < 150 && monthly > 8 && monthly < 12) return 3;
                if (ytd > 50 && ytd < 100 && monthly > 4 && monthly < 8) return 2;
                if (ytd > 50 && monthly > 4) return 1;
                return 0;
              };

              // Calculate YTD stars: (sum of stars earned in each month ytd) / (total no. of months ytd)
              const calculateYTDStars = (monthlySavings: number, ytdSavings: number) => {
                const currentMonth = new Date().getMonth() + 1; // 1-12
                const monthlyStars = getStars(monthlySavings, ytdSavings);
                
                // Mock monthly star data for YTD calculation
                const monthlyStarData = [
                  { month: 1, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 2, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 3, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 4, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 5, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 6, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 7, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 8, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 9, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 10, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 11, stars: Math.floor(Math.random() * 3) + 1 },
                  { month: 12, stars: Math.floor(Math.random() * 3) + 1 },
                ];
                
                const ytdMonths = monthlyStarData.slice(0, currentMonth);
                const sumOfStars = ytdMonths.reduce((sum, month) => sum + month.stars, 0);
                const averageYTDStars = sumOfStars / currentMonth;
                
                return Math.round(averageYTDStars * 10) / 10; // Round to 1 decimal place
              };

              // Precompute stars
              const ratings = savings.map((p) => {
                const monthStars = getStars(p.monthly, p.ytd);
                const ytdStars = calculateYTDStars(p.monthly, p.ytd);
                return { ...p, monthStars, ytdStars };
              });

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">Plant</th>
                        <th className="py-2">Monthly Savings</th>
                        <th className="py-2">YTD Savings</th>
                        <th className="py-2">Stars (Month)</th>
                        <th className="py-2">Stars (YTD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {ratings.map((r) => (
                        <tr key={r.name} className="hover:bg-accent/50">
                          <td className="py-2 font-medium">{r.name}</td>
                          <td className="py-2">₹{r.monthly.toFixed(1)}L</td>
                          <td className="py-2">₹{r.ytd.toFixed(1)}L</td>
                          <td className="py-2">{r.monthStars}</td>
                          <td className="py-2">{r.ytdStars}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Benchmark BP Leaderboard */}
      <div className="lg:col-span-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Benchmark BP Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              // Mock leaderboard data with point breakdown
              const leaderboardData = [
                { 
                  plant: "Plant 2 - Chennai", 
                  totalPoints: 15, 
                  breakdown: [
                    { type: "Originator", points: 8, date: "2024-01-15", bpTitle: "Automated Quality Control" },
                    { type: "Copier", points: 4, date: "2024-01-12", bpTitle: "Energy Efficient Process" },
                    { type: "Originator", points: 2, date: "2024-01-10", bpTitle: "Safety Enhancement" },
                    { type: "Copier", points: 1, date: "2024-01-08", bpTitle: "Production Optimization" }
                  ]
                },
                { 
                  plant: "Plant 1 - Gurgaon", 
                  totalPoints: 12, 
                  breakdown: [
                    { type: "Originator", points: 6, date: "2024-01-14", bpTitle: "Cost Reduction Initiative" },
                    { type: "Copier", points: 3, date: "2024-01-11", bpTitle: "Quality Improvement" },
                    { type: "Originator", points: 2, date: "2024-01-09", bpTitle: "Waste Management" },
                    { type: "Copier", points: 1, date: "2024-01-07", bpTitle: "Safety Protocol" }
                  ]
                },
                { 
                  plant: "Plant 7 - Bangalore", 
                  totalPoints: 10, 
                  breakdown: [
                    { type: "Originator", points: 4, date: "2024-01-13", bpTitle: "Productivity Boost" },
                    { type: "Copier", points: 3, date: "2024-01-10", bpTitle: "Cost Optimization" },
                    { type: "Originator", points: 2, date: "2024-01-08", bpTitle: "Quality Enhancement" },
                    { type: "Copier", points: 1, date: "2024-01-06", bpTitle: "Safety Improvement" }
                  ]
                },
                { 
                  plant: "Plant 3 - Pune", 
                  totalPoints: 8, 
                  breakdown: [
                    { type: "Originator", points: 4, date: "2024-01-12", bpTitle: "Process Innovation" },
                    { type: "Copier", points: 2, date: "2024-01-09", bpTitle: "Efficiency Gain" },
                    { type: "Originator", points: 2, date: "2024-01-07", bpTitle: "Cost Savings" }
                  ]
                },
                { 
                  plant: "Plant 5 - Mumbai", 
                  totalPoints: 6, 
                  breakdown: [
                    { type: "Originator", points: 2, date: "2024-01-11", bpTitle: "Quality Control" },
                    { type: "Copier", points: 2, date: "2024-01-08", bpTitle: "Safety Enhancement" },
                    { type: "Copier", points: 2, date: "2024-01-05", bpTitle: "Productivity Gain" }
                  ]
                }
              ];
              
              return (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Total points earned through benchmark BPs (Originator: 2 points, Copier: 1 point)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground">
                          <th className="py-2">Plant</th>
                          <th className="py-2">Total Points</th>
                          <th className="py-2">Breakdown</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {leaderboardData.map((entry, index) => (
                          <tr key={entry.plant} className="hover:bg-accent/50">
                            <td className="py-2 font-medium cursor-pointer" 
                                onClick={() => {
                                  // In a real app, this would show a modal with detailed breakdown
                                  console.log("Breakdown for", entry.plant, entry.breakdown);
                                }}>
                              {entry.plant}
                              {index === 0 && <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">#1</Badge>}
                            </td>
                            <td className="py-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                                {entry.totalPoints}
                              </Badge>
                            </td>
                            <td className="py-2">
                              <div className="text-xs text-muted-foreground">
                                {entry.breakdown.length} entries
                                <div className="mt-1 space-y-1">
                                  {entry.breakdown.slice(0, 2).map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <Badge variant="outline" className={
                                        item.type === "Originator" 
                                          ? "bg-success/10 text-success border-success" 
                                          : "bg-primary/10 text-primary border-primary"
                                      }>
                                        {item.type}: {item.points}
                                      </Badge>
                                      <span className="text-xs">{item.bpTitle}</span>
                                    </div>
                                  ))}
                                  {entry.breakdown.length > 2 && (
                                    <div className="text-xs text-muted-foreground">
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

      {/* Recent Activity Feed */}
      <div className="lg:col-span-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity - Requiring Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "IoT Sensor Implementation for Predictive Maintenance", 
                  plant: "Plant 3 - Pune", 
                  category: "Productivity", 
                  submitted: "2 hours ago",
                  priority: "high"
                },
                { 
                  title: "Waste Heat Recovery System", 
                  plant: "Plant 1 - Gurgaon", 
                  category: "Cost", 
                  submitted: "4 hours ago",
                  priority: "medium"
                },
                { 
                  title: "Updated Chemical Storage Protocols", 
                  plant: "Plant 2 - Chennai", 
                  category: "Safety", 
                  submitted: "1 day ago",
                  priority: "high"
                },
                { 
                  title: "Quality Control Automation", 
                  plant: "Plant 4 - Kolkata", 
                  category: "Quality", 
                  submitted: "2 days ago",
                  priority: "low"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                     onClick={() => onViewChange("practice-list")}>
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.plant}</span>
                      <span className="text-xs text-muted-foreground">• {activity.submitted}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={
                        activity.priority === "high" 
                          ? "bg-destructive/10 text-destructive border-destructive"
                          : activity.priority === "medium"
                          ? "bg-warning/10 text-warning border-warning"
                          : "bg-muted/50 text-muted-foreground"
                      }
                    >
                      {activity.priority} priority
                    </Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HQAdminDashboard;