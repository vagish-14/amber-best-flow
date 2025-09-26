import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  AlertTriangle
} from "lucide-react";

interface HQAdminDashboardProps {
  onViewChange: (view: string) => void;
}

const HQAdminDashboard = ({ onViewChange }: HQAdminDashboardProps) => {
  const plantData = [
    { name: "Plant 1 - Gurgaon", submitted: 23, approved: 19, pending: 3, rejected: 1 },
    { name: "Plant 2 - Chennai", submitted: 18, approved: 15, pending: 2, rejected: 1 },
    { name: "Plant 3 - Pune", submitted: 31, approved: 28, pending: 2, rejected: 1 },
    { name: "Plant 4 - Kolkata", submitted: 15, approved: 12, pending: 1, rejected: 2 }
  ];

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
                <Badge className="bg-white/20 text-white">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  5 Pending Approvals
                </Badge>
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Review Queue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <div className="text-3xl font-bold text-primary">4</div>
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
              <span>Plant-wise Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plantData.map((plant, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                     onClick={() => onViewChange("practice-detail")}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{plant.name}</h4>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {Math.round((plant.approved / plant.submitted) * 100)}% approval
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{plant.submitted}</div>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-success">{plant.approved}</div>
                      <p className="text-xs text-muted-foreground">Approved</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-warning">{plant.pending}</div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-destructive">{plant.rejected}</div>
                      <p className="text-xs text-muted-foreground">Rejected</p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={(plant.approved / plant.submitted) * 100} 
                    className="mt-3" 
                  />
                </div>
              ))}
            </div>
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