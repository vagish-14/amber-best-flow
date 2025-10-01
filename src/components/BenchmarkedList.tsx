import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Star } from "lucide-react";

interface BenchmarkedListProps {
  items: any[];
  onViewPractice: (practice: any) => void;
  onUnbenchmark: (practice: any) => void;
  onBack: () => void;
}

const BenchmarkedList = ({ items, onViewPractice, onUnbenchmark, onBack }: BenchmarkedListProps) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Benchmarked Practices</h1>
          <p className="text-muted-foreground mt-1">Practices you've benchmarked for later reference</p>
        </div>
        <Button variant="outline" onClick={onBack}><FileText className="h-4 w-4 mr-2" />Back</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>All Benchmarked</span>
            <Badge variant="outline">{items.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.length === 0 && (
              <div className="text-center text-muted-foreground">No benchmarked practices yet.</div>
            )}
            {items.map((practice) => (
              <div key={practice.id} className="flex items-center justify-between p-6 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors group"
                   onClick={() => onViewPractice(practice)}>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{practice.title}</h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2">{practice.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Badge variant="outline">{practice.category}</Badge>
                    <span className="text-sm text-muted-foreground">{practice.plant}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onViewPractice(practice); }}>View</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); onUnbenchmark(practice); }}>Unbenchmark</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BenchmarkedList;


