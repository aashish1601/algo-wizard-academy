
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthDialog: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(signupForm.email, signupForm.password, signupForm.username);
      toast({
        title: "Success",
        description: "Account created successfully. Please check your email for verification.",
      });
      setMode("login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-center mb-2 text-wizard-accent">
            {mode === "login"
              ? "Login to your AWS-powered learning dashboard."
              : "Sign up to save your challenges, scores, and more!"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={mode === "login" ? "default" : "outline"}
            className="w-1/2"
            onClick={() => setMode("login")}
          >
            <LogIn className="w-4 h-4 mr-1" /> Login
          </Button>
          <Button
            variant={mode === "signup" ? "default" : "outline"}
            className="w-1/2"
            onClick={() => setMode("signup")}
          >
            <UserPlus className="w-4 h-4 mr-1" /> Signup
          </Button>
        </div>
        {mode === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
              <label htmlFor="login-email" className="text-sm block mb-1">
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                required
                placeholder="example@email.com"
                value={loginForm.email}
                onChange={e =>
                  setLoginForm(f => ({ ...f, email: e.target.value }))
                }
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="text-sm block mb-1">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                required
                minLength={6}
                autoComplete="current-password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={e =>
                  setLoginForm(f => ({ ...f, password: e.target.value }))
                }
              />
            </div>
            <Button type="submit" className="w-full mt-3" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <div>
              <label htmlFor="signup-username" className="text-sm block mb-1">
                Username
              </label>
              <Input
                id="signup-username"
                type="text"
                required
                minLength={2}
                placeholder="Your name"
                value={signupForm.username}
                onChange={e =>
                  setSignupForm(f => ({ ...f, username: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="text-sm block mb-1">
                Email
              </label>
              <Input
                id="signup-email"
                type="email"
                required
                placeholder="example@email.com"
                value={signupForm.email}
                onChange={e =>
                  setSignupForm(f => ({ ...f, email: e.target.value }))
                }
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="text-sm block mb-1">
                Password
              </label>
              <Input
                id="signup-password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={signupForm.password}
                onChange={e =>
                  setSignupForm(f => ({ ...f, password: e.target.value }))
                }
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full mt-3" disabled={isLoading}>
              {isLoading ? "Loading..." : "Signup"}
            </Button>
          </form>
        )}

        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-2 rounded-full"
            aria-label="Close"
          >
            ×
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
