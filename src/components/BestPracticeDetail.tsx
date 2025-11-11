import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  CheckCircle, 
  Download, 
  MessageCircle,
  Send,
  Calendar,
  Building2,
  User,
  FileText,
  Image as ImageIcon,
  ThumbsUp,
  AlertCircle,
  Clock,
  Shield
} from "lucide-react";

interface BestPracticeDetailProps {
  userRole: "plant" | "hq";
  practice?: any;
  onBack: () => void;
  isBenchmarked?: boolean;
  onToggleBenchmark?: () => void;
}

const BestPracticeDetail = ({ userRole, practice: propPractice, onBack, isBenchmarked, onToggleBenchmark }: BestPracticeDetailProps) => {
  // Use passed practice or fallback to mock data
  const practice = propPractice || {
    id: "BP-001",
    title: "Automated Quality Inspection System Implementation",
    category: "Quality",
    // removed approval status concept
    submittedBy: "Rajesh Kumar",
    plant: "Greater Noida (Ecotech 1)",
    submittedDate: "2025-01-15",
    approvedDate: "2025-01-18",
    approvedBy: "Priya Sharma (HQ Admin)",
    copiedToPlants: [
      "Kanchipuram",
      "Rajpura"
    ],
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
    implementation: "Project completed in 6 weeks with IT team collaboration. Total investment: ₹8L with 4-month ROI."
  };

  const questions = [
    {
      id: 1,
      askedBy: "Amit Singh",
      plant: "HQ",
      question: "What specific AI model did you use for the computer vision system? Can this be implemented in other manufacturing environments?",
      askedDate: "2024-01-20",
      answer: "We used a custom-trained YOLO v8 model with our specific defect dataset. Yes, it can be adapted - the key is training with your specific defect patterns. Happy to share the implementation guide.",
      answeredDate: "2024-01-21"
    },
    {
      id: 2,
      askedBy: "Sneha Patel",
      plant: "HQ",
      question: "What was the biggest challenge during implementation and how did you overcome it?",
      askedDate: "2024-01-22",
      answer: null
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Practices
        </Button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{practice.title}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="outline" className="bg-category-quality/10 text-category-quality border-category-quality">
              {practice.category}
            </Badge>
            {/* Approval badge removed */}
            <span className="text-sm text-muted-foreground">ID: {practice.id}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Helpful (12)
          </Button>
          <Button size="sm" onClick={onToggleBenchmark}>
            {isBenchmarked ? "Unbenchmark" : "Benchmark"}
          </Button>
        </div>
      </div>

      {/* Practice Details */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Practice Details</span>
            </CardTitle>
            
            {/* Approval actions removed */}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Submitted by</p>
                <p className="text-sm text-muted-foreground">{practice.submittedBy}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Plant</p>
                <p className="text-sm text-muted-foreground">{practice.plant}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Submitted</p>
                <p className="text-sm text-muted-foreground">{practice.submittedDate}</p>
              </div>
            </div>
          </div>

          {/* Horizontal Deployment Status */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Horizontal Deployment</h4>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Copied to {(practice as any).copiedToPlants?.length ?? 0} plant{(((practice as any).copiedToPlants?.length ?? 0) === 1 ? "" : "s")}
              </Badge>
            </div>
            {((practice as any).copiedToPlants?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {(practice as any).copiedToPlants.map((pl: string) => (
                  <Badge key={pl} variant="outline" className="bg-muted/50">{pl}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium mb-2">Overview</h4>
            <p className="text-muted-foreground">{practice.description}</p>
          </div>

          {/* Problem Statement */}
          <div>
            <h4 className="font-medium mb-2">Problem Statement</h4>
            <p className="text-muted-foreground">{practice.problemStatement}</p>
          </div>

          {/* Solution */}
          <div>
            <h4 className="font-medium mb-2">Solution</h4>
            <p className="text-muted-foreground">{practice.solution}</p>
          </div>

          {/* Before/After Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <div className="bg-muted/50 rounded-lg p-8 mb-3">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                </div>
                <p className="font-medium">Before Implementation</p>
                <p className="text-sm text-muted-foreground">Manual inspection setup</p>
              </CardContent>
            </Card>
            
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <div className="bg-success/10 rounded-lg p-8 mb-3">
                  <ImageIcon className="h-12 w-12 mx-auto text-success" />
                </div>
                <p className="font-medium">After Implementation</p>
                <p className="text-sm text-muted-foreground">Automated inspection system</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Key Benefits</h4>
              <ul className="space-y-2">
                {practice.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Measurable Impact</h4>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">{practice.metrics}</p>
              </div>
            </div>
          </div>

          {/* Implementation Details */}
          <div>
            <h4 className="font-medium mb-2">Implementation Details</h4>
            <p className="text-muted-foreground">{practice.implementation}</p>
          </div>

          {/* Approved info removed */}
        </CardContent>
      </Card>

      {/* Q&A Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span>Questions & Answers</span>
            <Badge variant="outline">{questions.length}</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Ask Question (for non-authors) */}
          {practice.submittedBy !== "Current User" && (
            <div className="space-y-3">
              <h4 className="font-medium">Ask a Question</h4>
              <Textarea
                placeholder="Ask the author about implementation details, challenges, or applicability to your plant..."
                className="min-h-20"
              />
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Submit Question
              </Button>
            </div>
          )}

          <Separator />

          {/* Questions List */}
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {q.askedBy.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-sm">{q.askedBy}</p>
                      <Badge variant="outline" className="text-xs">{q.plant}</Badge>
                      <span className="text-xs text-muted-foreground">{q.askedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{q.question}</p>
                  </div>
                </div>

                {q.answer ? (
                  <div className="ml-11 p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <p className="font-medium text-sm text-primary">Author Response</p>
                      <span className="text-xs text-muted-foreground">{q.answeredDate}</span>
                    </div>
                    <p className="text-sm">{q.answer}</p>
                  </div>
                ) : practice.submittedBy === "Current User" ? (
                  <div className="ml-11 space-y-2">
                    <Textarea
                      placeholder="Provide your response to help other plants..."
                      className="min-h-16"
                    />
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                ) : (
                  <div className="ml-11 space-y-2">
                    {userRole === "plant" ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Reply to this question:</p>
                        <Textarea
                          placeholder="Provide your response to help other plants..."
                          className="min-h-16"
                        />
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 bg-warning/5 rounded-lg border border-warning/20">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-warning" />
                          <p className="text-sm text-warning">Awaiting author response</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestPracticeDetail;