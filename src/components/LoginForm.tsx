import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

interface LoginFormProps {
  onLogin: (role: "plant" | "hq") => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic can be added here
  };

  return (
    <div className="flex flex-col justify-center">
      {/* Logo */}
      <div className="flex justify-center mb-4 animate-fade-in">
        <div className="relative">
          <img 
            src="/images/amberlogo.png" 
            alt="Amber Logo" 
            className="h-14 w-auto object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Welcome Header - Compact */}
      <div className="text-center mb-6 animate-fade-in-delay">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent leading-tight mb-2">
          Welcome to<br />InnoSphere
        </h2>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
          <span>Innovation • Sharing • Benchmarking • Cross-learning</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-delay-2">
        {/* Email Input */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider ml-1">
            Email / Employee ID
          </Label>
          <div className="relative group">
            <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-300 ${
              focusedField === 'email' 
                ? 'bg-gradient-to-br from-blue-500/20 to-sky-500/20 border-blue-400/50' 
                : 'bg-gradient-to-br from-blue-500/10 to-sky-500/10 border-blue-200/30 group-hover:border-blue-300/50'
            }`}>
              <User className={`h-4 w-4 transition-colors duration-300 ${
                focusedField === 'email' ? 'text-blue-600' : 'text-blue-500'
              }`} />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your email or employee ID"
              className="glass-input-light w-full h-11 pl-12 pr-4 rounded-xl text-sm text-gray-800 placeholder:text-gray-400"
              aria-label="Email or Employee ID"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider ml-1">
            Password
          </Label>
          <div className="relative group">
            <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-300 ${
              focusedField === 'password' 
                ? 'bg-gradient-to-br from-blue-500/20 to-sky-500/20 border-blue-400/50' 
                : 'bg-gradient-to-br from-blue-500/10 to-sky-500/10 border-blue-200/30 group-hover:border-blue-300/50'
            }`}>
              <Lock className={`h-4 w-4 transition-colors duration-300 ${
                focusedField === 'password' ? 'text-blue-600' : 'text-blue-500'
              }`} />
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your password"
              className="glass-input-light w-full h-11 pl-12 pr-4 rounded-xl text-sm text-gray-800 placeholder:text-gray-400"
              aria-label="Password"
              required
            />
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2 pt-1">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="border-gray-300 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-blue-600 data-[state=checked]:to-sky-500 data-[state=checked]:border-transparent rounded"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-gray-600 cursor-pointer select-none"
          >
            Keep me signed in
          </Label>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-700 hover:via-blue-600 hover:to-sky-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            onLogin("plant");
          }}
        >
          <span>Sign In to Portal</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
