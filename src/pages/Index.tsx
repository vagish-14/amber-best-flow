import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/LoginForm";
import PlantUserDashboard from "@/components/PlantUserDashboard";
import HQAdminDashboard from "@/components/HQAdminDashboard";
import BestPracticeForm from "@/components/BestPracticeForm";
import BestPracticeDetail from "@/components/BestPracticeDetail";
import ApprovalsList from "@/components/ApprovalsList";
import Analytics from "@/components/Analytics";
import BenchmarkedList from "@/components/BenchmarkedList";
import PracticeList from "@/components/PracticeList";
import Navigation from "@/components/Navigation";
import { Building2, Shield, LogIn } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState("login");
  const [userRole, setUserRole] = useState<"plant" | "hq" | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<any>(null);
  const [benchmarkedIds, setBenchmarkedIds] = useState<string[]>(["BP-002", "BP-004", "BP-006"]);
  const [formPreFillData, setFormPreFillData] = useState<{
    title?: string;
    category?: string;
    problemStatement?: string;
    solution?: string;
  } | null>(null);
  const [benchmarkedById, setBenchmarkedById] = useState<Record<string, any>>({
    "BP-002": {
      id: "BP-002",
      title: "Energy Efficient Cooling Process",
      category: "Cost",
      status: "pending",
      submittedBy: "Amit Singh",
      plant: "Plant 1 - Gurgaon",
      submittedDate: "2024-01-12",
      description: "Optimized cooling system that reduces energy consumption by 30% while maintaining optimal temperature control in production areas.",
      problemStatement: "High energy consumption from cooling systems was increasing operational costs. Traditional cooling methods were inefficient and consumed excessive electricity during peak production hours.",
      solution: "Implemented variable frequency drive (VFD) cooling system with smart temperature sensors and automated controls. Added thermal insulation and optimized airflow patterns.",
      benefits: [
        "30% reduction in energy consumption",
        "₹1.2L annual cost savings",
        "Improved temperature consistency",
        "Reduced maintenance requirements"
      ],
      metrics: "Energy savings: 30%, Cost reduction: ₹1.2L annually, Temperature variance reduced by 40%",
      implementation: "Implementation took 4 weeks with electrical team. Investment: ₹3L with 8-month payback period.",
      questions: 0
    },
    "BP-004": {
      id: "BP-004",
      title: "Production Line Optimization",
      category: "Productivity",
      status: "revision",
      submittedBy: "Vikram Sharma",
      plant: "Plant 4 - Kolkata",
      submittedDate: "2024-01-08",
      description: "Streamlined production line layout and workflow optimization that increased throughput by 25%.",
      problemStatement: "Production bottlenecks were causing delays and reducing overall efficiency. Workflow was not optimized for current production requirements.",
      solution: "Redesigned production line layout with lean manufacturing principles, implemented kanban system, and optimized material flow patterns.",
      benefits: [
        "25% increase in throughput",
        "Reduced material handling time",
        "Improved worker efficiency",
        "Better space utilization"
      ],
      metrics: "Throughput increase: 25%, Material handling time reduced by 40%, Space utilization improved by 30%",
      implementation: "Implementation ongoing - Phase 1 completed in 8 weeks. Total investment: ₹5L with expected 12-month ROI.",
      questions: 3
    },
    "BP-006": {
      id: "BP-006",
      title: "Waste Reduction Initiative",
      category: "Cost",
      status: "pending",
      submittedBy: "Priya Gupta",
      plant: "Plant 1 - Gurgaon",
      submittedDate: "2024-01-18",
      description: "Implementation of waste heat recovery system that captures and reuses thermal energy from production processes.",
      problemStatement: "Significant thermal energy was being wasted from production processes, leading to high energy costs and environmental impact.",
      solution: "Installed heat recovery units to capture waste heat from exhaust systems and reuse it for heating processes and facility heating.",
      benefits: [
        "35% reduction in heating costs",
        "Reduced carbon footprint",
        "Improved energy efficiency",
        "Lower operational costs"
      ],
      metrics: "Heating cost reduction: 35%, Energy efficiency improvement: 25%, Carbon footprint reduction: 30%",
      implementation: "Installation completed in 5 weeks with engineering team. Investment: ₹6L with 15-month payback period.",
      questions: 1
    }
  });

  // Dynamic updates for submissions and copies
  const userPlant = "Plant 2 - Chennai";
  const [plantMonthlyCount, setPlantMonthlyCount] = useState<number>(8);
  const [plantYtdCount, setPlantYtdCount] = useState<number>(53);
  const [recentSubmissions, setRecentSubmissions] = useState<{ title: string; category: string; date: string; questions?: number }[]>([
    { title: "Automated Quality Inspection System", category: "Quality", date: "2024-01-15", questions: 2 },
    { title: "Energy Efficient Cooling Process", category: "Cost", date: "2024-01-12", questions: 0 },
    { title: "Safety Protocol for Chemical Handling", category: "Safety", date: "2024-01-10", questions: 1 },
    { title: "Production Line Optimization", category: "Productivity", date: "2024-01-08", questions: 3 },
  ]);
  const [leaderboard, setLeaderboard] = useState<{ plant: string; totalPoints: number; breakdown: { type: "Originator" | "Copier"; points: number; date: string; bpTitle: string }[] }[]>([
    {
      plant: "Plant 2 - Chennai",
      totalPoints: 24,
      breakdown: [
        { type: "Originator", points: 10, date: "2024-01-15", bpTitle: "Automated Quality Control" },
        { type: "Copier", points: 2, date: "2024-01-12", bpTitle: "Energy Efficient Process" },
        { type: "Originator", points: 10, date: "2024-01-10", bpTitle: "Safety Enhancement" },
        { type: "Copier", points: 2, date: "2024-01-08", bpTitle: "Production Optimization" },
      ],
    },
    {
      plant: "Plant 1 - Gurgaon",
      totalPoints: 24,
      breakdown: [
        { type: "Originator", points: 10, date: "2024-01-14", bpTitle: "Cost Reduction Initiative" },
        { type: "Copier", points: 2, date: "2024-01-11", bpTitle: "Quality Improvement" },
        { type: "Originator", points: 10, date: "2024-01-09", bpTitle: "Waste Management" },
        { type: "Copier", points: 2, date: "2024-01-07", bpTitle: "Safety Protocol" },
      ],
    },
  ]);
  const [copySpread, setCopySpread] = useState<{ bp: string; originator: string; copies: { plant: string; date: string }[] }[]>([
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
      copies: [{ plant: "Plant 5 - Mumbai", date: "2024-01-11" }],
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
  ]);
  const [hqThisMonthTotal, setHqThisMonthTotal] = useState<number>(187);
  const [hqYtdTotal, setHqYtdTotal] = useState<number>(295);
  const [pendingCopyMeta, setPendingCopyMeta] = useState<{ originatorPlant: string; bpTitle: string } | null>(null);

  const isBenchmarked = (id?: string) => (id ? benchmarkedIds.includes(id) : false);
  const toggleBenchmark = (practiceOrId?: any) => {
    const id = typeof practiceOrId === "string" ? practiceOrId : practiceOrId?.id;
    if (!id) return;
    setBenchmarkedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setBenchmarkedById((prev) => {
      if (prev[id]) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return typeof practiceOrId === "object" && practiceOrId
        ? { ...prev, [id]: practiceOrId }
        : prev;
    });
  };

  const handleLogin = (role: "plant" | "hq") => {
    setUserRole(role);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView("login");
  };

  const handleCopyAndImplement = (bpData: any) => {
    setFormPreFillData({
      title: bpData.title,
      category: bpData.category,
      problemStatement: bpData.problemStatement || bpData.problem || "",
      solution: bpData.solution || bpData.description || "",
    });
    if (bpData.originatorPlant && bpData.title) {
      setPendingCopyMeta({ originatorPlant: bpData.originatorPlant, bpTitle: bpData.title });
    }
    setCurrentView("add-practice");
  };

  const handleViewChange = (view: string) => {
    // Clear pre-fill data when navigating to add-practice normally (not from copy & implement)
    if (view === "add-practice") {
      setFormPreFillData(null);
      setPendingCopyMeta(null);
    }
    setCurrentView(view);
  };

  const onFormSubmit = (payload: {
    title: string;
    category: string;
    problemStatement: string;
    solution: string;
    benefits: string;
    metrics: string;
    implementation: string;
    beforeImageName: string | null;
    afterImageName: string | null;
    mode: "copy-implement" | "new-submission";
  }) => {
    const today = new Date().toISOString().slice(0, 10);
    // Update plant user metrics
    setPlantMonthlyCount((c) => c + 1);
    setPlantYtdCount((c) => c + 1);
    setRecentSubmissions((list) => [{ title: payload.title, category: payload.category, date: today }, ...list].slice(0, 20));

    // Update HQ totals
    setHqThisMonthTotal((c) => c + 1);
    setHqYtdTotal((c) => c + 1);

    // If this was a copy & implement, update leaderboard and copy spread
    if (payload.mode === "copy-implement" && pendingCopyMeta) {
      const { originatorPlant, bpTitle } = pendingCopyMeta;
      setLeaderboard((prev) => {
        const next = prev.map((row) => ({ ...row, breakdown: [...row.breakdown] }));
        const addPoints = (plant: string, type: "Originator" | "Copier", points: number) => {
          const idx = next.findIndex((r) => r.plant === plant);
          const entry = { type, points, date: today, bpTitle } as const;
          if (idx >= 0) {
            next[idx].breakdown.unshift(entry as any);
            next[idx].totalPoints += points;
          } else {
            next.push({ plant, totalPoints: points, breakdown: [entry as any] });
          }
        };
        addPoints(userPlant, "Copier", 2);
        addPoints(originatorPlant, "Originator", 10);
        return next;
      });

      setCopySpread((prev) => {
        const idx = prev.findIndex((r) => r.bp === bpTitle);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], copies: [...updated[idx].copies, { plant: userPlant, date: today }] };
          return updated;
        }
        return [...prev, { bp: bpTitle, originator: originatorPlant, copies: [{ plant: userPlant, date: today }] }];
      });
    }

    setPendingCopyMeta(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-muted">
      {/* Header */}
      <div className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Amber Enterprises India Limited
                </h1>
                <p className="text-sm text-muted-foreground">Best Practices Portal</p>
              </div>
            </div>
            {userRole && (
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>{userRole === "plant" ? "Plant User" : "HQ Admin"}</span>
                </Badge>
                <Button variant="outline" onClick={handleLogout}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentView === "login" && (
          <div className="max-w-md mx-auto">
            <Card className="shadow-elevated">
              <CardHeader className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Portal Access
                </h2>
                <p className="text-muted-foreground">
                  Select your wireframe view to explore the portal interface
                </p>
              </CardHeader>
              <CardContent>
                <LoginForm onLogin={handleLogin} />
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "dashboard" && userRole && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            
            {userRole === "plant" ? (
              <PlantUserDashboard 
                onViewChange={handleViewChange} 
                onCopyAndImplement={handleCopyAndImplement}
                monthlyCount={plantMonthlyCount}
                ytdCount={plantYtdCount}
                recentSubmissions={recentSubmissions}
                leaderboard={leaderboard}
                copySpread={copySpread}
              />
            ) : (
              <HQAdminDashboard 
                onViewChange={handleViewChange} 
                thisMonthTotal={hqThisMonthTotal}
                ytdTotal={hqYtdTotal}
                leaderboard={leaderboard}
                copySpread={copySpread}
              />
            )}
          </div>
        )}

        {currentView === "add-practice" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <BestPracticeForm 
              onCancel={() => {
                setFormPreFillData(null);
                setCurrentView("dashboard");
              }}
              preFillData={formPreFillData}
              onSubmit={onFormSubmit}
            />
          </div>
        )}

        {currentView === "practice-list" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <PracticeList 
              userRole={userRole!}
              isBenchmarked={isBenchmarked}
              onToggleBenchmark={(practice) => toggleBenchmark(practice.id)}
              onViewPractice={(practice) => {
                setSelectedPractice(practice);
                setCurrentView("practice-detail");
              }}
              onBack={() => setCurrentView("dashboard")}
            />
          </div>
        )}

        {currentView === "practice-detail" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <BestPracticeDetail 
              userRole={userRole!}
              practice={selectedPractice}
              isBenchmarked={isBenchmarked(selectedPractice?.id)}
              onToggleBenchmark={() => toggleBenchmark(selectedPractice?.id)}
              onBack={() => setCurrentView("practice-list")} 
            />
          </div>
        )}

        {currentView === "approvals" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <ApprovalsList
              userRole={userRole!}
              isBenchmarked={isBenchmarked}
              onToggleBenchmark={(practice) => toggleBenchmark(practice.id)}
              onViewPractice={(practice) => {
                setSelectedPractice(practice);
                setCurrentView("practice-detail");
              }}
              onBack={() => setCurrentView("dashboard")}
            />
          </div>
        )}

        {currentView === "analytics" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <Analytics
              userRole={userRole!}
              onBack={() => setCurrentView("dashboard")}
            />
          </div>
        )}

        {currentView === "profile" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <BenchmarkedList
              items={Object.values(benchmarkedById)}
              onViewPractice={(practice) => { setSelectedPractice(practice); setCurrentView("practice-detail"); }}
              onUnbenchmark={(practice) => toggleBenchmark(practice)}
              onBack={() => setCurrentView("dashboard")}
              onCopyAndImplement={handleCopyAndImplement}
            />
          </div>
        )}
      </div>

      {/* Wireframe Demo Tabs */}
      <div className="fixed bottom-4 right-4">
        <Card className="bg-card/90 backdrop-blur">
          <CardContent className="p-4">
            <Tabs defaultValue="overview" className="w-80">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Views</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-2 mt-4">
                <p className="text-xs text-muted-foreground font-medium">Navigate Views:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView("login")}
                    className="text-xs"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView("dashboard")}
                    disabled={!userRole}
                    className="text-xs"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView("add-practice")}
                    disabled={!userRole}
                    className="text-xs"
                  >
                    Add Practice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView("practice-list")}
                    disabled={!userRole}
                    className="text-xs"
                  >
                    View Practices
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-2 mt-4">
                <p className="text-xs text-muted-foreground font-medium">Key Features:</p>
                <div className="space-y-1 text-xs">
                  <div>✓ Role-based access control</div>
                  <div>✓ Plant-isolated data views</div>
                  <div>✓ Approval workflow system</div>
                  <div>✓ Q&A communication</div>
                  <div>✓ Category management</div>
                </div>
              </TabsContent>
              
              <TabsContent value="roles" className="space-y-2 mt-4">
                <p className="text-xs text-muted-foreground font-medium">User Roles:</p>
                <div className="space-y-2">
                  <Button
                    variant={userRole === "plant" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLogin("plant")}
                    className="w-full text-xs"
                  >
                    Plant User View
                  </Button>
                  <Button
                    variant={userRole === "hq" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLogin("hq")}
                    className="w-full text-xs"
                  >
                    HQ Admin View
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;