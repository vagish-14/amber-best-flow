import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Plus, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  Users,
  BarChart3
} from "lucide-react";
import { User as UserIcon } from "lucide-react";

interface NavigationProps {
  userRole: "plant" | "hq";
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ userRole, currentView, onViewChange }: NavigationProps) => {
  return (
    <div className="bg-card border rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button
            variant={currentView === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("dashboard")}
            className="text-sm"
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>

          {userRole === "plant" && (
            <Button
              variant={currentView === "add-practice" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("add-practice")}
              className="text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Best Practice
            </Button>
          )}

          <Button
            variant={currentView === "practice-list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("practice-list")}
            className="text-sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            View Practices
          </Button>

          {userRole === "plant" && (
            <Button
              variant={currentView === "profile" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("profile")}
              className="text-sm"
            >
              <UserIcon className="h-4 w-4 mr-2" />
              Benchmark
            </Button>
          )}

          {userRole === "hq" && (
            <Button
              variant={currentView === "approvals" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("approvals")}
              className="text-sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Benchmark BP's
            </Button>
          )}

          {userRole === "hq" && (
            <Button
              variant={currentView === "analytics" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("analytics")}
              className="text-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Removed Approved/Pending/Rejected badges for plant users */}

          {userRole === "hq" && (
            <div className="flex items-center space-x-2 text-sm">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                <Users className="h-3 w-3 mr-1" />
                4 Plants Active
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;