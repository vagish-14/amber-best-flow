import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building, User, Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: (role: "plant" | "hq") => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Email / Employee ID</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="employee@ambergroup.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Password</span>
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plant" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Plant / Department</span>
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hq">HQ - Delhi (Admin)</SelectItem>
              <SelectItem value="plant1">Plant 1 - Gurgaon</SelectItem>
              <SelectItem value="plant2">Plant 2 - Chennai</SelectItem>
              <SelectItem value="plant3">Plant 3 - Pune</SelectItem>
              <SelectItem value="plant4">Plant 4 - Kolkata</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Wireframe Demo - Choose User Type:
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-card transition-shadow" onClick={() => onLogin("plant")}>
            <CardContent className="p-4 text-center">
              <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-sm">Plant User</p>
              <p className="text-xs text-muted-foreground">Submit & view own practices</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-card transition-shadow" onClick={() => onLogin("hq")}>
            <CardContent className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-sm">HQ Admin</p>
              <p className="text-xs text-muted-foreground">Review & approve all practices</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
        Sign In to Portal
      </Button>

      <div className="text-center text-xs text-muted-foreground">
        <p>Forgot password? Contact IT Support</p>
        <p className="mt-1">This is a wireframe demonstration</p>
      </div>
    </div>
  );
};

export default LoginForm;