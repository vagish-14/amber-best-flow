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
  Settings
} from "lucide-react";

interface PlantUserDashboardProps {
  onViewChange: (view: string) => void;
}

const PlantUserDashboard = ({ onViewChange }: PlantUserDashboardProps) => {
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
                onClick={() => onViewChange("add-practice")}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Best Practice
              </Button>
            </div>
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
                     onClick={() => onViewChange("practice-detail")}>
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
    </div>
  );
};

export default PlantUserDashboard;