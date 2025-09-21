"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [storageAmount, setStorageAmount] = useState("100GB");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Platform detection
  const detectPlatform = () => {
    if (typeof window === 'undefined') return 'linux';
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Mac')) return 'mac';
    if (userAgent.includes('Windows')) return 'win';
    if (userAgent.includes('Linux')) return 'linux';
    return 'linux';
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  // Check if passwords match
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPasswordError("");
    
    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (!passwordsMatch) {
      setPasswordError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      // 1) Create org / user (existing signup)
      const signupRes = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name,
          email,
          organization,
          password, 
          confirmPassword,
          storageAmount
        })
      });
      
      if (!signupRes.ok) {
        const errorData = await signupRes.json();
        throw new Error(errorData.error || "Signup failed");
      }

      const { orgId } = await signupRes.json();

      // 2) Request generated installer for this org
      const genRes = await fetch("/api/installer/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orgId, 
          platform: detectPlatform(),
          preferences: {
            storageAmount,
            name
          }
        })
      });
      
      if (!genRes.ok) {
        const errorText = await genRes.text();
        console.error("Installer generation failed:", errorText);
        throw new Error("Could not generate installer. Please try again or contact support.");
      }

      const { downloadUrl, checksum } = await genRes.json();

      // 3) Navigate directly to download page (download will start automatically)
      router.push(`/download?org=${orgId}&checksum=${checksum}&downloadUrl=${encodeURIComponent(downloadUrl)}`);
      
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during signup");
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-8", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance max-w-sm">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="dreadtristan@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="organization" className="text-sm font-medium">Organization Name</Label>
          <Input 
            id="organization" 
            type="text" 
            placeholder="Acme Corporation" 
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required 
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-sm font-medium">Master Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Master Password</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="storageAmount" className="text-sm font-medium">Storage Amount</Label>
          <select
            id="storageAmount"
            value={storageAmount}
            onChange={(e) => setStorageAmount(e.target.value)}
            className="h-11 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="10GB">10GB - Basic</option>
            <option value="50GB">50GB - Standard</option>
            <option value="100GB">100GB - Professional</option>
            <option value="500GB">500GB - Enterprise</option>
            <option value="1TB">1TB - Large Enterprise</option>
            <option value="unlimited">Unlimited - Custom</option>
          </select>
        </div>
        {passwordError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-800 dark:text-red-200">{passwordError}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
        <Button 
          type="submit" 
          className="w-full h-11 text-sm font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full h-11 text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Sign up with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline underline-offset-4 font-medium">
          Sign in
        </a>
      </div>
    </form>
  )
}

