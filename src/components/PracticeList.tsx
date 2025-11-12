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
  User,
  IndianRupee,
  MapPin
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
  savings?: string;
  areaImplemented?: string;
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
      questions: 0,
      savings: "₹3.2L annually",
      areaImplemented: "Press Shop to Paint Shop to FG Area"
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
      questions: 0,
      savings: "₹2L annually",
      areaImplemented: "Assembly Line"
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
      questions: 0,
      savings: "₹1.8L annually",
      areaImplemented: "Molding to WIP Area"
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
      questions: 0,
      savings: "₹2.2L annually",
      areaImplemented: "Injection Molding Area"
    },
    {
      id: "BP-005",
      title: "Automated Quality Inspection System",
      category: "Quality",
      submittedBy: "Rajesh Kumar",
      plant: "Kanchipuram",
      submittedDate: "2025-02-10",
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
      questions: 2,
      savings: "₹2.5L annually",
      areaImplemented: "Quality Control Lab"
    },
    {
      id: "BP-006",
      title: "Energy Efficient Cooling Process",
      category: "Cost",
      submittedBy: "Amit Singh",
      plant: "Rajpura",
      submittedDate: "2025-02-12",
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
      questions: 0,
      savings: "₹1.2L annually",
      areaImplemented: "Production Floor"
    },
    {
      id: "BP-007",
      title: "Safety Protocol for Chemical Handling",
      category: "Safety",
      submittedBy: "Sneha Patel",
      plant: "Supa",
      submittedDate: "2025-03-10",
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
      questions: 1,
      savings: "₹0.5L annually",
      areaImplemented: "Chemical Storage Area"
    },
    {
      id: "BP-008",
      title: "Production Line Optimization",
      category: "Productivity",
      submittedBy: "Vikram Sharma",
      plant: "Ranjangaon",
      submittedDate: "2025-04-08",
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
      questions: 3,
      savings: "₹3.5L annually",
      areaImplemented: "Main Production Line"
    },
    {
      id: "BP-009",
      title: "IoT Sensor Implementation for Predictive Maintenance",
      category: "Productivity",
      submittedBy: "Deepak Kumar",
      plant: "Shahjahanpur",
      submittedDate: "2025-05-20",
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
      questions: 0,
      savings: "₹3L annually",
      areaImplemented: "Critical Equipment Zone"
    },
    {
      id: "BP-011",
      title: "ELG Compliance Monitoring Program",
      category: "ELG",
      submittedBy: "Ankit Verma",
      plant: "Kanchipuram",
      submittedDate: "2025-02-09",
      description: "Program for Environmental and Legal Governance (ELG) tracking, ensuring continuous compliance with local regulations.",
      problemStatement: "Manual compliance tracking led to missed deadlines and reactive responses to regulatory updates.",
      solution: "Set up an ELG management framework with digital tracking for audit schedules, hazardous waste disposal, and documentation approvals, plus automated reminders.",
      benefits: [
        "Zero missed compliance deadlines",
        "Improved stakeholder transparency",
        "Faster incident reporting"
      ],
      metrics: "Compliance adherence: 100%, Audit preparation time reduced by 30%, Incident response time improved by 25%",
      implementation: "Cross-functional initiative with EHS, legal, and operations teams implemented in 6 weeks.",
      questions: 0,
      savings: "₹0.8L annually",
      areaImplemented: "Plant-wide"
    },
    {
      id: "BP-012",
      title: "Assembly Line Cobots",
      category: "Automation",
      submittedBy: "Ritu Sharma",
      plant: "Rajpura",
      submittedDate: "2025-04-06",
      description: "Collaborative robots (cobots) deployed on the assembly line for repetitive fastening and inspection tasks.",
      problemStatement: "Manual fastening operations were repetitive, leading to ergonomic issues and inconsistent quality.",
      solution: "Introduced collaborative robots with vision-guided tools, allowing operators to focus on quality checks while cobots handled repetitive steps.",
      benefits: [
        "Consistent fastening torque",
        "25% reduction in cycle time",
        "Improved operator ergonomics"
      ],
      metrics: "Cycle time reduction: 25%, Rework reduction: 15%, Operator fatigue incidents: 0",
      implementation: "Implementation in 8 weeks with automation team, including programming and operator training.",
      questions: 2,
      savings: "₹2.8L annually",
      areaImplemented: "Assembly Line 2"
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

  const uniqueSavings = useMemo(
    () => Array.from(new Set(allPractices.map((practice) => practice.savings).filter(Boolean))).sort(),
    [allPractices]
  );

  const uniqueAreas = useMemo(
    () => Array.from(new Set(allPractices.map((practice) => practice.areaImplemented).filter(Boolean))).sort(),
    [allPractices]
  );

  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [plantFilter, setPlantFilter] = useState<string>("all");
  const [savingsFilter, setSavingsFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
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

      const matchesSavings =
        savingsFilter === "all" || practice.savings === savingsFilter;

      const matchesArea =
        areaFilter === "all" || practice.areaImplemented === areaFilter;

      const submittedTime = new Date(practice.submittedDate).getTime();
      const matchesStart =
        !startDate || submittedTime >= new Date(startDate).getTime();
      const matchesEnd =
        !endDate || submittedTime <= new Date(endDate).getTime();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPlant &&
        matchesSavings &&
        matchesArea &&
        matchesStart &&
        matchesEnd
      );
    });
  }, [practices, searchTerm, categoryFilter, plantFilter, savingsFilter, areaFilter, startDate, endDate]);

  const resetFilters = () => {
    setCategoryFilter("all");
    setPlantFilter("all");
    setSavingsFilter("all");
    setAreaFilter("all");
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
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-sm font-medium text-muted-foreground">Savings</p>
                <Select value={savingsFilter} onValueChange={setSavingsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All savings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All savings</SelectItem>
                    {uniqueSavings.map((savings) => (
                      <SelectItem key={savings} value={savings}>
                        {savings}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Area Implemented</p>
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All areas</SelectItem>
                    {uniqueAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
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

              <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-2">
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
                      
                      <div className="flex items-center space-x-4 mt-3 flex-wrap gap-2">
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
                        
                        {practice.savings && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <IndianRupee className="h-3 w-3" />
                            <span>{practice.savings}</span>
                          </div>
                        )}
                        
                        {practice.areaImplemented && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{practice.areaImplemented}</span>
                          </div>
                        )}
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
