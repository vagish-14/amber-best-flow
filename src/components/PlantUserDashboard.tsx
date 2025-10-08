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
  DollarSign,
  Settings,
  Copy,
  Star,
  BarChart3
} from "lucide-react";
import { useState } from "react";
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
}

const PlantUserDashboard = ({ onViewChange, onCopyAndImplement }: PlantUserDashboardProps) => {
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

  const handleCopyImplement = (bp: any) => {
    setSelectedBP(bp);
    setShowConfirmDialog(true);
  };

  const confirmCopyImplement = () => {
    // Prepare the data for pre-filling the form
    if (selectedBP && onCopyAndImplement) {
      onCopyAndImplement({
        title: selectedBP.title,
        category: selectedBP.category,
        problemStatement: selectedBP.problemStatement || "",
        solution: selectedBP.solution || "",
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
                <h2 className="text-2xl font-bold">Plant 2 - Chennai</h2>
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
            const copySpread = [
              {
                bp: "Energy Efficient Cooling Process",
                originator: "Plant 1 - Gurgaon",
                copies: [
                  { plant: "Plant 2 - Chennai", date: "2024-01-12" },
                  { plant: "Plant 7 - Bangalore", date: "2024-01-16" },
                ],
              },
              {
                bp: "Production Line Optimization",
                originator: "Plant 3 - Pune",
                copies: [
                  { plant: "Plant 5 - Mumbai", date: "2024-01-11" },
                ],
              },
              {
                bp: "Waste Reduction Initiative",
                originator: "Plant 5 - Mumbai",
                copies: [
                  { plant: "Plant 1 - Gurgaon", date: "2024-01-20" },
                  { plant: "Plant 4 - Kolkata", date: "2024-01-22" },
                  { plant: "Plant 9 - Ahmedabad", date: "2024-01-25" },
                ],
              },
            ];

            return (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2">BP Name</th>
                      <th className="py-2">Originator Plant</th>
                      <th className="py-2">Copied To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {copySpread.map((row) => (
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
                        <td className="py-2">{row.originator}</td>
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

      {/* Statistics Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Monthly Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">8</div>
            <p className="text-sm text-muted-foreground">Practices This Month</p>
          </div>
          <Progress value={66} className="w-full" />
          <p className="text-xs text-muted-foreground text-center">Target: 12 practices/month</p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>YTD Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">45</div>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">53</div>
              <p className="text-xs text-muted-foreground">Total Submitted</p>
            </div>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              85% Approval Rate
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-warning" />
            <span>Status Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Pending Review</span>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning">3</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Approved</span>
            <Badge variant="outline" className="bg-success/10 text-success border-success">45</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Needs Revision</span>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">2</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="lg:col-span-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Category Breakdown - Your Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  <DollarSign className="h-8 w-8 text-category-cost" />
                  <div>
                    <p className="font-semibold text-category-cost">Cost</p>
                    <p className="text-2xl font-bold">6</p>
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
                  title: "Energy Efficient Cooling Process", 
                  plant: "Plant 1 - Gurgaon", 
                  category: "Cost", 
                  benchmarked: "4 hours ago",
                  priority: "medium",
                  savings: "₹1.2L annually",
                  problemStatement: "High energy consumption from cooling systems was increasing operational costs. Traditional cooling methods were inefficient and consumed excessive electricity during peak production hours.",
                  solution: "Implemented variable frequency drive (VFD) cooling system with smart temperature sensors and automated controls. Added thermal insulation and optimized airflow patterns."
                },
                { 
                  title: "Production Line Optimization", 
                  plant: "Plant 3 - Pune", 
                  category: "Productivity", 
                  benchmarked: "2 days ago",
                  priority: "low",
                  savings: "25% throughput increase",
                  problemStatement: "Production bottlenecks were causing delays and reducing overall efficiency. Workflow was not optimized for current production requirements.",
                  solution: "Redesigned production line layout with lean manufacturing principles, implemented kanban system, and optimized material flow patterns."
                },
                { 
                  title: "Waste Reduction Initiative", 
                  plant: "Plant 5 - Mumbai", 
                  category: "Cost", 
                  benchmarked: "3 days ago",
                  priority: "medium",
                  savings: "35% heating cost reduction",
                  problemStatement: "Significant thermal energy was being wasted from production processes, leading to high energy costs and environmental impact.",
                  solution: "Installed heat recovery units to capture waste heat from exhaust systems and reuse it for heating processes and facility heating."
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
              {[
                { title: "Automated Quality Inspection System", category: "Quality", status: "approved", date: "2024-01-15", questions: 2 },
                { title: "Energy Efficient Cooling Process", category: "Cost", status: "pending", date: "2024-01-12", questions: 0 },
                { title: "Safety Protocol for Chemical Handling", category: "Safety", status: "approved", date: "2024-01-10", questions: 1 },
                { title: "Production Line Optimization", category: "Productivity", status: "revision", date: "2024-01-08", questions: 3 }
              ].map((practice, index) => (
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
                    {practice.questions > 0 && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {practice.questions} Q&A
                      </Badge>
                    )}
                    <Badge 
                      variant="outline" 
                      className={
                        practice.status === "approved" 
                          ? "bg-success/10 text-success border-success"
                          : practice.status === "pending"
                          ? "bg-warning/10 text-warning border-warning"
                          : "bg-destructive/10 text-destructive border-destructive"
                      }
                    >
                      {practice.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {practice.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {practice.status === "revision" && <XCircle className="h-3 w-3 mr-1" />}
                      {practice.status.charAt(0).toUpperCase() + practice.status.slice(1)}
                    </Badge>
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

                              const asOriginator = entry.breakdown.filter((b) => b.type === "Originator");
                              const perBPMap = new Map<string, { title: string; copies: number; points: number }>();
                              asOriginator.forEach((b) => {
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
                                        item.type === "Originator" 
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
              <br />• {selectedBP?.plant} will receive 2 points (originator)
              <br />• Your plant will receive 1 point (copier)
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