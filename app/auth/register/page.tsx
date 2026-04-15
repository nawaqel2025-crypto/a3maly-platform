"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("تم إنشاء الحساب بنجاح");
    window.location.href = "/auth/login";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--a3-background)] px-4" dir="rtl">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleRegister} className="space-y-4">
          <h1 className="mb-2 text-center text-[24px] font-bold">إنشاء حساب</h1>
          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="كلمة المرور"
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            إنشاء حساب
          </Button>
        </form>
      </Card>
    </div>
  );
}