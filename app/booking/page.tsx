"use client";

import { useState } from "react";

type FormState = {
  name: string;
  contact: string;
  concern: string;
  preferredTime: string;
};

export default function BookingPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    concern: "",
    preferredTime: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "提交失败");
        return;
      }

      setMessage("预约已提交（本地保存成功）✅");
      setForm({ name: "", contact: "", concern: "", preferredTime: "" });
    } catch {
      setError("网络或服务异常，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">在线预约</h1>
          <p className="text-neutral-600">
            Day4：表单可提交，数据暂存本地文件（演示用）。下一步会升级到 Supabase。
          </p>
        </header>

        <section className="rounded-2xl border border-neutral-200 p-5 space-y-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">你的称呼 *</label>
              <input
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="例如：小王"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">联系方式 *</label>
              <input
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                value={form.contact}
                onChange={(e) => update("contact", e.target.value)}
                placeholder="微信 / 手机 / 邮箱"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">想咨询的问题 *</label>
              <textarea
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 min-h-28"
                value={form.concern}
                onChange={(e) => update("concern", e.target.value)}
                placeholder="简单描述你的困扰与期待"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">你希望的时间（可选）</label>
              <input
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                value={form.preferredTime}
                onChange={(e) => update("preferredTime", e.target.value)}
                placeholder="例如：工作日晚上 / 周末下午"
              />
            </div>

            <button
              className="w-full rounded-xl bg-black text-white py-3 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "提交中..." : "提交预约"}
            </button>

            {message && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
                {message}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                {error}
              </p>
            )}

            <p className="text-xs text-neutral-500 leading-relaxed">
              说明：本网站为作品演示，不提供紧急危机干预。若你正处于危机或有自伤风险，请立即联系当地紧急救助资源。
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
