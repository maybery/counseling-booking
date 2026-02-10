"use client";

import { useState } from "react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMsg(null);

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setMsg(data?.error ?? "登录失败");
            setLoading(false);
            return;
        }

        window.location.href = "/admin/bookings";
    }

    return (
        <main className="px-6 py-10">
            <div className="max-w-md mx-auto space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight">管理员登录</h1>

                <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 p-5 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">管理员密码</label>
                        <input
                            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="输入 ADMIN_PASSWORD"
                        />
                    </div>

                    <button
                        className="w-full rounded-xl bg-black text-white py-3 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? "登录中..." : "登录"}
                    </button>

                    {msg && (
                        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                            {msg}
                        </p>
                    )}
                </form>
            </div>
        </main>
    );
}
