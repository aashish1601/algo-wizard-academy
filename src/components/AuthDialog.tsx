
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const AuthDialog: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Example for UI only — add your backend integration (e.g., Cognito) here
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setOpen(false), 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setOpen(false), 1000);
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
            <Button type="submit" className="w-full mt-3">
              Login
            </Button>
            {submitted && (
              <div className="text-green-600 text-center text-sm py-2">
                ✅ (Demo) Logged in — integrate Cognito backend!
              </div>
            )}
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
            <Button type="submit" className="w-full mt-3">
              Signup
            </Button>
            {submitted && (
              <div className="text-green-600 text-center text-sm py-2">
                🎉 (Demo) Account created — integrate Cognito backend!
              </div>
            )}
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
