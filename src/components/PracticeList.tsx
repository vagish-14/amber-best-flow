import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Calendar,
  Building2,
  User
} from "lucide-react";

interface Practice {
  id: string;
  title: string;
  category: string;
  status: "approved" | "pending" | "revision";
  submittedBy: string;
  plant: string;
  submittedDate: string;
  approvedDate?: string;
  approvedBy?: string;
  description: string;
  problemStatement: string;
  solution: string;
  benefits: string[];
  metrics: string;
  implementation: string;
  questions: number;
}

interface PracticeListProps {
  userRole: "plant" | "hq";
  onViewPractice: (practice: Practice) => void;
  onBack: () => void;
  isBenchmarked?: (id?: string) => boolean;
  onToggleBenchmark?: (practice: Practice) => void;
}

const PracticeList = ({ userRole, onViewPractice, onBack, isBenchmarked, onToggleBenchmark }: PracticeListProps) => {
  // Mock data for practices
  const allPractices: Practice[] = [
    {
      id: "BP-001",
      title: "Automated Quality Inspection System Implementation",
      category: "Quality",
      status: "approved",
      submittedBy: "Rajesh Kumar",
      plant: "Plant 2 - Chennai",
      submittedDate: "2024-01-15",
      approvedDate: "2024-01-18",
      approvedBy: "Priya Sharma (HQ Admin)",
      description: "Implementation of an automated quality inspection system using computer vision to detect defects in manufactured components, reducing manual inspection time and improving accuracy.",
      problemStatement: "Manual quality inspection was time-consuming, prone to human error, and created bottlenecks in the production line. Inspectors were spending 3-4 hours daily on repetitive visual checks.",
      solution: "Deployed AI-powered computer vision system with high-resolution cameras at key inspection points. The system uses machine learning algorithms trained on defect patterns to automatically identify and classify defects.",
      benefits: [
        "95% reduction in inspection time",
        "99.2% accuracy in defect detection",
        "Eliminated production bottlenecks",
        "Freed up 3 inspectors for other quality activities"
      ],
      metrics: "Cost savings: ₹2.5L annually, Time saved: 20 hours/week, Defect detection improved by 15%",
      implementation: "Project completed in 6 weeks with IT team collaboration. Total investment: ₹8L with 4-month ROI.",
      questions: 2
    },
    {
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
    {
      id: "BP-003",
      title: "Safety Protocol for Chemical Handling",
      category: "Safety",
      status: "approved",
      submittedBy: "Sneha Patel",
      plant: "Plant 3 - Pune",
      submittedDate: "2024-01-10",
      approvedDate: "2024-01-12",
      approvedBy: "Priya Sharma (HQ Admin)",
      description: "Comprehensive safety protocols for handling hazardous chemicals with automated monitoring and emergency response procedures.",
      problemStatement: "Chemical handling incidents were increasing due to lack of standardized procedures and inadequate safety monitoring systems.",
      solution: "Developed comprehensive safety protocols with automated monitoring systems, emergency response procedures, and mandatory training programs for all chemical handlers.",
      benefits: [
        "Zero chemical incidents in 6 months",
        "100% compliance with safety standards",
        "Reduced insurance premiums",
        "Improved worker confidence"
      ],
      metrics: "Incident rate: 0%, Compliance: 100%, Training completion: 100%, Insurance savings: ₹50K annually",
      implementation: "Rolled out over 3 months with safety team. Investment: ₹2L including training and equipment.",
      questions: 1
    },
    {
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
    {
      id: "BP-005",
      title: "IoT Sensor Implementation for Predictive Maintenance",
      category: "Productivity",
      status: "pending",
      submittedBy: "Deepak Kumar",
      plant: "Plant 3 - Pune",
      submittedDate: "2024-01-20",
      description: "Deployment of IoT sensors for real-time equipment monitoring and predictive maintenance scheduling.",
      problemStatement: "Unexpected equipment failures were causing production downtime and increasing maintenance costs. Traditional reactive maintenance was inefficient.",
      solution: "Installed IoT sensors on critical equipment to monitor vibration, temperature, and performance metrics. Implemented predictive analytics to schedule maintenance before failures occur.",
      benefits: [
        "40% reduction in unplanned downtime",
        "Predictive maintenance scheduling",
        "Extended equipment lifespan",
        "Reduced maintenance costs"
      ],
      metrics: "Downtime reduction: 40%, Maintenance cost savings: ₹3L annually, Equipment lifespan extended by 20%",
      implementation: "Phase 1 completed in 6 weeks. Investment: ₹4L with 10-month ROI. Full rollout planned over 6 months.",
      questions: 0
    },
    {
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
  ];

  // Filter practices based on user role
  const practices = userRole === "plant" 
    ? allPractices.filter(practice => practice.plant === "Plant 1 - Gurgaon")
    : allPractices;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case "pending":
        return <Clock className="h-3 w-3 mr-1" />;
      case "revision":
        return <XCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success/10 text-success border-success";
      case "pending":
        return "bg-warning/10 text-warning border-warning";
      case "revision":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "quality":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cost":
        return "bg-green-50 text-green-700 border-green-200";
      case "safety":
        return "bg-red-50 text-red-700 border-red-200";
      case "productivity":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Best Practices Library</h1>
          <p className="text-muted-foreground mt-1">
            {userRole === "plant" 
              ? "Browse practices from Plant 1 - Gurgaon" 
              : "Browse and explore approved best practices from across all plants"
            }
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <FileText className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search practices by title, category, or plant..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{practices.length}</div>
            <p className="text-sm text-muted-foreground">Total Practices</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {practices.filter(p => p.status === "approved").length}
            </div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {practices.filter(p => p.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {practices.reduce((sum, p) => sum + p.questions, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Q&A</p>
          </CardContent>
        </Card>
      </div>

      {/* Practices List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>All Practices</span>
            <Badge variant="outline">{practices.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {practices.map((practice) => (
              <div
                key={practice.id}
                className="flex items-center justify-between p-6 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors group"
                onClick={() => onViewPractice(practice)}
              >
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {practice.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 line-clamp-2">
                        {practice.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getCategoryColor(practice.category)}>
                            {practice.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{practice.submittedBy}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          <span>{practice.plant}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{practice.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {practice.questions > 0 && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {practice.questions} Q&A
                    </Badge>
                  )}
                  {isBenchmarked?.(practice.id) && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Benchmarked</Badge>
                  )}
                  
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(practice.status)}
                  >
                    {getStatusIcon(practice.status)}
                    {practice.status.charAt(0).toUpperCase() + practice.status.slice(1)}
                  </Badge>
                  
                  <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); onViewPractice(practice); }}>
                    View Details
                  </Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); onToggleBenchmark?.(practice); }}>
                    {isBenchmarked?.(practice.id) ? "Unbenchmark" : "Benchmark"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeList;
