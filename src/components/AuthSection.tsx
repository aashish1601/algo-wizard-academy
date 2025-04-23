
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, User } from "lucide-react";

const AuthSection: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-wizard-accent" />
        <span className="text-sm font-medium">{user.username}</span>
        <Button size="sm" onClick={logout} variant="secondary">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={e => {
        e.preventDefault();
        login(form.email, form.password);
      }}
    >
      <Input
        type="email"
        placeholder="Email"
        className="max-w-[130px]"
        value={form.email}
        onChange={e => setForm(form => ({ ...form, email: e.target.value }))}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        className="max-w-[80px]"
        value={form.password}
        onChange={e => setForm(form => ({ ...form, password: e.target.value }))}
        required
      />
      <Button size="sm" type="submit">
        <LogIn className="h-4 w-4 mr-1" />
        Login
      </Button>
    </form>
  );
};

export default AuthSection;
