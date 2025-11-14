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
      <div className="space-y-5">
        <div className="space-y-2.5">
          <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Email / Employee ID</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="employee@ambergroup.com"
            className="w-full h-11 transition-smooth focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span>Password</span>
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full h-11 transition-smooth focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="plant" className="flex items-center space-x-2 text-sm font-medium">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>Plant / Department</span>
          </Label>
          <Select>
            <SelectTrigger className="h-11 transition-smooth focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hq">HQ - Corporate (Admin)</SelectItem>
              <SelectItem value="plant-gn">Greater Noida (Ecotech 1)</SelectItem>
              <SelectItem value="plant-ka">Kanchipuram</SelectItem>
              <SelectItem value="plant-rj">Rajpura</SelectItem>
              <SelectItem value="plant-sj">Shahjahanpur</SelectItem>
              <SelectItem value="plant-supa">Supa</SelectItem>
              <SelectItem value="plant-ran">Ranjangaon</SelectItem>
              <SelectItem value="plant-pon">Ponneri</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground text-center font-medium">
          Wireframe Demo - Choose User Type:
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover-lift border-2 border-transparent hover:border-primary/20 transition-smooth group" onClick={() => onLogin("plant")}>
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold text-sm mb-1">Plant User</p>
              <p className="text-xs text-muted-foreground">Submit & view own practices</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover-lift border-2 border-transparent hover:border-primary/20 transition-smooth group" onClick={() => onLogin("hq")}>
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <User className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold text-sm mb-1">HQ Admin</p>
              <p className="text-xs text-muted-foreground">Review & approve all practices</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button className="w-full h-11 bg-gradient-primary hover:bg-gradient-primary/90 text-base font-medium shadow-medium hover:shadow-strong transition-smooth">
        Sign In to Portal
      </Button>

      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Forgot password? Contact IT Support</p>
        <p>This is a wireframe demonstration</p>
      </div>
    </div>
  );
};

export default LoginForm;