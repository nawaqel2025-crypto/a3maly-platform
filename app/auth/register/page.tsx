"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RegisterPage() {
  const supabase = createClientComponentClient();
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
    <form onSubmit={handleRegister}>
      <h1 className="text-2xl font-bold mb-6">إنشاء حساب</h1>

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="كلمة المرور"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-3 rounded"
      >
        إنشاء حساب
      </button>
    </form>
  );
}
