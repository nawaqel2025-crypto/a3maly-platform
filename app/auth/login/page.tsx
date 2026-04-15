"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--a3-background)] px-4" dir="rtl">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-center text-[24px] font-bold">تسجيل الدخول</h2>

          {errorMsg && (
            <p className="text-center text-[14px] text-[var(--a3-danger)]">{errorMsg}</p>
          )}

          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            label="كلمة المرور"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

