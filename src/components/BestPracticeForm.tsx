import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  FileText, 
  Camera,
  Shield,
  Target,
  Zap,
  IndianRupee,
  Settings,
  Save,
  Send,
  Copy,
  Cpu,
  LineChart
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface BestPracticeFormProps {
  onCancel: () => void;
  onSubmit?: (payload: {
    title: string;
    category: string;
    problemStatement: string;
    solution: string;
    benefits: string;
    metrics: string;
    implementation: string;
    investment: string;
    beforeImageName: string | null;
    afterImageName: string | null;
    mode: "copy-implement" | "new-submission";
  }) => void;
  preFillData?: {
    title?: string;
    category?: string;
    problemStatement?: string;
    solution?: string;
  } | null;
}

const BestPracticeForm = ({ onCancel, preFillData, onSubmit }: BestPracticeFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [solution, setSolution] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  const [metricsText, setMetricsText] = useState("");
  const [implementationText, setImplementationText] = useState("");
  const [investmentText, setInvestmentText] = useState("");
  const [implementationArea, setImplementationArea] = useState("");

  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const beforeInputRef = useRef<HTMLInputElement | null>(null);
  const afterInputRef = useRef<HTMLInputElement | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);
  const docsInputRef = useRef<HTMLInputElement | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (preFillData) {
      setTitle(preFillData.title || "");
      setCategory(preFillData.category?.toLowerCase() || "");
      setProblemStatement(preFillData.problemStatement || "");
      setSolution(preFillData.solution || "");
      setInvestmentText("");
      setImplementationArea("");
    } else {
      // Clear all fields when preFillData is null (normal add-practice flow)
      setTitle("");
      setCategory("");
      setProblemStatement("");
      setSolution("");
      setInvestmentText("");
      setImplementationArea("");
    }
  }, [preFillData]);
  
  const validate = () => {
    if (!title.trim()) return "Please enter Practice Title.";
    if (!category.trim()) return "Please select a Category.";
    if (!problemStatement.trim()) return "Please enter Problem Statement.";
    if (!solution.trim()) return "Please enter Solution Description.";
    return "";
  };

  const handleSaveDraft = () => {
    const error = validate();
    if (error) {
      toast({ title: "Validation required", description: error });
      return;
    }
    toast({ title: "Draft saved", description: "Your best practice draft has been saved." });
  };

  const handleSubmit = () => {
    const error = validate();
    if (error) {
      toast({ title: "Validation required", description: error });
      return;
    }
    const mode: "copy-implement" | "new-submission" = preFillData ? "copy-implement" : "new-submission";
    const payload = {
      title,
      category,
      problemStatement,
      solution,
      benefits: benefitsText,
      metrics: metricsText,
      implementation: implementationText,
      investment: investmentText,
      implementationArea,
      beforeImageName: beforeImage?.name ?? null,
      afterImageName: afterImage?.name ?? null,
      mode,
    };
    console.log("Submitting Best Practice:", payload);
    onSubmit?.(payload);
    toast({ title: preFillData ? "Copy & Implement submitted" : "Practice submitted", description: "Submission successful." });
    onCancel();
  };

  const handleBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBeforeImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setBeforePreview(url);
    } else {
      setBeforePreview(null);
    }
  };

  const handleAfterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAfterImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setAfterPreview(url);
    } else {
      setAfterPreview(null);
    }
  };

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSupportingDocs(files);
  };
  const categories = [
    { value: "safety", label: "Safety", icon: Shield, color: "category-safety" },
    { value: "quality", label: "Quality", icon: Target, color: "category-quality" },
    { value: "productivity", label: "Productivity", icon: Zap, color: "category-productivity" },
    { value: "cost", label: "Cost", icon: IndianRupee, color: "category-cost" },
    { value: "digitalisation", label: "Digitalisation", icon: Cpu, color: "category-digitalisation" },
    { value: "elg", label: "ELG", icon: LineChart, color: "category-elg" },
    { value: "automation", label: "Automation", icon: Settings, color: "category-automation" },
    { value: "other", label: "Other", icon: Settings, color: "category-other" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-elevated">
        <CardHeader className="bg-gradient-hero text-primary-foreground">
          <CardTitle className="flex items-center space-x-2">
            {preFillData ? <Copy className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
            <span>{preFillData ? "Copy & Implement Best Practice" : "Submit New Best Practice"}</span>
          </CardTitle>
          <p className="text-primary-foreground/80">
            {preFillData 
              ? "Complete the remaining fields to implement this best practice at your plant"
              : "Share your innovation with the Amber Group - Plant 2 Chennai"
            }
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Copy & Implement Notice */}
          {preFillData && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Copy className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">Copying Benchmark Best Practice</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• The following fields have been pre-filled from the original best practice</p>
                      <p>• Review and modify them as needed for your plant's specific context</p>
                      <p>• Complete the remaining fields (images, benefits, metrics, etc.)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                Practice Theme *
                {preFillData && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">Pre-filled</Badge>}
              </Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your best practice"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                Category *
                {preFillData && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">Pre-filled</Badge>}
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select practice category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <Label htmlFor="problem" className="flex items-center gap-2">
              Problem Statement / Challenge *
              {preFillData && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">Pre-filled</Badge>}
            </Label>
            <Textarea
              id="problem"
              placeholder="Describe the problem or challenge this practice addresses..."
              className="min-h-24"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
            />
          </div>

          {/* Solution Description */}
          <div className="space-y-2">
            <Label htmlFor="solution" className="flex items-center gap-2">
              Solution Description *
              {preFillData && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">Pre-filled</Badge>}
            </Label>
            <Textarea
              id="solution"
              placeholder="Provide detailed description of your solution, including implementation steps..."
              className="min-h-32"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>

          {/* Before/After Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {beforePreview ? (
                      <img src={beforePreview} alt="Before preview" className="h-24 w-24 object-cover rounded" />
                    ) : (
                      <Camera className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">Before Image</h4>
                    <p className="text-sm text-muted-foreground">Upload image showing the situation before implementation</p>
                  </div>
                  <input ref={beforeInputRef} type="file" accept="image/*" className="hidden" onChange={handleBeforeChange} />
                  <Button variant="outline" size="sm" onClick={() => beforeInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {afterPreview ? (
                      <img src={afterPreview} alt="After preview" className="h-24 w-24 object-cover rounded" />
                    ) : (
                      <Camera className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">After Image</h4>
                    <p className="text-sm text-muted-foreground">Upload image showing the improved situation</p>
                  </div>
                  <input ref={afterInputRef} type="file" accept="image/*" className="hidden" onChange={handleAfterChange} />
                  <Button variant="outline" size="sm" onClick={() => afterInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="benefits">Key Benefits Achieved</Label>
              <Textarea
                id="benefits"
                placeholder="List the key benefits and improvements realized..."
                className="min-h-20"
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metrics">Quantifiable Metrics (if applicable)</Label>
              <Textarea
                id="metrics"
                placeholder="Include measurable improvements (e.g., 15% reduction in waste, 2 hours saved per day)..."
                className="min-h-20"
                value={metricsText}
                onChange={(e) => setMetricsText(e.target.value)}
              />
            </div>
          </div>

        {/* Investment */}
        <div className="space-y-2">
          <Label htmlFor="investment">Investment in the Practice</Label>
          <Textarea
            id="investment"
            placeholder="Document the investment made to implement this practice (time, budget, resources, etc.)"
            className="min-h-20"
            value={investmentText}
            onChange={(e) => setInvestmentText(e.target.value)}
          />
        </div>

        {/* Implementation Area */}
        <div className="space-y-2">
          <Label htmlFor="implementationArea">Area Implemented In</Label>
          <Input
            id="implementationArea"
            placeholder="Specify the plant area or department where this practice is implemented"
            className="w-full"
            value={implementationArea}
            onChange={(e) => setImplementationArea(e.target.value)}
          />
        </div>

        {/* Implementation Details */}
          <div className="space-y-2">
            <Label htmlFor="implementation">Implementation Timeline & Resources</Label>
            <Textarea
              id="implementation"
              placeholder="Describe the implementation timeline, resources required, team involved..."
              className="min-h-24"
              value={implementationText}
              onChange={(e) => setImplementationText(e.target.value)}
            />
          </div>

          {/* Additional Documentation */}
          <div className="space-y-2">
            <Label>Supporting Documents (Optional)</Label>
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Upload supporting documents</p>
                    <p className="text-xs text-muted-foreground">Process charts, procedures, training materials (PDF, DOC, PPT)</p>
                  </div>
                <input
                  ref={docsInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleDocsChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                />
                <Button variant="outline" size="sm" onClick={() => docsInputRef.current?.click()}>
                    Browse Files
                  </Button>
                </div>
              {supportingDocs.length > 0 && (
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  Selected: {supportingDocs.map((f) => f.name).join(", ")}
                </div>
              )}
              </CardContent>
            </Card>
          </div>

          {/* Submission Notice */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Submission</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Your submission will be visible on your dashboard</p>
                    <p>• Other team members can ask questions about your practice</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                <Shield className="h-3 w-3 mr-1" />
                Plant 2 - Chennai Submission
              </Badge>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-gradient-primary" onClick={handleSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestPracticeForm;