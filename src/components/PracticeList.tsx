import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { 
  Search,
  Filter,
  FileText,
  Calendar,
  Building2,
  User
} from "lucide-react";

interface Practice {
  id: string;
  title: string;
  category: string;
  submittedBy: string;
  plant: string;
  submittedDate: string;
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
      title: "Smart Cart Movement & Management through AMR",
      category: "Automation",
      submittedBy: "Team Production",
      plant: "Greater Noida (Ecotech 1)",
      submittedDate: "2025-01-15",
      description: "Implementation of automated cart movement and management on the shop floor through AMR (Autonomous Mobile Robots), covering the Press Shop to Paint Shop to FG Area.",
      problemStatement: "Manual cart movement required multiple manpower for BOP transfer and resulted in inefficiency and human fatigue. Monitoring AMR efficiency was also manual.",
      solution: "Automated the cart movement and BOP feeding process using AMR, eliminating manual intervention. Added digitalization for real-time AMR efficiency monitoring.",
      benefits: [
        "Improved internal logistics efficiency",
        "Reduced manpower requirement",
        "Enhanced safety and productivity",
        "Real-time digital tracking of AMR operations"
      ],
      metrics: "Manpower saved: 5 operators; Cost saving: ₹3.2L annually; Process efficiency improved by ~20%",
      implementation: "Completed in 8 weeks with production and automation teams. Investment: ₹10L. ROI achieved in 6 months.",
      questions: 0
    },
    {
      id: "BP-002",
      title: "Empty Cart Feeding System (Manual → Auto)",
      category: "Productivity",
      submittedBy: "Team Production",
      plant: "Greater Noida (Ecotech 1)",
      submittedDate: "2025-01-15",
      description: "Development of an automated empty cart feeding system with pneumatic locking to prevent assembly line stoppages caused by unavailability of empty carts.",
      problemStatement: "Assembly line stoppages occurred intermittently due to unavailability of empty carts at the assembly point, causing manpower idle time and production loss.",
      solution: "Implemented an auto empty cart feeding system with pneumatic cylinders for automatic locking/unlocking and added part-wise tracks to streamline empty cart return flow.",
      benefits: [
        "Eliminated line stoppages due to cart unavailability",
        "Reduced idle time significantly",
        "Improved line productivity and manpower utilization"
      ],
      metrics: "Idle time reduced to zero; Line efficiency improved by 18%; Cost saving: ₹2L annually",
      implementation: "Implemented in 6 weeks by maintenance and assembly team. Investment: ₹7L. ROI within 5 months.",
      questions: 0
    },
    {
      id: "BP-003",
      title: "Smart Inbound Logistics through AGV",
      category: "Automation",
      submittedBy: "Team Production",
      plant: "Greater Noida (Ecotech 1)",
      submittedDate: "2025-01-15",
      description: "Smart inbound logistics improvement using AGV (Automated Guided Vehicles) for bin movement from Molding to the WIP area.",
      problemStatement: "Manual bin movement consumed time and manpower, causing congestion and handling delays between Molding and WIP.",
      solution: "Introduced AGVs for autonomous bin movement and optimized shop-floor layout for AGV routes, removing the need for manual handling.",
      benefits: [
        "Improved internal logistics flow",
        "Reduced manpower usage",
        "Enhanced safety and reliability"
      ],
      metrics: "Manpower saved: 2 operators; Handling time reduced by 25%; Annual savings: ₹1.8L",
      implementation: "Completed in 5 weeks with automation support. Investment: ₹6L. ROI achieved within 6 months.",
      questions: 0
    },
    {
      id: "BP-004",
      title: "Injection Machines Robotic Operation",
      category: "Automation",
      submittedBy: "Team Injection Molding",
      plant: "Greater Noida (Ecotech 1)",
      submittedDate: "2025-01-15",
      description: "Automation of molded part ejection using robotics to reduce cycle time, eliminate manual handling, and enhance safety.",
      problemStatement: "Manual ejection of molded parts required skilled manpower, led to inconsistent cycle times, and created potential safety risks.",
      solution: "Installed robotics for fully automated molded part ejection, reducing human touch points and delivering consistent cycle time and output.",
      benefits: [
        "100% reduction in manual ejection",
        "Consistent quality and cycle time",
        "Reduced manpower and improved safety",
        "Increased productivity by 20%"
      ],
      metrics: "Manpower saved: 2 skilled operators; Cycle time reduced by 15%; Annual savings: ₹2.2L",
      implementation: "Completed in 4 weeks with robotics vendor collaboration. Investment: ₹9L. ROI within 8 months.",
      questions: 0
    }
  ];

  // Filter practices based on user role
  const practices = userRole === "plant" 
  ? allPractices.filter(practice => practice.plant === "Greater Noida (Ecotech 1)")
    : allPractices;

  const uniqueCategories = useMemo(
    () => Array.from(new Set(allPractices.map((practice) => practice.category))).sort(),
    [allPractices]
  );

  const uniquePlants = useMemo(
    () => Array.from(new Set(allPractices.map((practice) => practice.plant))).sort(),
    [allPractices]
  );

  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [plantFilter, setPlantFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredPractices = useMemo(() => {
    return practices.filter((practice) => {
      const matchesSearch =
        searchTerm.trim().length === 0 ||
        practice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practice.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practice.plant.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || practice.category === categoryFilter;

      const matchesPlant =
        plantFilter === "all" || practice.plant === plantFilter;

      const submittedTime = new Date(practice.submittedDate).getTime();
      const matchesStart =
        !startDate || submittedTime >= new Date(startDate).getTime();
      const matchesEnd =
        !endDate || submittedTime <= new Date(endDate).getTime();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPlant &&
        matchesStart &&
        matchesEnd
      );
    });
  }, [practices, searchTerm, categoryFilter, plantFilter, startDate, endDate]);

  const resetFilters = () => {
    setCategoryFilter("all");
    setPlantFilter("all");
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  // Removed status concept (approved/revision/pending)

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
      case "automation":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "digitalisation":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "elg":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
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
              ? "Browse practices from Greater Noida (Ecotech 1)" 
              : "Browse and explore best practices from across all plants"
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
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <Button
              variant={showFilters ? "secondary" : "outline"}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Filters"}
            </Button>
          </div>
          {showFilters && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Plant</p>
                <Select value={plantFilter} onValueChange={setPlantFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All plants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All plants</SelectItem>
                    {uniquePlants.map((plant) => (
                      <SelectItem key={plant} value={plant}>
                        {plant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">From date</p>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">To date</p>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">Total Practices</p>
              <div className="text-2xl font-bold text-primary">{practices.length}</div>
            </div>
          </CardContent>
        </Card>
        {/* Removed Approved/Pending cards */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">Total Q&A</p>
              <div className="text-2xl font-bold text-primary">
                {practices.reduce((sum, p) => sum + p.questions, 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Practices List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>All Practices</span>
            <Badge variant="outline">{filteredPractices.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPractices.map((practice) => (
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
                  
                  {/* Status badge removed */}
                  
                  <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); onViewPractice(practice); }}>
                    View Details
                  </Button>
                  {userRole === "hq" && (
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); onToggleBenchmark?.(practice); }}>
                      {isBenchmarked?.(practice.id) ? "Unbenchmark" : "Benchmark"}
                    </Button>
                  )}
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
