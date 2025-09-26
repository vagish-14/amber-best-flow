import { useState } from "react";
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
import PracticeList from "@/components/PracticeList";
import Navigation from "@/components/Navigation";
import { Building2, Shield, LogIn } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState("login");
  const [userRole, setUserRole] = useState<"plant" | "hq" | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<any>(null);

  const handleLogin = (role: "plant" | "hq") => {
    setUserRole(role);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView("login");
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
              onViewChange={setCurrentView}
            />
            
            {userRole === "plant" ? (
              <PlantUserDashboard onViewChange={setCurrentView} />
            ) : (
              <HQAdminDashboard onViewChange={setCurrentView} />
            )}
          </div>
        )}

        {currentView === "add-practice" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            <BestPracticeForm onCancel={() => setCurrentView("dashboard")} />
          </div>
        )}

        {currentView === "practice-list" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            <PracticeList 
              userRole={userRole!}
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
              onViewChange={setCurrentView}
            />
            <BestPracticeDetail 
              userRole={userRole!}
              practice={selectedPractice}
              onBack={() => setCurrentView("practice-list")} 
            />
          </div>
        )}

        {currentView === "approvals" && (
          <div className="space-y-6">
            <Navigation 
              userRole={userRole!} 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            <ApprovalsList
              userRole={userRole!}
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
              onViewChange={setCurrentView}
            />
            <Analytics
              userRole={userRole!}
              onBack={() => setCurrentView("dashboard")}
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